// Build the upload files: one <skill>.skill zip per skill, in ../packages/.
//   node skills/pack.mjs            write them
//   node skills/pack.mjs --check    exit 1 if any committed package is stale
//
// The zips are committed so they can be downloaded from GitHub on any device.
// The writer is deterministic (fixed timestamps, sorted entries), so the same
// sources give the same bytes, and check-skills.mjs can tell a stale package
// from a current one.

import { readFile, writeFile, readdir, stat, mkdir } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { zip } from './game-release/scripts/zip.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
export const OUT = join(ROOT, '..', 'packages');
const SKIP = /(^|\/)(node_modules|\.DS_Store|out|dist)(\/|$)/;

async function walk(d) {
  const out = [];
  for (const n of (await readdir(d)).sort()) {
    const p = join(d, n);
    if (SKIP.test(p)) continue;
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p))); else out.push(p);
  }
  return out;
}

export const skills = async () => (await readdir(ROOT)).filter((d) => d.startsWith('game-')).sort();

export async function build(skill) {
  const files = await walk(join(ROOT, skill));
  return zip(await Promise.all(files.map(async (f) => ({ name: relative(ROOT, f), data: await readFile(f) }))));
}

/** -> [{ skill, file, fresh: bool }] ; writes when write=true */
export async function packAll({ write = false } = {}) {
  if (write) await mkdir(OUT, { recursive: true });
  const res = [];
  for (const s of await skills()) {
    const file = join(OUT, `${s}.skill`);
    const buf = await build(s);
    const old = await readFile(file).catch(() => null);
    const fresh = !!old && old.equals(buf);
    if (write && !fresh) await writeFile(file, buf);
    res.push({ skill: s, file, fresh, kb: Math.round(buf.length / 1024) });
  }
  return res;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const check = process.argv.includes('--check');
  const res = await packAll({ write: !check });
  for (const r of res) console.log(`${check ? (r.fresh ? 'ok  ' : '!!  ') : r.fresh ? '=   ' : '+   '}packages/${r.skill}.skill  ${r.kb} KB${check && !r.fresh ? '  stale: node skills/pack.mjs' : ''}`);
  if (check && res.some((r) => !r.fresh)) process.exit(1);
}
