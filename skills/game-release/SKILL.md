---
name: game-release
description: Release kit for browser/phone games - ship to GitHub Pages as an installable offline app and to itch.io, with tools instead of checklists - build-id service worker stamping, an update check that proves returning players get the new build, the itch zip (index.html at the root, no service worker), embed-size measurement, store art from the real build, a pre-public check that plays the zip in a cross-origin frame with storage blocked, the upload kit with page copy, devlog and Android (Capacitor) templates. Use when shipping, releasing, publishing or updating a game; for itch.io pages, embed size, cover and screenshots, store or page copy, devlogs; for PWA install, offline, service worker or cache problems ("players still see the old version", "it won't install"); for GitHub Pages deploys; or for an Android APK. Part of the game-building family; read game-building first in a new session.
---

# Game release

Every step that a past release got wrong by hand is a tool here. Proved on
Imperator's first release: Pages build, update check, embed measurement, press
art, itch zip, pre-public and the upload kit, with no hand-written release code.

Hub rules this skill enforces (from `game-building`): **8** words derive from
state (the page copy states only what the build does) · **5** look at it, at real
size, on a phone (the press sheet, the listing-size cover, the draft on a phone).

## Install (once per game)

```
node <skill>/scripts/setup.mjs [--android]     # in the game repo
node <skill>/scripts/setup.mjs --upgrade       # later: refresh the kit's tools
```
Copies the tools into `tools/`, the page templates into `docs/itch/` (filled from
the game's manifest), `tools/press.config.mjs`, and adds `release/` to
`.gitignore`. It never overwrites the page copy or the press config. `--upgrade`
replaces only the kit's own tools. A repo from `game-scaffold` already has
`browser.mjs`, `stamp.mjs` and the build-id `sw.js`.

## The release sequence

`setup.mjs` prints it with the game's own paths:

| Step | Command | Done when |
|---|---|---|
| 1 | `npm run check` | green (tests, build, bundle check, phone smoke) |
| 2 | the build (`node tools/build-site.mjs`, `node tools/bundle.js` or `npm run build`) | `stamp` reports the new id |
| 3 | `node tools/update-check.mjs --site=dist/site` | a new deploy reaches someone who has the app |
| 4 | `node tools/embed-measure.mjs --site=dist/site --start='<new>\|\|<start>'` | the size and table pasted into `docs/itch/ITCH.md` |
| 5 | edit `tools/press.config.mjs`, then `node tools/press.mjs` | `press-sheet.png` and the 315 x 250 cover preview look right |
| 6 | fill `docs/itch/description.html` and `ITCH.md` **from the build** | every `<...>` field gone |
| 7 | `node tools/build-itch.mjs --site=dist/site --slug=<slug> --name="<Name>" [--single=dist/<slug>.html]` | the zip verified: index.html at the root, no `sw.js` |
| 8 | `node tools/pre-public.mjs --zip=release/<slug>-web.zip --site=dist/site` | clean; the numbers it lists confirmed |
| 9 | `node tools/make-itch-kit.mjs --slug=<slug> --name="<Name>"` | `release/<slug>-itch-kit.zip`, nothing missing |
| 10 | upload per `START-HERE.txt` as a draft, play it on a phone, then Public | |

Pages deploys itself from the default branch (the scaffold's `pages.yml`: tests,
build, stamp, completeness check, then upload).

## Tools

| Tool | Does | Catches |
|---|---|---|
| `stamp.mjs` | writes the build id over `__BUILD_ID__`; fails if any is left or none landed | forgotten cache bumps; an escaped `${stamp}` shipped for a month |
| `update-check.mjs` | installs the site, deploys a copy with a new id, relaunches | players stuck on an old build |
| `embed-measure.mjs` | six embed sizes: width used, fixed chrome, content height, overflow, waste | guessed embed sizes |
| `press.mjs` | cover at 2x plus listing-size preview; shots driven through the game; one sheet | light-on-light covers, toasts in every shot, "33 of 10 loads" |
| `build-itch.mjs` | web zip (sw.js out), single file and offline zip; reads the zip back | a game in a subfolder; a stale worker on itch's origin |
| `pre-public.mjs` | plays the zip in a cross-origin frame, storage blocked and allowed; checks the copy | the black rectangle; unfilled fields; wrong numbers; unnamed font requests |
| `make-itch-kit.mjs` | one folder and zip with START-HERE.txt in upload order | a missing cover or the embed size forgotten |
| `browser.mjs`, `zip.mjs` | Playwright and a static server; a dependency-free zip writer | |

## Templates

`ITCH.md` (settings, AI disclosure, known constraints, before-public checklist),
`description.html` (page copy skeleton), `cover.html` (dark ground from the theme
colour), `devlog.md`, `press.config.mjs`, `android/` (Capacitor config, workflow,
`ANDROID.md`).

## Rules

- `docs/` holds documents, `dist/` the build, `release/` the uploads. Only `docs/` is committed.
- Never hand-edit a cache name. If `stamp` fails, the build is wrong.
- Numbers in the copy come from the code or a measured run, never from memory.
- A tool that warns is asking a person to look: the press sheet, the numbers list.
- Fix a tool here and run `setup.mjs --upgrade` in each game, never edit a game's copy of it.

Details, and the failure behind each rule: `references/release.md`.
