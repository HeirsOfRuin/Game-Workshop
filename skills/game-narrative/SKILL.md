---
name: game-narrative
description: Kit for choice-driven narrative browser/phone games - Knight of Adalia's two-game story engine (YAML scenes, choices, checks, conditions, effects, text templates, pools and queued events, saves and save codes) installed with a playable example game, plus four text tools any narrative game can run through one adapter file - style lint, render scan for leaked template tokens, a continuity checker (phrases that contradict the run's state, the dead named after death) and a choice audit (hollow choices). Use when starting a narrative game or RPG with scenes and choices; when writing or editing scenes, events, choices, endings, chapters or YAML content; when a playtester reports wrong names, dead characters speaking, wrong ages or years, raw {tokens} or [if] on screen, choices that do nothing; when prose and numbers disagree; or for the style guide, transcripts or chapter frames. Part of the game-building family; read game-building first in a new session.
---

# Game narrative

Two things, usable apart:

1. **The engine and an example game** (shape C): Knight of Adalia's `packages/engine`, which already
   plays two games (Knight of Adalia, House of Adalia) through one game-module interface, with a
   small example game that uses every content construct and passes its own check.
2. **Four text tools** that run on any narrative game, engine or not, through one adapter file.
   Proved on Knight of Adalia (they reproduce its own tools' results) and on Vikingr (own engine),
   where they found a raw `[if]` heading shown to players and a dead man still talking.

Hub rules this skill enforces (from `game-building`): **2** nothing declared is decoration (the
choice audit, unread flags) · **8** words derive from state (continuity, render scan, tokens).

## A new narrative game

```
node <game-scaffold>/scripts/init.mjs --shape=C --name="The Crossing" --slug=the-crossing
cd the-crossing
node <skill>/scripts/install.mjs            # --game=crossing --prefix=TCR1. to choose the ids
npm install && npm run content && npm run fixture
npm run check
```
`install.mjs` lays `packages/engine` and `packages/tools` (the engine, unchanged), `tools/narrative/`
(the text tools), the example game over the scaffold's placeholder story, `docs/CONTENT.md`,
`docs/ECONOMY.md`, `docs/FRAME-chapter.md`, and wires the aliases and scripts. It replaces only
files it recognises as the scaffold's placeholders. `--upgrade` later refreshes the shared code only.

Then replace the example chapter by chapter: frame, calibration, build, transcript, playtest
(`references/narrative.md` §1). The game's own rules go in `src/game/module.ts` (paths, effects,
text variables, upkeep) and `src/content/schema.ts`; the engine is never edited per game.

## The text tools on an existing game

Copy `tools/*.ts` to the game's `tools/narrative/` and write `tools/narrative.adapter.ts`
(`tools/adapter.ts` is the contract; `examples/` has Knight of Adalia's, 36 lines, and
Vikingr's, about 100). Then:

| Command | Finds | Fails `check` on |
|---|---|---|
| `tsx tools/narrative/lint-style.ts` | `banned` and `watch` lines from the style guide, in every written string | a banned phrase |
| `tsx tools/narrative/render-scan.ts [--runs=15] [--strict]` | raw `{tokens}`, `[if]`, `undefined`, empty substitutions; soft leads (lower-case starts, doubled words) | a template leak (`--strict`) |
| `tsx tools/narrative/continuity.ts [--runs=8] [--strict]` | phrases from `content/continuity.yaml` shown while their condition fails; the dead named after death | any hit (`--strict`) |
| `tsx tools/narrative/audit-choices.ts [--group=ch2] [--list]` | what each choice does: now, later, flavour, none; hollow choices | (report only) |

The engine-based game also has `npm run validate` (links, flags, conditions, text, lethal
choices, reachability), `npm run bot` (every start to an ending; dead ends and softlocks fail),
`npm run transcript` (scripted plans as Markdown to read) and `npm run fixture` (the save
fixture for the current version).

## Content in one screen

```yaml
- id: c_flood                        # lower_snake_case, unique
  chapter: ch1
  kind: spine                        # spine | pool | queued | ending
  text: |
    By noon the river is over the lower step. [if flag.mended_boat]The seams hold.[/if]
    [break]                          # a Continue page
  choices:
    - id: carry
      text: Cross for the friar now, flood or not.
      lethal: true                   # needs warn and a check
      warn: A bad crossing can drown you.
      check: { attr: strength, skill: boatcraft, difficulty: 6 }
      success: { text: ..., effects: [ { set: flag.carried_friar } ], next: { pool: river, then: c_reckoning } }
      failure: { text: ..., effects: [ { die: "The river took you." } ] }
    - id: wait
      text: Wait for the water to drop.
      requires: "skill.talk >= 1"      # shown locked, with the reason
      effects: [ { queue: { event: q_friar_word, delay: { seasons: 1 } } } ]
      next: c_reckoning
```
Full reference: `templates/docs/CONTENT.md` (installed as `docs/CONTENT.md`). The example's
`content/scenes/ch1/01-the-crossing.yaml` comments every construct.

## Rules

- Frame each chapter before writing it; calibrate the voice on two or three scenes first.
- Every flag set is read by something later, or it is flavour: keep the frame's "Read by" column.
- Ages, years, prices and titles come from state and tokens, never typed.
- Every death, title change and ruler change gets a continuity rule.
- Render every player-facing string through the one renderer, titles and labels included.
- Engine tests run on a test arc, not the shipped story.
- `continuity --strict` and `scan --strict` belong in `npm run check`.

Details: `references/narrative.md` (the loop, F6–F9 with their detectors, the rules that held);
`core/engine/README.md` (the game-module interface and engine rules).
