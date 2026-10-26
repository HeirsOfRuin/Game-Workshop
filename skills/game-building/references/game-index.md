# The nine builds: what each is, and what to copy from it

All repos are under `HeirsOfRuin/`. The skills hold the tools every game needs (first column of
the copy map); the repos hold the game-specific originals. Copy before writing: most problems
in a new game have already been solved once.

| Game | Repo | Shape | Genre / loop | Status (Oct 2026) |
|---|---|---|---|---|
| Silk Road | `SilkRoad` | A: one HTML file | Merchant caravans, 1247, three starts | Shipped to itch; post-mortem `docs/building-games.md` |
| Cradle | `Civ-City` | A | Single-city civ builder, Bronze Age to 1900 | Merged to `main` 2026-10-16 (PR #1) |
| Touchline | `Football` | B: ES modules, no build | Football manager, five-tier pyramid | 1,606 assertions; PWA |
| Centennial Farm | `Farmyard-` | B + bundler | Manitoba farm 1875-2000, generational | Pages PWA; most rigorous balance tooling |
| The Company | `Free-Company` | A | Free company, Italy 1361-75 | Shipped to itch |
| Knight of Adalia | `Knight-of-Adalia-` | C: Vite/Preact/TS/YAML | Narrative RPG, a knight's life; sequel House of Adalia on the same engine | itch (free), Android APK; monorepo `games/knight`, `games/house`, `packages/engine` |
| The Lists | `The-Lists` | B + bundler | Tourney knight career, fictional kingdom | itch; CI tests; richest smoke test |
| Vikingr | `Vikingr` | C | Viking life RPG, sea map, three combat layers | In development |
| Imperator | `Imperator-of-Rome` | B | Roman civil wars AD 68-71, a legate's march on Rome | In development; measurement and itch kit made entirely with the skills (not yet published) |

The backlog of games, shipped and candidate, is `Game-Workshop/docs/game-backlog.md`. One
retrospective per game goes in `Game-Workshop/docs/retrospectives/`.

## Copy map: "I need X" → take it from

| Need | In a skill | Game-specific original |
|---|---|---|
| A new repo with saves, PWA, Pages, smoke, check | game-scaffold `init.mjs` | |
| Seeded RNG with named streams | game-scaffold (every shape) | `Farmyard-/src/engine/rng.js` |
| Single-derivation module, turn pipeline | game-scaffold shape B (`derive.js`, `turn.js`) | `Farmyard-/src/engine/derive.js`, `turn.js` |
| Guarded storage, error boundary | game-scaffold `src/ui/storage.js` | `The-Lists/src/ui/prefs.js` |
| Service worker (build id) and install prompt | game-scaffold `sw.js`, `sw-register.js`, `tools/stamp.mjs` | `Football/sw.js` |
| Phone smoke test, bundle check | game-scaffold `tools/smoke.mjs`, `check-bundle.mjs` | `The-Lists/tools/smoke.mjs` |
| Contact sheet of repeated visuals | game-scaffold `tools/contact-sheet.mjs` | |
| Scripted edits that fail on a miss | game-scaffold `scripts/replace_once.py` | |
| Batch runner, ablation, inert check, curves, claims, report | game-measure | `Farmyard-/sim/`, `The-Lists/sim/`, `Football/tools/ablate.js` |
| Match-engine calibration vs reality | | `Football/tools/calibrate.js`, `docs/MATCH_ENGINE.md` |
| Soak for rare crashes; exploit attempt | | `Football/tools/soak.js`, `negotiate.js` |
| Composition / valuation | | `Farmyard-/sim/composition.js`, `valuation.js` |
| itch zip, pre-public, embed size, press art, kit | game-release | `Free-Company/docs/itch-release.md` (worked example) |
| PWA verification in a browser | game-release `update-check.mjs` | `Football/tools/pwa-check.js` |
| Android APK | game-release `templates/android/` | KA `.github/workflows/android.yml` (branch `ccr-99573b29-7dxwxb`) |
| Story engine: scenes, checks, conditions, effects, text, saves, save codes | game-narrative `core/` | `Knight-of-Adalia-/packages/engine` |
| Validator, bot, transcripts for an engine game | game-narrative `templates/game/tools/` | `Knight-of-Adalia-/games/knight/tools/` |
| Style lint, render scan, continuity, choice audit | game-narrative `tools/` (any engine, via an adapter) | |
| "At stake" line, chapter cards | game-narrative `core/engine` (`stakes.ts`, `cards.ts`) | |
| Dynasty export to a sequel | | `Knight-of-Adalia-/games/knight/src/game/dynasty.ts`, `packages/dynasty/` |
| Packed large saves + IndexedDB | | `Football/src/state/codec.js`, `store.js` (3.6 MB world) |
| World map generated in code | | `Knight-of-Adalia-/packages/engine/src/worldgen.ts`, `games/knight/src/ui/worldart.ts` |
| Real-geography map from Natural Earth | | `Vikingr/tools/build-map.ts`; `Imperator-of-Rome/tools/` (map builder) |
| Photo/AI source → pixel scene | | `Vikingr/tools/art.ts`, `docs/ART.md`; `SilkRoad/tools/scenes.js --pixel` |
| Animated scene renderer | | `Vikingr/src/ui/scene/render.ts` |
| Pixel sprite sheet tool | | `SilkRoad/tools/icons.js` |
| Procedural heraldry / crests | | `Free-Company/index.html` `drawBanner`, `Football/src/gen/identity.js`, `The-Lists/src/engine/heraldry.js` |
| Web Audio sound, no files | | `The-Lists/src/ui/sound.js`, `tools/sound-preview.mjs` |
| Phased combat (shield-wall, duel) | | `Vikingr/src/engine/wall.ts`, `bout.ts`, `docs/FRAME-COMBAT-2.md` |
| Counter-triangle battles and sieges | | `Free-Company/index.html` `resolveRound` |
| Negotiation with memory | | `Football/src/engine/negotiation.js` |
| Tutorial as predicates | | `Farmyard-/src/ui/tutorial.js`, `The-Lists/src/ui/hints.js` |
| Economy reference doc | game-narrative `templates/docs/ECONOMY.md` | `Knight-of-Adalia-/games/knight/docs/ECONOMY.md`, `Vikingr/docs/ECONOMY.md` |
| Frame docs | game-scaffold `docs/FRAME-template.md`; game-narrative `FRAME-chapter.md` | `Vikingr/docs/FRAME-*.md` |
| Kill-gate prototype | | `Free-Company/prototypes/the_company_sim.py`; `Imperator-of-Rome/prototypes/killgate/` |
| Retrospectives | `Game-Workshop/docs/retrospectives/` | `SilkRoad/docs/building-games.md`; this skill's `references/retrospectives/` |

## One-line lessons per game

- **Silk Road:** scope widening (one city → three) is where silent bugs breed; look
  at the screen before believing reasoning; storage keys are contracts.
- **Cradle:** a green harness can be testing nothing; show and resolve from one
  function; ablations need sample size and a second axis.
- **Touchline:** settings the engine never reads; rare branches need soak volume;
  the average is the wrong statistic; deterministic checksums prove refactors neutral.
- **Centennial Farm:** dead effects at scale (35); compounding without owners; the
  instrument can be the problem (machinery inversion); disclose balance impact
  instead of tuning it away; teach by doing. Its bundler shipped an escaped cache
  placeholder for a month (fixed; the build now asserts the id landed).
- **The Company:** the kill gate catches broken loops before code; one resolver for
  every fight; release on itch needs storage guards and a measured embed.
- **Knight of Adalia:** frame → calibrate → build → playtest; continuity is a tool,
  not a read-through; choices need visible stakes; money needs sinks; an engine
  shared by two games through a game module.
- **The Lists:** the joust (the spine) built and measured first; information must
  change decisions; the AI field must obey the player's rules; a lighter first hour.
- **Vikingr:** combat legibility took three tries; slow the rise; brakes plus a
  floor; death spirals; dead men stay dead engine-side.
- **Imperator:** four hand-written measurement tools replaced by one adapter and four
  configs with the same numbers; a subsystem (the Senate) worth 15.7 points on one
  road, and an option (bypass) worth nothing measurable; its whole itch kit (zip,
  embed size, press art, page copy, checks) came out of game-release with no hand code.
