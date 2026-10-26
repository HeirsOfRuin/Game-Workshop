#!/usr/bin/env node
// Install the release kit into a game repo: node <skill>/scripts/setup.mjs [--dir=.] [--android] [--upgrade]
//
// Copies the release tools into tools/ (never over an existing file) and the
// page templates into docs/itch/, filled from the game's own manifest and
// index.html (name, description, colours, repo), plus tools/press.config.mjs.
// --android also lays capacitor.config.ts, the workflow and docs/ANDROID.md.
// --upgrade replaces the kit's tools in tools/ with this version (they are kit
// code, not the game's); the page copy and press.config.mjs are never touched.
// Prints the release sequence at the end.

import { readFile, writeFile, mkdir, stat, copyFile, readdir } from 'node:fs/promises';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const T = resolve(HERE, '../templates');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return [m[1], m[2] ?? true]; }));
const dir = resolve(String(args.dir || '.'));
const exists = async (p) => !!(await stat(p).catch(() => null));

// ---- what the game says about itself
const html = await readFile(join(dir, 'index.html'), 'utf8').catch(() => '');
const manHref = /<link[^>]+rel="manifest"[^>]+href="\.?\/?([^"]+)"/.exec(html)?.[1];
let man = {};
for (const p of [manHref && join(dir, manHref), manHref && join(dir, 'public', manHref)].filter(Boolean)) {
  if (await exists(p)) { man = JSON.parse(await readFile(p, 'utf8')); break; }
}
const name = String(args.name || man.name || /<title>([^<]+)</.exec(html)?.[1] || basename(dir));
const slug = String(args.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
const repo = String(args.repo || (man.id || '').replace(/\//g, '') || basename(dir));
const vars = {
  NAME: name, SLUG: slug, REPO: repo, OWNER_LOWER: String(args.owner || 'heirsofruin').toLowerCase(),
  DESCRIPTION: String(args.description || man.description || /<meta name="description" content="([^"]+)"/.exec(html)?.[1] || ''),
  COLOUR: man.theme_color || '#7a2e2e', BG: man.background_color || '#17150f',
  APP_ID: slug.replace(/-/g, ''),
  WEB_DIR: (await exists(join(dir, 'vite.config.ts'))) ? 'dist' : 'dist/site',
  WEB_BUILD: (await exists(join(dir, 'tools/bundle.js'))) ? 'node tools/bundle.js' : (await exists(join(dir, 'vite.config.ts'))) ? 'npm run build' : 'node tools/build-site.mjs',
};
const bundled = await exists(join(dir, 'tools/bundle.js'));
// no bundler, no single-file download: drop its rows instead of leaving a dead upload step
const fill = (t) => t.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in vars ? vars[k] : m))
  .split('\n').filter((l) => bundled || !l.includes(`${vars.SLUG}.html\``)).join('\n');

const added = [], kept = [], updated = [];
async function place(from, to, { template = false, tool = false } = {}) {
  const dest = join(dir, to);
  if (await exists(dest)) {
    if (tool && args.upgrade && !(await readFile(dest)).equals(await readFile(from))) { await copyFile(from, dest); updated.push(to); } else kept.push(to);
    return;
  }
  await mkdir(dirname(dest), { recursive: true });
  if (template) await writeFile(dest, fill(await readFile(from, 'utf8'))); else await copyFile(from, dest);
  added.push(to);
}

for (const f of (await readdir(HERE)).filter((f) => /\.(mjs|js)$/.test(f) && f !== 'setup.mjs')) await place(join(HERE, f), `tools/${f}`, { tool: true });
await place(join(T, 'ITCH.md'), 'docs/itch/ITCH.md', { template: true });
await place(join(T, 'description.html'), 'docs/itch/description.html', { template: true });
await place(join(T, 'cover.html'), 'docs/itch/cover.html', { template: true });
await place(join(T, 'devlog.md'), 'docs/itch/devlog.md', { template: true });
await place(join(T, 'press.config.mjs'), 'tools/press.config.mjs', { template: true });
if (!(await exists(join(dir, 'docs/itch/short-description.txt')))) { await mkdir(join(dir, 'docs/itch'), { recursive: true }); await writeFile(join(dir, 'docs/itch/short-description.txt'), `${vars.DESCRIPTION}\n`); added.push('docs/itch/short-description.txt'); }
if (args.android) {
  await place(join(T, 'android/capacitor.config.ts'), 'capacitor.config.ts', { template: true });
  await place(join(T, 'android/android.yml'), '.github/workflows/android.yml', { template: true });
  await place(join(T, 'android/ANDROID.md'), 'docs/ANDROID.md', { template: true });
}

// release/ is build output (zips, the kit): never committed
const gi = join(dir, '.gitignore');
const giText = (await exists(gi)) ? await readFile(gi, 'utf8') : '';
if (!giText.split('\n').some((l) => /^\/?release\/?$/.test(l.trim()))) { await writeFile(gi, `${giText.replace(/\n*$/, '\n')}release/\n`); added.push('.gitignore: release/'); }

for (const a of added) console.log(`  + ${a}`);
for (const u of updated) console.log(`  ^ ${u} (upgraded)`);
for (const k of kept) console.log(`  = ${k} (kept)`);
const single = bundled ? ` --single=dist/${slug}.html` : '';
console.log(`
Release sequence (game-release SKILL.md):
  npm run check
  ${vars.WEB_BUILD}
  node tools/update-check.mjs --site=${vars.WEB_DIR}
  node tools/embed-measure.mjs --site=${vars.WEB_DIR}          # paste into docs/itch/ITCH.md
  node tools/press.mjs                                  # edit tools/press.config.mjs first
  node tools/build-itch.mjs --site=${vars.WEB_DIR} --slug=${slug} --name="${name}"${single}
  node tools/pre-public.mjs --zip=release/${slug}-web.zip --site=${vars.WEB_DIR}
  node tools/make-itch-kit.mjs --slug=${slug} --name="${name}"
Fill docs/itch/description.html and ITCH.md from the BUILD, not from memory.`);
