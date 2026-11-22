# The Adalian colony (no title yet): one-page spec

Status: **draft for the author's approval, 2026-11-22.** Stage 1 of the
`game-building` workflow. Nothing is built and nothing here is measured. Every
number is a starting guess for the kill gate to test.

## Setting

The Adalian world, about two and a half centuries after *Knight of Adalia*: the
equivalent of the early 1600s. Gunpowder, ocean-going ships, chartered
companies and their investors. You are a descendant of the house the player
raised in *Knight of Adalia* or *House of Adalia*, given command of a settler
ship bound across the Grey Ocean (the open western sea of `content/canon.md`,
which the old games' maps show and never cross).

Why it is a game: the colony cannot make powder, iron, salt or people. They
come by ship, ordered a year or more ahead, and the ship is late, short or
lost. Everything else the governor decides is decided inside that wait.

The models are Jamestown (1607), Quebec (1608) and Plymouth (1620). The world
is invented; the pressures are theirs.

## Core loop

One turn is half a year. About thirty years of life, so about sixty turns.

**Summer (the sailing season)**
1. **The ship, or no ship.** If one comes: settlers, stores, letters from home,
   and the backers' verdict on last year's cargo.
2. **Set the hands.** Every able settler goes to one job: food, walls, cargo
   for home, building, or ranging the country.
3. **Deal with the neighbours.** Trade, gifts, a marriage, a quarrel answered
   or let pass.
4. **Write the requisition.** What you ask for sails home with the ship. It
   comes back next summer at the earliest.

**Winter (nothing comes)**
5. **Live on what is in the store.** Ration, hunt (which burns powder), buy
   corn from the neighbours, or go hungry.
6. **The colony's own trouble.** Sickness, idle gentlemen, a faction that wants
   you gone, men slipping away to live with the tribes.
7. **Your own life.** Health, marriage, children, and the deputy you are or are
   not training.

## The scarce resource

**What cannot be made here, and the wait for it.** Black powder is the visible
clock: it hunts, it defends, it salutes, it buys friends, and none of it is
made on this shore until late in a good run.

No built game uses delay as its main constraint. Money runs Silk Road and
Cradle, loyalty runs The Company and Made Post, favour runs The Lady of
Saint-Pol. Here the decision made this summer is paid for two summers on, by
which time the colony that made it is a different colony.

## Per-turn decision

There are never enough hands. Food keeps people alive this winter. Walls keep
them alive when relations turn. Cargo for home is the only thing that makes the
backers send the next ship, and it feeds nobody. Powder spent hunting is not
there for the walls. The requisition is a bet on what the colony will need in
two years, written by someone who does not know how many will be alive to need
it.

## The people already there

Two or three nations with their own leaders, rivalries, harvests and memory.
They are a system, not a hazard table. The failure this guards against: the
real colonies ate or starved by their neighbours' corn, and a game that treats
those neighbours as wolves loses its best system and its honesty.

- They can feed the colony, trade with it, marry into it, use it against each
  other, or starve it out.
- They remember. A raid for corn in year two is still there in year twenty.
- Selling them powder and guns buys a winter and changes every later war.
- Later waves of settlers want land. The middle of the game is that pressure.

## Your followers

Named settlers with a trade, a temper and a faction: gentlemen (who came to get
rich and do not dig), labourers and bound servants, soldiers, craftsmen, and in
later waves families and a minister or two. The requisition also chooses people:
ask for carpenters and you get what the backers could find.

## Your character

One person's life. Made at the start, sex and name chosen by the player.

- **With a code from an earlier game** (`KOAD1.` from *Knight of Adalia*, and
  *House of Adalia*'s if it has one): the house's name and arms, its standing
  and wealth (which become backing at home and credit with the Company), its
  traits, and its old enemies (who become hostile investors). The author:
  "heavily influenced added bonuses coming from your previous games saves".
- **Without one:** a few quick choices give the same things. For example a
  younger child of an old house (standing, little money), a merchant's heir
  (credit, no name), a soldier of the late wars (the men follow you, the
  backers do not), a house in disgrace (sent here to be forgotten).

## The ways to lose

1. **The colony dies or is abandoned.** Starved, overrun, or everyone sails
   home on the first ship that calls.
2. **You are removed.** A mutiny of your own people, or the backers recall you
   and send a replacement.
3. **You die and it does not outlast you.** The colony fails inside ten years
   of your death.

## The one way to win

The author: "Winning is seeing the colony surpass your own life."

When you die (or lay the office down), the game plays ten more years with
nobody at the helm but the successor you trained and the colony you left. If it
is still there, you won. The score is what it became: its people, its peace or
its wars, whether it makes its own powder, how many were born there.

It generalises across starts because it never asks how big the colony got. It
asks whether it needed you.

## What carries over, what does not

| Carries over | From |
|---|---|
| The story engine and its checks, saves and save codes | `game-narrative` (shape C) |
| The governorship: offices, council, petitions | *House of Adalia* |
| The house: name, arms, standing, wealth, enemies | The dynasty code |
| Crew-in-a-box pressure, measured | *Made Post* |

Does not carry over: generations (this is one life), a map of known realms, the
medieval army, the Adalian court as a place you can go.

## First playable scope

One landing site, two nations, about forty named settlers over three waves, six
jobs, one cargo, the requisition, powder, the first ten years (twenty turns),
and the code read. No succession test yet; it needs the whole life.

## Proof before screens (the kill gate)

Numbers only, fixed bot policies on the same seeds, every gap with its noise
floor and run count.

1. **The wait is the game.** The same policy with ships that always arrive on
   time survives the first ten years far more often than with real ships. A
   policy that orders ahead beats one that orders for today.
2. **Powder is a clock.** A policy that hunts with powder in the early winters
   eats better and loses more wars later. Neither wins outright.
3. **The neighbours are not a hazard table.** Trading, raiding and ignoring
   them give three different colonies, and none of the three is best on every
   seed.
4. **No best job.** No fixed split of hands dominates.
5. **The middle is not dead.** Years ten to twenty hold at least one real
   decision a turn. This is the fault The Manor Year was flagged for.
6. **Winning is reachable and uncommon.** A careful policy passes the ten-year
   test about one run in three; a careless one almost never.

If claim 1 fails, the game is House of Adalia with trees and should stop here.

## Assumptions and risks

- **Sixty turns may be too long or too short.** Half-year turns are a guess. The
  gate measures decisions per turn before any screen is drawn.
- **Overlap** with Cradle (a settlement), House of Adalia (a governorship) and
  Made Post (a crew). The relief ship has to be the centre or this adds nothing.
- **House of Adalia is not in this checkout.** Whether it exports a code of its
  own, and what its governorship looks like in code, is unread.
- **The history is from memory.** Jamestown's supply missions and starving
  winter, the gentlemen who would not work, the dates above: all to be checked
  and sourced before they shape numbers.
- **Sickness the settlers bring.** It emptied whole nations in the real
  history. Whether this world has it is the author's decision, and it changes
  the tone of the whole game.
- **Canon.** Nothing in `canon.md` says what lies across the Grey Ocean. The
  new world, its nations and its names are all new canon and need a sheet of
  their own before content is written.

## Open for the author

1. The sickness question above.
2. Is the colony Adalia's own, or a company's with the Crown's charter?
3. A title.

## Decisions

| Date | Decision |
|---|---|
| 2026-11-22 | **One life.** The author: "Colony is one person's life. You create your character at the start of the game, with heavily influenced added bonuses coming from your previous games saves or from the quick decision backgrounds you choose." |
| 2026-11-22 | **The win.** The author: "Winning is seeing the colony surpass your own life." Read here as: the colony stands ten years after the governor's death. The ten is a guess. |
| 2026-11-22 | **The premise.** The author: "I want to take the governorship of HoA, and bring it to the untamed wild, where you must manage your followers, your life, and pray the next wave of settlers arrives before the black powder runs out." |
