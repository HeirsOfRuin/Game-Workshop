# Game Workshop

The HeirsOfRuin game-building skills, the game backlog and the build
retrospectives. Every game repo is built with these skills; what a build teaches
comes back here.

| Folder | Holds |
|---|---|
| `skills/` | The five skills, as source. Edit here. |
| `packages/` | The same skills zipped as `.skill` files, for upload. Built by `skills/pack.mjs`. |
| `docs/game-backlog.md` | Every game: shipped, in progress, and candidates |
| `docs/retrospectives/` | One short retrospective per game, written when it ships or stalls |

## The skills

| Skill | Use it for |
|---|---|
| `game-building` | The hub: process, ten rules, failure catalogue, design lessons. Read first. |
| `game-scaffold` | A new game repo in one command (shapes A, B, C), or an audit of an old one |
| `game-measure` | Balance and measurement: one adapter per game, then ablation, curves, claims |
| `game-release` | GitHub Pages and itch.io: stamping, update check, press art, pre-public, kit |
| `game-narrative` | Branching narrative games: content schema, continuity and style tools |

## Install

- **claude.ai (organisation skills):** Settings > Capabilities > Skills, upload
  each file in `packages/` (replacing the old one of the same name).
- **One repository only:** copy `skills/<name>/` to `.claude/skills/<name>/` there.

## Changing a skill

```
# edit skills/<name>/...
node skills/check-skills.mjs     # shared files identical, SKILL.md limits, no scratch files
node skills/pack.mjs             # rebuild packages/
node skills/check-skills.mjs     # now also confirms every package is current
```
Commit the source and the packages together. Then re-upload the changed packages.

A tool that games copy (the measurement kit, the release tools) is fixed here,
then refreshed in each game: `setup.mjs --upgrade` (release),
`init.mjs --upgrade` (scaffold).

## Where a lesson goes

| Lesson | Goes to |
|---|---|
| A failure that cost a build | `game-building/references/failure-modes.md`, next F-number, with evidence, detector and fix |
| A design finding | `game-building/references/design-lessons.md` |
| A measurement rule | `game-measure/references/measurement-rules.md` |
| A release step | a tool in `game-release/scripts/` if it can be run, else `references/release.md` |
| A rule for every game | the hub's ten rules, only once it has cost two builds |
