# Release: Pages, itch.io, Android

Distilled from Silk Road, The Company, Knight of Adalia, The Lists and Centennial
Farm (all shipped), and proved end to end on Imperator's first release with this
kit. Each rule names the build that paid for it.

---

## 1. Two shelves, one build

- **GitHub Pages** is where the game is *kept*: a top-level https page, manifest
  and service worker on one origin, so it installs, runs offline and keeps saves.
- **itch.io** is where the game is *found*: it runs in a cross-origin frame on
  itch's domain, so it is never installable (browsers only install top-level pages).
  Put the Pages link in itch's Links field ("Install it to your phone: same game,
  works with the network off").
- Saves do not cross between them (different origins). The save code moves a game.

## 2. Folders

| Folder | Holds | Committed |
|---|---|---|
| `docs/` | Documents: SPEC, DESIGN, FRAMEs, `docs/itch/` page copy and art | Yes |
| `dist/` | Build output: `dist/site/` (Pages), the single file | No |
| `release/` | Upload files: the web zip, the offline zip, the itch kit | No |
| `tools/` | The kit's tools (refreshed with `setup.mjs --upgrade`) and the game's own | Yes |

Civ-City and Farmyard still deploy from `docs/`; move them to `dist/` the next
time they ship (a workflow path change).

## 3. Pages

- Deploy from the **default branch** only (`github.ref_name ==
  github.event.repository.default_branch`). The `github-pages` environment refuses
  other branches; Silk Road lost eight deploys to this.
- One deploy method. The Company ran a branch deploy and an Actions deploy side by
  side, and the redundant one failed every push.
- Switch Pages on once by hand: Settings > Pages > Source: GitHub Actions. The
  workflow's own token may not create the site; `configure-pages` with
  `enablement: true` then fails with "Resource not accessible by integration"
  (Imperator's first deploy). After that one switch, every push deploys.
- The workflow runs the tests, builds, stamps, and **refuses to upload** a site
  missing its manifest, worker or icons (Centennial Farm): a 404 manifest makes the
  browser decline install with no message. The scaffold's `pages.yml` does all of
  this.
- Manifest: an explicit `id` inside scope (Knight of Adalia; Silk Road's resolved
  outside it), `start_url`, `display: standalone`, 192/512 and maskable icons from
  a committed tool.

## 4. The service worker: build id, not cache bumps

Hand-bumped cache names were forgotten 13 times in four repos; a bundler shipped
the literal text `${stamp}` for a month (Centennial Farm) and Touchline's refresh
silently did nothing on most visits. The kit's design:

- `sw.js` names its cache `<slug>-<build id>`. The build writes the id over the
  `__BUILD_ID__` placeholder and **asserts it landed** (`stamp.mjs`, or the
  bundler for shape B). Same bytes, same id: no cache churn for players.
- The page registers `sw.js?build=<id>` with `updateViaCache: 'none'`.
- Navigations are network-first with a 3.5 s timeout; everything else is
  cache-first. The page posts the resources it loaded so the cache fills itself.
- A new worker that takes over a page nobody has touched reloads it silently;
  otherwise `onUpdate` offers the reload.
- Never registered inside a frame (itch) or from `file://`.

`node tools/update-check.mjs` proves it: it installs the current site, deploys a
copy with a new id over it, and checks that a fresh launch ends on the new worker,
the new cache and no old cache. Run it before every release that changes the
worker or the build.

## 5. itch.io

Settings that worked (The Company's `docs/itch-release.md` is the long worked
example; the kit's `ITCH.md` is the checklist):

- Kind HTML. A zip with **index.html at the zip root**; tick "played in the
  browser". `build-itch.mjs` builds and verifies it.
- **No service worker in the web zip.** A worker on itch's shared origin kept
  serving Silk Road's old build after an upload. `build-itch.mjs` leaves `sw.js`
  out unless `--keep-sw`.
- **Embed size: measure it.** The Company measured five sizes by hand: the frame
  capped at 600 px, and sticky chrome took 237 px at 390 wide. `embed-measure.mjs`
  does it in a minute (Imperator: 390 x 844, 34 px of chrome, nothing wasted).
- Mobile friendly on, portrait; fullscreen button on; not started on page load.
- Cover 630 x 500 (required to appear in browse). **Look at it at 315 x 250**: that
  is the listing. Imperator's first cover had light text on a light ground; the
  template now darkens the theme colour under the text.
- Three to five shots: the loop, the tactics, a consequence, no two alike. Generate
  them from the real build driven through its own screens (`press.mjs`), with a
  believable mid-game state (Silk Road's first shot read "33 of 10 loads") and
  transient toasts hidden (`hide` in the config; a toast covered every Imperator
  shot until then). Look at `press-sheet.png`.
- A loose single-file download plays offline from disk, except in Safari, which
  refuses storage on `file://`; say so. Only bundled builds (shape B) have one.
- Strip debug UI from the release (`VITE_RELEASE=1` in Knight of Adalia).
- A free demo is a separate build holding only its chapters (the rest absent from
  the files, not hidden), ending on a save code the full game accepts (Knight of
  Adalia).

## 6. Before going public

`pre-public.mjs` runs what can be run; the rest is a person's job.

| Check | Run by | The failure behind it |
|---|---|---|
| The zip in a cross-origin frame with storage blocked: renders, starts, no uncaught error | `pre-public` | The Company was a black rectangle in exactly this frame; `navigator.serviceWorker` throws there (Touchline) |
| The same frame with storage allowed | `pre-public` | |
| Privacy line: no account, no ads, no analytics, and name what leaves the page | `pre-public` (fonts flagged) | The Company and Imperator fetch Google Fonts. Better: self-host them (Vikingr bundles `@fontsource`) |
| AI-use statement | `pre-public` | itch asks; say plainly what was generated |
| No unfilled fields in description.html or ITCH.md | `pre-public` | |
| Every number in the copy confirmed against the build | `pre-public` lists them; a person confirms | The Company's help taught an 11,000-florin win when it was 52,000 |
| Tutorial and help re-read against the build | a person | the same |
| Known constraints on the page: saves in the browser, which difficulty to start on | a person | |
| The uploaded draft played in a private window and on a phone: start, a few turns, save code out and back in | a person | |

Storage is blocked by injecting throwing getters into the frame, not by an
opaque-origin sandbox: the sandbox also blocks ES-module scripts over CORS, which
itch does not do, and failed Imperator falsely on the first run.

## 7. Updates

- Pages: push to the default branch; the build id changes with the bytes and
  `update-check` proves returning players get it.
- itch: upload the new web zip over the old file (keeps the page's embed settings).
  A devlog post per player-visible release (`docs/itch/devlog.md` template), in the
  player's terms, with a line asking for save codes with bug reports.

## 8. Hosts that wrap the document

Some hosts (Claude artifacts) wrap the HTML in their own doctype, head and body.
Keep a body-only entry beside `index.html` (Touchline `artifact-index.html`,
Centennial Farm `centennial-farm.embed.html`): head elements that must survive
moved into the body, a background stated up front, `color-scheme` declared,
safe-area padding zeroed because the host already padded the notch.

## 9. Android (Knight of Adalia)

Capacitor wraps the web build in a WebView; a GitHub workflow builds the APK on
push and attaches it to the run. The signing key comes from secrets
(`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`), never the repo; without
them it builds a test APK. Version code = run number, so each build installs over
the last. `setup.mjs --android` lays the config, the workflow and `docs/ANDROID.md`.
The templates are Knight of Adalia's, generalised; they have not been run from the
kit yet, so check the first APK on a device.
