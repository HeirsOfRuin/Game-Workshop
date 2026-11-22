# Game backlog

State of the game projects, and a filtered list of candidates for the next build.

---

## 1. What exists

Updated 2026-10-26. Nine game repos, all under `HeirsOfRuin/`.

| Project | Repo | Shape | Status |
|---|---|---|---|
| **Silk Road** — merchant caravans, Samarkand/Trebizond/Tabriz, 1247 | `SilkRoad` | Single HTML file | Built, PWA on Pages, itch zip and offline download. Post-mortem in `docs/building-games.md`. |
| **Cradle** — single-city civ builder, Bronze Age to 1900 | `Civ-City` | Single HTML file | Built; merged to `main` 2026-10-16 (PR #1). Last note: trade flagged as a balance trap. |
| **Touchline** — football manager, five-tier pyramid | `Football` | ES modules, no build | Built through Stage 7, 1,606 assertions, PWA. Last work 2026-09-18 (playtest fixes). |
| **Centennial Farm** — Manitoba farm 1875–2000, generational | `Farmyard-` | ES modules + bundler | Built, PWA on Pages. Last work 2026-09-25 (playtest fixes from a 1916 save). |
| **The Company** — free company, Italy 1361–75 | `Free-Company` | Single HTML file | Built through Stage 4, released to itch (`docs/itch-release.md`). One open item: a full human playthrough of Stage 4. |
| **Knight of Adalia** — narrative RPG, five chapters, a knight's life | `Knight-of-Adalia-` | Vite + Preact + TS + YAML | Complete prologue to endings. On itch (free), Android APK, Chapter One demo. Last work 2026-10-14. |
| **The Lists** — tourney knight's career, kingdom of Lothmere | `The-Lists` | ES modules + bundler | Built through Phase 9b, PWA, itch kit. Last work 2026-10-10. |
| **Vikingr** — Viking life RPG, 830 onward, sea map, three combat layers | `Vikingr` | Vite + Preact + TS + YAML | In development: years 830–835 written, Roadmap 2 underway, combat revision 2 awaiting the author's verdict. Last work 2026-10-15. |
| **Imperator** — legate turned claimant, Roman civil wars AD 68–71; hold Rome to win | `Imperator-of-Rome` | ES modules (shape B), no build yet | Phase 2 plus first playtest and the Depth pass (Senate, frontier peoples, trade, rival diplomacy). Built with the game-building skill. Default branch `ccr-8f8fa91f-0iglvu`, now with the kits' measurement, the Pages workflow and the itch kit (2026-10-26); the first Pages deploy runs on that push. Last work 2026-10-26. |
| **Age of Chivalry** — TTRPG, AI GM roadmap, canon audit vs. draft9 | none in this workspace | — | Design/canon work on the local bridge environment. No game app repo. |

All nine game apps share the same constraints: no server, no API key, turn-based,
historically grounded, phone-installable. They use three technical shapes; see
`skills/game-scaffold/references/architecture.md` for which to pick. The skills in
`skills/` are the cross-project record of what these builds taught.

## 2. Ideas discussed but never started

Not recoverable from here. Conversation transcripts from prior sessions are not
readable by a new session — only session titles, repos and committed files carry
across. Anything raised in chat and not scaffolded into a repo left no trace.

**Fix going forward:** an idea that isn't written into this file didn't happen.
Append a two-line entry when one comes up — name, core loop. That is the whole
process.

## 3. The design filter

Anything on the candidate list has to clear the constraints the existing builds
actually ran under:

- Playable offline on a phone and installable (a single file, or a static build).
- Turn-based. No real-time input, no multiplayer, no server, no API key.
- Content one person can author — art and text are the real budget, not code.
- A loop that generates stories, not just numbers.
- A win condition that generalises across starts.

That rules out, up front: anything needing a backend or live LLM calls, anything
real-time or multiplayer, anything with a procedural 3D or large-asset pipeline.

## 4. Candidates

Cleared 2026-11-22 on the author's instruction: "Clear all backlog game ideas."
The eight candidates scored on 2026-10-16 (The Workshop, Shift, The Manor Year,
Homestead, The Assize, GM Table, The Siege, The Company) and the five raised in
chat on 2026-11-21 (The Factor, The Printer, The Intelligencer, The Winter, a
post-1934 game) are off the list. The old entries are in this file's git history
(commit `8aae185` and earlier). Two of them were built anyway: The Company, and
Homestead as Centennial Farm.

Two candidates stand, both the author's, both added 2026-11-22. Neither is scored:
the old scores were set against three built games and there are now fifteen repos.

### 1. The Adalian colony (no title yet)

The author: "The spin off from the Adalian games. It is the equivalent to the
early 1600s. Gunpowder, sail, money, and colonization. You are a decendant of the
house you played in HoA or KoA, and you have been given command of a settler ship
bound for the new world. A place of plentiful bounty, hard tribesmen, and untamed
wilderness." And: "I want to take the governorship of HoA, and bring it to the
untamed wild, where you must manage your followers, your life, and pray the next
wave of settlers arrives before the black powder runs out."

- **Core loop:** each season, set the settlers to work (food, walls, trade,
  exploring), deal with the peoples already there, and spend powder and stores
  that only the next ship replaces.
- **The scarce resource is what cannot be made on the spot, and the wait for
  it.** Powder, iron, salt and new settlers arrive by ship, late or not at all.
  No built game uses delay as its main constraint.
- **What it reuses:** House of Adalia's governorship, the shared story engine
  (`game-narrative`), and the dynasty code Knight of Adalia already exports for
  a sequel to read.
- **Risk 1, overlap:** Cradle is a settlement, House of Adalia is a
  governorship, Made Post is a crew in a box. If the relief ship is not the
  whole game, this is House of Adalia with trees.
- **Risk 2, the tribesmen as a hazard table.** The colonies this is modelled on
  (Jamestown, Plymouth, Quebec) lived or starved by their dealings with the
  nations around them. The peoples of the new world need their own politics,
  wants and memory, or the game loses its best system and its footing.
- **Open:** whether House of Adalia exports a dynasty code of its own; how long
  a game is (one governor's life, or generations); what winning is.

### 2. The accidental time traveller (no title yet)

The author: "The life of an accidental time traveller. Everyone has had the
dreams to travel back in time and see the wonders of the past. Well, you got
your chance wether you like it or not. Your crazy uncle wrote you a letter,
saying he finally got it to work. Well upon arriving into his workshop, you find
a note splattered with... Blood? The note leads you to step through the swirling
vortex portal that screams \"don't jump in me\"... And you must duck, weave,
dive, and swoon your way three 3 eras of our worlds history to save your uncle
and maybe even find the place you were meant to be. This one is more drama,
comedy, narrative story telling, and dreppression curing wonder".

- **Core loop:** a written story in three eras. In each: land, pass for a
  local, follow the uncle's trail, and leave, with what you did in one era
  coming back in the next.
- **The ending is the hook:** "find the place you were meant to be" reads as a
  choice of which era to stay in, or to go home. That gives a win condition that
  holds across routes.
- **What it reuses:** the story engine, and the research already paid for. Rome
  AD 69, the north in 830, Italy in the 1360s, the Navy in 1793 and Missouri in
  the 1870s are each a built game with a checked setting.
- **Risk 1, writing load.** Three eras is three settings of authored scenes.
  Knight of Adalia took five chapters; Vikingr took 646 scenes. This is the
  costliest candidate by far.
- **Risk 2, the comedy.** It cannot be generated or measured. It needs the same
  first gate Divine Mismanagement had: the author reads a sample chain and says
  whether it is funny, before any engine work.
- **Open:** which three eras; whether the hero is fixed or made by the player;
  how much is a sim (money, health, cover) and how much is story.

## 5. Recommendation

None yet. Both candidates need a one-page spec before they can be compared. The
colony is the cheaper build (engine, governorship and dynasty contract exist);
the time traveller is the larger writing job and the newer kind of game.

## 6. Next actions

1. **Pick one.**
2. **Write the one-page spec before any code.** Core loop, the scarce resource,
   what the player decides each turn, the three ways to lose, the one way to win.
3. **Run the kill gate that fits.** For the colony, the loop as numbers only:
   twenty seasons in a script, with the relief ship late. For the time
   traveller, a written sample the author reads for tone.
4. **Only then** scaffold: `skills/game-scaffold/scripts/init.mjs` lays a repo that
   passes its own check on day one; the copy map (`skills/game-building/references/game-index.md`)
   says which game already solved the rest.
5. **Follow the `game-building` skill** (`skills/game-building/SKILL.md`), and
   re-read its scope-widening check at the first expansion, not at the start.
