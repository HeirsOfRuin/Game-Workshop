// Writes tests/fixtures/v<SAVE_VERSION>-save.json: a save a few choices into the first start,
// from the current build. Run it once per save version, BEFORE the version rises, and commit it.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { loadContent } from './content-loader';
import { newGame, view, choose, startsOf } from '../src/game/index';
import { toSave, SAVE_VERSION } from '../src/game/save';

const content = loadContent();
const file = join(import.meta.dirname, '..', 'tests', 'fixtures', `v${SAVE_VERSION}-save.json`);
if (existsSync(file) && !process.argv.includes('--force')) { console.error(`${file} exists: a shipped fixture is never rewritten (--force if it never shipped)`); process.exit(1); }
let s = newGame(content, { start: startsOf(content)[0]!, seed: 12345, name: 'Fixture' });
for (let i = 0; i < 2 && !s.ended; i++) s = choose(content, s, view(content, s).choices.find((c) => c.available)!.id).state;
// install.mjs replaces the scaffold's placeholder fixture and leaves tests/fixtures/ absent
// (In the Trenches, 2026-11-09: the first npm run fixture failed with ENOENT)
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, JSON.stringify(toSave(s, content), null, 1));
console.log(`wrote ${file} (scene ${s.scene})`);
