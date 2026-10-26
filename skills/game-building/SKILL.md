---
name: game-building
description: Read first for any browser or phone game built in code (turn-based sims, management and strategy games, narrative RPGs, prototypes) - the build process, ten rules, failure catalogue with detectors, design lessons and a copy map, distilled from nine real builds. Routes to the executable kits - game-scaffold (a new repo with saves, PWA, Pages, smoke test and check in one command), game-measure (balance and ablation kit), game-narrative (story engine, continuity and style tools) and game-release (Pages and itch.io release tools). Use whenever the user is starting, designing, building, debugging, balancing, playtesting or shipping a game, even a quick prototype - a new game idea or spec, a new system, playtest feedback ("this does nothing", "I lost every fight"), tests passing while players hit bugs, difficulty or economy tuning, branching narrative, saves, install or release. Read it before writing game logic.
---

# Game building

Nine games, one team, one set of constraints: phone first, turn-based, no backend, no API
key, one author directing one agent. The same mistakes recurred across genres and the same
fixes kept working. This skill is the process and the judgement; four spokes hold the tools.

## Route

| You are… | Use | Read first |
|---|---|---|
| Starting a new game | **game-scaffold** `init.mjs --shape=A\|B\|C` | Workflow and "Day one" below; `references/workflow.md` |
| Starting a story game (scenes, choices) | game-scaffold shape C, then **game-narrative** `install.mjs` | game-narrative SKILL.md |
| Bringing an old repo up to the defaults | game-scaffold `init.mjs --fill` (adds what is missing, then audits), `--upgrade` | game-scaffold SKILL.md |
| Adding a system or feature | the feature loop and checklists below | `references/design-lessons.md` |
| Handling playtest feedback | the playtest protocol and symptom table below | `references/failure-modes.md` |
| Tuning balance, "this does nothing" | **game-measure** (one adapter, then configs) | game-measure `references/measurement-rules.md` |
| Writing or fixing scenes, continuity, style | **game-narrative** text tools | game-narrative `references/narrative.md` |
| Shipping to Pages, itch.io, Android | **game-release** `setup.mjs`, then its sequence | game-release `references/release.md` |
| Needing a tool that probably exists | `references/game-index.md` copy map | |

The backlog of games is `Game-Workshop/docs/game-backlog.md`; the skills' source is
`Game-Workshop/skills/`. A lesson goes back there when a build teaches it.

## The ten rules

Each one cost at least two builds a round trip. F-numbers point into `references/failure-modes.md`.

1. **One derivation per number.** What the player sees and what the engine resolves come
   from the same function. Caches are fine; second formulas are not. (F1)
2. **Nothing declared is decoration.** Every effect, setting, option and flag changes the
   game or is deleted. Test behaviour: an ignored knob gives a byte-identical end state
   (game-measure `ablate.js --inert`). (F2-F4)
3. **Every harness proves progress.** A bot or batch that does not assert the clock moved
   can measure nothing while green (game-measure: `progress()` in the adapter). (F11)
4. **Every number carries its noise floor and a second axis.** About 200 runs to see a
   6-point gap at 10%; distributions, not means; never tune one scalar blind. (F14-F16)
5. **Look at it, at real size, on a phone.** Contact sheets for repeated visuals; the
   390x844 smoke test in every check; the screenshots looked at. (F36, F37)
6. **Correct but silent is broken.** Every empty, locked or limiting state names the reason
   and the lever that changes it. Every chart has a key. (F35)
7. **The world plays by the player's rules.** Rivals earn, buy, age and improve through
   the same functions, or the player outgrows the world. (F26)
8. **Words derive from state.** Tutorial numbers from config, prices from costs, names,
   ranks and ages from tokens, the dead stay dead. Checked by a tool, not a read-through. (F6-F9)
9. **Saves are contracts.** Versioned key and payload, a migration chain, a fixture from
   every shipped version, a text export. Never rename a storage key.
10. **Write it down.** Spec, a frame per feature, a decisions log with the author's words and
    the measured numbers, the backlog for every idea. Chat does not survive the session. (F38)

## Workflow

| Stage | Output | Gate |
|---|---|---|
| 0 Backlog | Two lines in the backlog | The author picks it |
| 1 Spec | One page: loop, scarce resource, per-turn decision, ways to lose, one way to win | The author approves |
| 2 Kill gate | Numbers-only sim: fixed policies x seeds, no UI (`prototypes/`) | Strategies differ; a win is reachable, not trivial; nothing dominant |
| 3 Phase 0 | `docs/DESIGN.md`: stack, architecture, schema, scope pushback | The author approves |
| 4 Engine + instruments | `init.mjs`; pure engine, bot, invariants, `sim/adapter.js` | Bot plays full runs; `npm run check` green; installs on a phone |
| 5 Calibration | Two or three pieces at full polish | The author's verdict on voice, look, option count |
| 6 Vertical slice | One complete year, chapter or season | The author wants to play the next one |
| 7 Feature loop | Frame → approve → build → measure → playtest → revise | Claims measured, decision logged |
| 8 Release | game-release sequence | `pre-public.mjs` clean; the uploaded draft played on a phone |

Skipping a stage is allowed; skipping it silently is not. A one-evening prototype needs 1,
2 and 4. Templates and detail: `references/workflow.md`.

**Feature loop.** Write `docs/FRAME-<feature>.md` from the scaffold's template: the author's
request quoted, the problem, the design rule, options with a recommendation, a worked
example, what will be measured. Get approval for anything that changes feel or scope. Build
the measurement with the feature (a game-measure config). Log the numbers.

## Day one

Pick the shape (game-scaffold `references/architecture.md`):
- **Mostly authored text** → C: Vite + Preact + TS strict + YAML + Zod, then game-narrative.
- **Mostly simulation** → B: ES modules, no build step, bundled to one file.
- **Small and needed today** → A: one `index.html`; plan the move past about 2,500 lines.

`init.mjs` lays all of this; `init.mjs --fill` checks an old repo for it:
- [ ] A pure engine, `(state, input) -> state`: no DOM, no `Math.random`, no `Date.now`.
- [ ] Named RNG streams with their state in the save.
- [ ] One derivation module; one money chokepoint writing a ledger, and a test that purse == ledger.
- [ ] A versioned save key, `migrate()`, a fixture per shipped version, a text export; guarded storage.
- [ ] A reference bot with a written policy; `sim/adapter.js` with `progress()`.
- [ ] A manifest with `id`, icons from a committed generator, the build-id service worker.
- [ ] Pages from the default branch, refusing an incomplete site.
- [ ] `npm run check`: tests, build, bundle check, phone smoke test (and for a story game,
      validate, lint, continuity, render scan).
- [ ] `docs/` for documents; `dist/`, `release/`, `out/` for output, none committed.
- [ ] `DESIGN.md` with a decisions log; the backlog entry updated with the repo.

## Checklists

**Before every commit**
- [ ] `npm run check` passes; numbers in the message carry run counts and the noise floor.
- [ ] Every scripted edit asserted its match count (game-scaffold `scripts/replace_once.py`). (F32)
- [ ] No scratch files staged (`tools/_*`, `*.tmp.*` are gitignored; use those names).

**After adding or changing a system**
- [ ] Every new knob or effect moves the end state (inert check); every option is best somewhere.
- [ ] The bot can use it and the player has a control for it. (F3, F13)
- [ ] Shown value and resolved value share one function. (F1)
- [ ] Empty and locked states explain themselves. (F35)
- [ ] Multiplicative interactions asserted as shares, not magnitudes. (F20)
- [ ] Turn phase order still right (F22); no feedback trap with no exit (F24).
- [ ] A/B on the same seeds; the balance impact disclosed in the commit.
- [ ] Neutral refactors proven neutral by a seeded checksum. (F27)

**After widening scope** (a second start, mode, city, era)
- [ ] Grep the original id and name; audit every hit before writing anything else. (F10)
- [ ] Re-measure every gate; a longer career inflates win rates.

**Before handing a build to the author**
- [ ] Smoke at 390px clean; screenshots looked at.
- [ ] Every screen rendered across bot runs with no raw tokens (smoke; game-narrative render scan). (F7)
- [ ] Continuity check for a story game. (F8)
- [ ] The build id differs from the last deploy's, so the tester gets the new build
      (`stamp.mjs` fails otherwise; `update-check.mjs` proves it). (F30)
- [ ] A chapter jump or sandbox start to reach the new content fast.

## Playtest protocol

1. Get the save; reproduce on it.
2. Trace before theorising. Classify: **bug** / **missing control** / **missing explanation** /
   **design disagreement**. Only the first is an engine change.
3. Fix the class: sweep for siblings (one continuity report led to 47 more).
4. A/B the balance impact on the same seeds. Disclose it; do not quietly tune it back.
5. Add the regression test for the reported path.
6. Say plainly what you could not reproduce, and what would help.
7. Log the author's words and the verdict in the decisions log.

## Symptom → first suspects

| Symptom | Suspect |
|---|---|
| "This setting, choice or upgrade does nothing" | F2 decoration, F3 hidden control, F5 silent queue |
| A number on screen differs from what happened | F1 two derivations, F21 units or double count |
| "It's broken" but the code is right | F35 silent state; F6 copy drifted |
| Wrong name in a label; an effect hits someone else | F7 tokens resolved twice |
| Text mentions a dead man, a wrong title, a wrong year | F8, F9 (game-narrative continuity) |
| A bug only for the second start or mode | F10 narrow-case assumption |
| Tests green, players hit bugs | F11 harness not progressing, F18 rare branch, F37 never looked at on a phone |
| Balance numbers jump between runs | F14 sample size, F27 determinism leak |
| "Never doing X" looks optimal | F16 one-axis read, F13 the bot misuses X |
| One income source eats everything | F20 compounding with no owner |
| "I haven't won since" | F24 feedback trap |
| Top players run away, the median starves | F25 snowball and trap; F26 AI not on the same rules |
| Blank page on itch or in a frame | F29 storage throws (game-release `pre-public.mjs`) |
| Fix pushed, the tester still sees the bug | F30 stale build (game-release `update-check.mjs`) |
| Identical instant failures on deploy | F33 platform rules |
| A button greyed out forever after an error | F34 no `finally` |

## Design principles (detail in `references/design-lessons.md`)

- Every option is best somewhere; information has value only if it can change the choice.
- Choices show what is at stake, computed from their real effects.
- Combat: say what an order does and costs, not what it will do; chance moves numbers,
  never decides what beats what; auto-resolve uses the same resolver.
- A slow, earned rise; progressive brakes plus a floor; money needs late sinks.
- The first hour is its own design: a quick start, folded detail, a guaranteed early event.
- Tutorials teach by doing, as predicates, with progress saved in the game.
- Historically grounded: real numbers in data tables, one economy reference for prose and
  engine, sources in the README.

## What this does not tell you

- **Whether it is fun.** Every time that was answered, a human played it. Book the author's
  playtest at the calibration and slice gates, not at the end.
- **Projects outside the shape.** Real-time, multiplayer, 3D or a backend will fail in ways
  not listed here; rules 1-6 and 10 still transfer, the stack advice does not.
- **The author's targets as theory.** Win-rate targets are one person's preference per game;
  ask for them, do not assume them.

## Files

| Path | What |
|---|---|
| `references/workflow.md` | Stages, gates, playtest handling, session efficiency, doc templates, commit style |
| `references/failure-modes.md` | F1-F38 with evidence, detector and fix |
| `references/design-lessons.md` | Decisions, combat, pacing, the world, teaching, history, the author's preferences |
| `references/game-index.md` | The nine games, the copy map by need (skill first), one-line lessons each |
| `references/retrospectives/` | The original Silk Road and Cradle write-ups |
