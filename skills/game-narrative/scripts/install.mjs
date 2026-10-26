#!/usr/bin/env node
// Lay the narrative kit into a game repo: node <skill>/scripts/install.mjs [--dir=.] [options]
//
// Run it on a fresh shape-C scaffold (game-scaffold: init.mjs --shape C). It:
//  1. copies the engine (core/engine -> packages/engine) and its Node tools (core/tools ->
//     packages/tools): Knight of Adalia's two-game engine, unchanged;
//  2. copies the text tools (tools/ -> tools/narrative/): lint-style, render-scan, continuity,
//     audit-choices, behind the game's tools/narrative.adapter.ts;
//  3. lays the example game (templates/game): content, schema, game module, state, saves, UI,
//     tools, tests, replacing the scaffold's placeholder story files it recognises;
//  4. lays docs/CONTENT.md, docs/ECONOMY.md, docs/FRAME-chapter.md;
//  5. wires tsconfig paths, the vite and vitest aliases, and the package.json scripts.
// It never overwrites a file it did not lay or recognise.
//
// Options: --name="The Crossing" --slug=the-crossing --game=crossing --prefix=TCR1.
//          (defaults from package.json and index.html)
//          --upgrade  refresh packages/engine, packages/tools and tools/narrative only (the
//                     shared code), leaving the game alone. Run it after the skill changes.

import { readFile, writeFile, mkdir, stat, readdir, rm, rmdir } from 'node:fs/promises';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SKILL = resolve(HERE, '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return [m[1], m[2] ?? true]; }));
const dir = resolve(String(args.dir || '.'));
const exists = async (p) => !!(await stat(p).catch(() => null));
const added = [], replaced = [], kept = [], removed = [], notes = [];

async function walk(d) {
  const out = [];
  for (const n of (await readdir(d)).sort()) {
    const p = join(d, n);
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p))); else out.push(p);
  }
  return out;
}

if (!(await exists(join(dir, 'package.json'))) && !args.force) {
  console.error(`${dir} has no package.json: run this in a game repo (game-scaffold init.mjs --shape C makes one), or pass --force`);
  process.exit(2);
}

// ---- names
const pkg = JSON.parse(await readFile(join(dir, 'package.json'), 'utf8').catch(() => '{}'));
const html = await readFile(join(dir, 'index.html'), 'utf8').catch(() => '');
const name = String(args.name || /<title>([^<]+)</.exec(html)?.[1] || pkg.name || 'The Game');
const slug = String(args.slug || pkg.name || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
const game = String(args.game || slug.replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''));
const words = name.replace(/^the\s+/i, '').replace(/[^A-Za-z ]/g, '').split(/\s+/).filter(Boolean);
const initials = (words.length > 1 ? words.map((w) => w[0]).join('') : words[0] ?? 'GAM').toUpperCase().slice(0, 3).padEnd(3, 'X');
const prefix = String(args.prefix || `${initials}1.`);
const vars = { NAME: name, SLUG: slug, GAME_ID: game, CODE_PREFIX: prefix };
const fill = (t) => t.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));

// ---- 1, 2: the shared code (always refreshed: it is the skill's, not the game's)
async function copyTree(from, to, { template = false } = {}) {
  for (const f of await walk(from)) {
    const dest = join(dir, to, relative(from, f));
    const body = template ? fill(await readFile(f, 'utf8')) : await readFile(f);
    const had = await exists(dest);
    if (had && (await readFile(dest)).equals(Buffer.from(body))) { kept.push(relative(dir, dest)); continue; }
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, body);
    (had ? replaced : added).push(relative(dir, dest));
  }
}
await copyTree(join(SKILL, 'core/engine'), 'packages/engine');
await copyTree(join(SKILL, 'core/tools'), 'packages/tools');
await copyTree(join(SKILL, 'tools'), 'tools/narrative');

if (!args.upgrade) {
  // ---- 3: the example game. A scaffold placeholder is replaced; anything else is kept.
  const SCAFFOLD_C = resolve(SKILL, '../game-scaffold/templates/shape-C');
  const placeholderRe = (t) => new RegExp(`^${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{\\\{[A-Z_]+\\\}\\\}/g, '.*?')}$`, 's');
  async function isPlaceholder(rel) {
    const tpl = await readFile(join(SCAFFOLD_C, rel), 'utf8').catch(() => null);
    const cur = await readFile(join(dir, rel), 'utf8').catch(() => null);
    return tpl !== null && cur !== null && placeholderRe(tpl).test(cur);
  }
  // the scaffold's placeholder story, which the engine replaces
  for (const rel of ['src/engine/story.ts', 'src/engine/rng.js', 'content/scenes/opening.yaml', 'tests/story.test.ts', 'tests/fixtures/v1-save.json']) {
    if (await isPlaceholder(rel)) { await rm(join(dir, rel)); removed.push(rel); await rmdir(dirname(join(dir, rel))).catch(() => {}); } // only if now empty
    else if (await exists(join(dir, rel))) notes.push(`${rel} is not the scaffold's placeholder: kept. Delete it if the narrative engine replaces it.`);
  }
  const T = join(SKILL, 'templates/game');
  for (const f of await walk(T)) {
    const rel = relative(T, f);
    const dest = join(dir, rel);
    const body = fill(await readFile(f, 'utf8'));
    if (await exists(dest)) {
      if (await isPlaceholder(rel)) { await writeFile(dest, body); replaced.push(rel); } else kept.push(rel);
      continue;
    }
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, body);
    added.push(rel);
  }
  // ---- 4: docs
  for (const f of await walk(join(SKILL, 'templates/docs'))) {
    const dest = join(dir, 'docs', relative(join(SKILL, 'templates/docs'), f));
    if (await exists(dest)) { kept.push(relative(dir, dest)); continue; }
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, fill(await readFile(f, 'utf8')));
    added.push(relative(dir, dest));
  }

  // ---- 5: wiring
  const tsPath = join(dir, 'tsconfig.json');
  if (await exists(tsPath)) {
    const ts = JSON.parse(await readFile(tsPath, 'utf8'));
    ts.compilerOptions ??= {};
    ts.compilerOptions.paths = { ...(ts.compilerOptions.paths ?? {}), '@engine/*': ['./packages/engine/src/*'], '@tools/*': ['./packages/tools/src/*'] };
    ts.include = [...new Set([...(ts.include ?? []), 'packages'])];
    await writeFile(tsPath, `${JSON.stringify(ts, null, 2)}\n`);
    replaced.push('tsconfig.json (paths @engine, @tools; include packages)');
  }
  const vitePath = join(dir, 'vite.config.ts');
  let vite = await readFile(vitePath, 'utf8').catch(() => '');
  if (vite && !vite.includes('@engine')) {
    const before = vite;
    vite = vite.replace("import preact from '@preact/preset-vite';", "import preact from '@preact/preset-vite';\nimport { fileURLToPath } from 'node:url';\n\nconst here = (p: string) => fileURLToPath(new URL(p, import.meta.url));")
      .replace('  plugins: [preact()],', "  plugins: [preact()],\n  resolve: { alias: { '@engine': here('./packages/engine/src'), '@tools': here('./packages/tools/src') } },")
      .replace("test: { include: ['tests/**/*.test.ts'] },", "test: { include: ['tests/**/*.test.ts', 'packages/**/tests/*.test.ts'] },");
    if (vite === before || !vite.includes("'@engine'")) notes.push('vite.config.ts: add resolve.alias @engine -> packages/engine/src and @tools -> packages/tools/src, and packages/**/tests to test.include');
    else { await writeFile(vitePath, vite); replaced.push('vite.config.ts (aliases, engine tests)'); }
  }
  // the smoke test's clock: a narrative game's date moves per season, not per choice; progress is the page changing
  const smokePath = join(dir, 'tools/smoke.mjs');
  const smoke = await readFile(smokePath, 'utf8').catch(() => '');
  if (smoke.includes("export const CLOCK = '.hud .turn';")) {
    await writeFile(smokePath, smoke.replace("export const CLOCK = '.hud .turn';", "export const CLOCK = 'main.panel';                    // narrative: a choice changes the page (the date moves per season)"));
    replaced.push('tools/smoke.mjs (CLOCK: the story panel)');
  }
  if (pkg.scripts) {
    const s = pkg.scripts;
    Object.assign(s, {
      content: 'tsx tools/build-content.ts',
      validate: 'tsx tools/validate.ts',
      'lint:style': 'tsx tools/narrative/lint-style.ts',
      continuity: 'tsx tools/narrative/continuity.ts',
      scan: 'tsx tools/narrative/render-scan.ts',
      audit: 'tsx tools/narrative/audit-choices.ts',
      transcript: 'tsx tools/transcript.ts',
      fixture: 'tsx tools/make-fixture.ts',
      bot: 'tsx tools/bot.ts',
    });
    s.check = 'npm run build && vitest run && npm run validate && npm run lint:style && npm run continuity -- --strict && npm run scan -- --strict && npm run bot -- --runs 100 && node tools/check-bundle.mjs && node tools/smoke.mjs dist';
    await writeFile(join(dir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
    replaced.push('package.json (scripts: validate, lint:style, continuity, scan, audit, transcript, fixture; check)');
  }
}

for (const r of removed) console.log(`  - ${r} (scaffold placeholder)`);
for (const a of added) console.log(`  + ${a}`);
for (const r of replaced) console.log(`  ^ ${r}`);
if (kept.length) console.log(`  = ${kept.length} file(s) kept as they were`);
for (const n of notes) console.log(`  ! ${n}`);
console.log(args.upgrade ? '\nUpgraded the engine, its tools and the text tools. Run npm run check.' : `
${name}: game id "${game}", save code prefix "${prefix}".
Next:
  npm install
  npm run content && npm run fixture     # the v1 save fixture, from this build
  npm run check                          # build, tests, validate, style, continuity, scan, bot, bundle, smoke
Then replace the placeholder story (content/, src/game/module.ts) chapter by chapter, starting
with docs/FRAME-chapter.md. docs/CONTENT.md is the authoring reference.`);
