# Narrative games: process, failures, rules

From Knight of Adalia (KA: 295 scenes, seven endings, a sequel on the same engine) and Vikingr
(VK: a saga sandbox with a scene layer). Each rule names the build that paid for it.

---

## 1. The loop

| Step | Output | Done when |
|---|---|---|
| Frame | `docs/FRAME-<chapter>.md` from `templates/docs/FRAME-chapter.md` | The author approves the spine, the flags and who can die |
| Calibration | Two or three scenes at full polish | The author reads a transcript and says it sounds right; corrections go into the style guide |
| Build | The rest of the chapter | `npm run check` green |
| Read | `npm run transcript`, `npm run audit -- --list` | No hollow spine choice; the transcripts read well aloud |
| Playtest | A save code with every report | Reports filed as Report / Cause / Fix, each with a regression test |
| Revise | | |

KA's first scenes were "too long-winded" and too quiet; the author's own sample chapters set the
voice, and scenes were cut into Continue pages with `[break]`. Never pad to a word count: words
saved go into branching.

## 2. What the engine guarantees (and the validator enforces)

- Every non-ending scene has a choice with no `requires` and no `visible_if`: no dead ends.
- Death only from a choice marked `lethal`, with a `warn` the player sees, and a `check`.
- Every ending reachable from some start once its chapter exists.
- Every flag declared; one set but never read is a warning (and a hollow choice).
- Conditions, text templates and effects parsed and checked against the registries at build time.
- Saves versioned with migrations; a scene removed from content resumes at the last checkpoint.

## 3. Failures and their detectors

### F6. Copy that drifted from the numbers
KA showed seven prices from before a repricing and labelled crossbows £10 against a £50 check;
The Company's tutorial taught an 11,000-florin win when it was 52,000.
- **Detector:** a test that every shown price equals what the choice charges (KA); transcripts read
  against the build; `docs/ECONOMY.md` as the one table of sums.
- **Fix:** labels generated from the requirement (`requires` makes the lock text); numbers in
  prose from tokens (`{coin}`, the game's own `textVar`).

### F7. Template tokens and the wrong person
VK's choice labels never went through the renderer; The Company's buttons read "Back {lt}".
Found again by this kit on Vikingr: a birth scene's heading showed
"[if child.son]Another son[else]Another daughter[/if]", because the UI rendered scene text but
not titles; and "among the , he will remember" from a token that rendered empty.
- **Detector:** `npm run scan` (render-scan): plays bot runs, renders every step and flags raw
  `{tokens}`, `[if]` tags, `undefined`, empty substitutions and lower-case sentence starts. The
  validator cannot catch these: the template is valid; the path is what breaks it.
- **Fix:** render every player-facing string, titles and labels included, through the one renderer.

### F8. Prose that assumes a state the player is not in
KA: 47 lines assumed choices not made; "two kings" after one was beheaded; a two-year-old heir
talking like an adult; "squire" before he was one; a dead wife's letter. VK: 176 unguarded
mentions of sworn men who could be dead. This kit's first run on VK found a dead man still
talking in banter at sea and still waving at a parting.
- **Detector:** `npm run continuity -- --strict`: bot runs, every rendered sentence, two checks:
  phrase rules from `content/continuity.yaml` (a phrase only while a condition holds), and the dead
  named outside a sentence about death or memory.
- **Fix:** engine-side, not hand guards: role tokens (`{rank_word}`), an heir who inherits a dead
  man's bench and lines, age bands, conditions in the prose. Continuity is engine work.

### F9. Calendar and dates drift from the prose
KA's header said "year 4 of King Edwin" over prose about his second year; a resumed save replayed
scenes years late; the King's Christmas fell in summer.
- **Fix:** ages and years from the calendar (`{age_words}`, `{regnal_year}`), never typed (the
  style guide bans typed ages); dated scenes use `catch_up`; the bot asserts landmarks by year.

### Hollow choices
A choice whose every outcome is "flavour" (a flag only text reads) or nothing reads as a corridor:
"my choices don't matter". KA ran at 19 hollow choices in 892; VK's 120 are mostly "do nothing"
options, which can be right. `npm run audit -- --list` names them; the frame's "Read by" column
prevents them.

## 4. Rules that held

- **Branching over length.** Each chapter adds scenes the player may not see, not more scenes
  every player sees (KA: 402 flags, 187 that change later mechanics).
- **The ending names the player's turning points** (KA: about 230 forks tied to flags; each
  chapter's heaviest few shown, with the road not taken).
- **Transcripts are the cheapest playtest.** A scripted plan per ending, regenerated on every
  content change and read like a chapter. KA's reviews ran on them.
- **Engine tests run on a test arc,** not the shipped story (KA `tests/fixtures/test-arc.yaml`),
  or every content edit breaks them.
- **A sequel is a contract.** KA exports the dynasty as a versioned code House of Adalia reads;
  add fields freely, rename only with a version bump and a reader for the old one.
- **One engine, game modules.** KA's engine plays two games through one interface
  (`packages/engine/README.md`): a game supplies its paths, effects, text variables and upkeep;
  the boundary test keeps the engine from importing anything of a game's.

## 5. The text tools on a game with its own engine

The four tools in `tools/` read a game only through `tools/narrative.adapter.ts`. Vikingr, whose
engine is its own, runs all four from an adapter of about 100 lines, half of it the list of player-facing text its
old lint already had (`examples/vikingr.adapter.ts`): its bot plays, the adapter renders what
the UI would show.
Knight of Adalia's adapter (`examples/knight-of-adalia.adapter.ts`) reuses the game's own text
list, bot and conditions, and reproduces its own tools' results exactly (lint 58 rules, 0/0; the
choice audit row for row; continuity 0 problems).
