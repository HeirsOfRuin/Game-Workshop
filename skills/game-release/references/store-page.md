# The store page, the rating ask, and the account address

Three rules every HeirsOfRuin game follows from its first release. `check-store.mjs` checks the parts a tool can
check; the rest is in the before-public list. The author asked for all three on 2026-11-21: learn from The Lists'
cover art and short description, ask for a rating after the first chapter and again at the end of every game, and
keep every link on the account's new address.

## 1. The account address

**Every itch link in a game, its page copy and its store docs is `https://heirs-of-ruin.itch.io/<slug>`.**

The account was renamed from `edmodo1` to Heirs of Ruin on 2026-11-21. itch says the old address redirects, but
three games had the old one written into the build itself (House of Adalia's Menu links, Knight of Adalia's
"Export your house" panel, Vikingr's "Get the full game" button), and a redirect is not something to rely on in a
build that players keep for years. One constant per game holds the address (`LINKS` in House of Adalia's
`src/release.ts`, `FULL_GAME_URL` in Vikingr's `src/ui/demo.ts`); everything else reads it.

`check-store.mjs` fails on any `edmodo1.itch.io` or `itch.io/profile/edmodo1` link in a tracked file, and on any
`*.itch.io` game link under another account. History is exempt (`docs/audit/`, `retrospectives/`, `transcripts/`,
`playthroughs/`): it records what was true then.

## 2. The listing: what The Lists does

The Lists is the account's steadiest listing. Measured on itch's dashboard, 2026-11-21:

| | The Lists | the other six games |
|---|---|---|
| Views, last 30 days | 1,662 (the most) | 167 to 1,270 |
| 7-day impressions | 2,568 | 113 to 2,844 |
| Click-through | 3.27%, held between 3.1% and 3.5% for a month on the largest impressions | 2.2% to 3.0% (House of Adalia 7.8%, on 550 impressions, with the sequel's own audience) |
| Collections | 20 (the most) | 0 to 13 |
| Visits from the creator page | 247, the most, from second-to-last place on that page | 34 to 95 |

What the cover does (The Lists `tools/itch.mjs`, the `--art` cover):

1. **The picture is the game's own art, drawn by the game's own code.** Five shields from `heraldry.js`, hung on a
   lance. Not a painting, not a mock-up: the thing the player will see. Silk Road's later cover carries the
   game's own portraits for the same reason.
2. **One title, large, in a face that says the period.** Gold blackletter on deep navy. It reads at 315 x 250.
3. **A tagline that states the whole arc:** "A tourney knight's life, from his spurs to the last page." Who you
   are, and how long the game is. A life, not a level.
4. **A row of verbs:** "Joust · Court · Marry · Choose a side." Four things you do, in the footer, at a size that
   survives the listing. This is the line a browser actually reads.
5. A thin frame; nothing else. No logo, no feature list, no screenshot collage.

The short description follows the same shape: **the verbs first, then the arc.**

> Joust, court, marry and choose a side: one tourney knight's whole life, from first lance to last page.

Under 110 characters, no "a game about", no genre words the tags already say.

The template `cover.html` has these slots (title, arc, verbs, the game's own art); `check-store.mjs` fails while
the verb row still holds its placeholder. Write the short description as `docs/itch/short-description.txt` in the
pattern above; the tool checks it exists and is under 120 characters. Then look at it at 315 x 250 (`press.mjs`
writes the preview): the verbs must still be readable there.

What did not carry: Dead or Alive's wanted-poster cover rose from 1.86% to 3.22% after its hook was made legible,
then fell back to 2.06% the next week. One week of a small sample is noise; judge a cover on four weeks.

Tags: `life-simulation` sends this account more visits than any other tag (its tag pages, alone and crossed with
web, Android, mobile, medieval, historical and text-based, are nine of the account's top twenty referrers, 509
visits in 30 days, 2026-11-21). Use it on
every game where you live a life; do not use it where you do not.

## 3. Ask for a rating, twice

**Every game asks for a rating at its first natural stopping point and again at its end.**

Seven ratings across about 4,200 views on seven games (2026-11-20), and nothing in any game asked. itch's own
"things to rate" page sent Dead or Alive five visits: players rate when asked.

- **The first stopping point:** the end of the first chapter, the first year, the first tourney season, the first
  completed caravan: the first moment a player has had a whole experience and is about to start the next.
  In a demo, put the first stopping point inside the demo, so demo players see it too.
- **The end:** the ending, the epilogue, the death screen, the end-of-career page.
- **Shown once each,** remembered in the save. Never a modal that blocks play, never on a timer, never more than
  these two.
- **One line and a link** to the game's own page on the account: "If you are enjoying it, a rating on itch.io
  helps other people find it." The link opens in a new tab (`target="_blank" rel="noopener"`); rating needs an
  itch login and happens on the page.
- **Marked in the code** so the check can find both: `data-rate="first-stop"` and `data-rate="end"` on the
  element (or `rate:first-stop` and `rate:end` in a comment beside it, where markup is not HTML).

`templates/rate-prompt.js` is a drop-in: `ratePrompt({ url, at })` returns the HTML with its marker. Vikingr was the
first game to carry both (2026-11-21, `src/ui/components/RateAsk.tsx`): the first stop on the first winter's hall
screen, the end on the saga's first death screen (a son can carry the saga on, so not at every death). Proved in
the built game at 390 px: each shows, survives a reload, closes for good on "Not now", and the winter one did not
return through four more winters.
