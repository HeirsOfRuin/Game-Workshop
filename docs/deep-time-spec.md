# Deep Time (working title): one-page spec

Status: Stage 1 draft, 2026-11-24. Waiting for the author's approval. No repo
yet; this file moves to the game's own `docs/SPEC.md` when one is scaffolded.

The author's brief, 2026-11-24: "a 2d [pixel] type game similar to spore, but
you [evolve] your simple amphibian like animal into [one of] the first
dinosaurs". On the turn-based lineage version: "Yes that's fine, but don't make
it fly by without any room for investment. I also think the Triassic should be
a playable age as well, with save points between every era."

## Setting

The shore of a Late Devonian river, about 375 million years ago, to the end of
the Triassic, about 201 million years ago. The player steers one lineage of
four-legged animals, not one animal. It is a game because the real history is a
run of body-plan bets, each paid for in food, with four known die-offs that
punished whoever had bet too narrowly.

All dates and events below are from memory and are checked before they shape a
number. The animal the player starts as looks amphibian but is an early
tetrapod; dinosaurs do not descend from modern amphibians. The game says so
once.

| Era | Span (Ma) | Turns | The test | Ends with |
|---|---|---|---|---|
| 1 The Shore | 375 to 359 | 12 | Limbs, lungs, leaving the water | End-Devonian die-off |
| 2 The Coal Forests | 359 to 299 | 25 | The shelled egg; living away from water | Rainforest collapse, about 305 |
| 3 The Drying | 299 to 265 | 20 | Heat, drought, the mammal-line rivals on top | A mid-Permian die-off |
| 4 The Long Shadow | 265 to 252 | 20 | Living small under bigger animals | The Great Dying, 252 |
| 5 The Triassic | 252 to 201 | 30 | Upright gait; the lineage becomes a dinosaur near 230 and is played as one | End-Triassic die-off, 201 |

About 107 turns. Estimated 30 to 45 minutes an era, three to four hours a full
run; the estimate is not measured.

## Core loop (one turn, a stretch of deep time)

1. The world moves: climate, plants and prey shift in each region; rivals
   evolve by the same rules as the player.
2. The turn offers three mutations, drawn from what the current body allows.
3. The player keeps one or none, and points the lineage's selection pressure at
   one trait already under way.
4. The player sets where the lineage lives: which regions it holds and what it
   eats in each.
5. The turn resolves: food in, upkeep out, population up or down per region.
6. The warning signs of the era's die-off are shown as they build.

## Room for investment

The author asked that it not fly by. Four rules carry that:

- **A trait is built, not bought.** Each has three steps (a hint, developed,
  refined). A step takes several turns of pressure. One decision plays out over
  a quarter of an era.
- **Traits rest on other traits.** An upright gait needs the hip first. What
  was built earlier decides what can be offered later.
- **Nothing is undone cheaply.** Losing a trait takes turns too, and its upkeep
  is paid until it is gone. A specialised body is a real commitment.
- **The lineage holds ground.** It spreads over two or three regions of an era
  map. Spreading costs population now and is the insurance when a region dies.

## The scarce resource

Energy. Every trait has an upkeep in food: size, warm blood, armour, a big
brain. A body that cannot feed itself in the regions it holds shrinks. The
earlier games spent money, men or time; this one spends calories, and the
price of food changes under the player as the climate does.

## Per-turn decision

Specialise or stay general. A specialist out-eats its rivals in the world as it
is. A generalist eats worse every turn and survives the die-off that the era
has been warning about. The player can see the die-off coming but not its
exact shape, and a trait started now will not be finished for several turns.

## The ways to lose

- **Starved out.** Upkeep outgrows food in every region held.
- **Out-competed.** A rival lineage takes the niche and the population falls
  to nothing.
- **Caught by the die-off.** The era ends and no region held is survivable for
  the body that was built.

A loss returns the player to the save at the start of that era, not to the
Devonian shore.

## The one way to win

Carry the lineage through the end-Triassic die-off as a dinosaur. The lineage
crosses into dinosaurs partway through Era 5 if it has the body for it, and
the rest of the era is played as one. A lineage that survives as something
else (crocodile line, mammal line, an animal that never changed) gets its own
ending and is not a win.

## Save points

An autosave is written at the start of every era and kept. The player can
resume from, or go back and replay, any era reached. Ordinary saving within an
era is automatic.

## Look

2D pixel art. The animal is drawn from layered parts in six slots (skull, jaw,
trunk, limbs, tail, skin), about five drawn variants each. Every part changes
a number; a part that does not is not drawn.

## What the kill gate must show (Stage 2, numbers only, no art)

- Specialist, generalist and opportunist policies end measurably differently on
  the same seeds.
- No policy wins everywhere; each is best in some era.
- The Great Dying kills most lineages that reach it and not all.
- A trait started with five turns of warning can still matter; one started
  with one turn cannot.
- Holding more regions lowers income and raises survival.

## Assumptions and open questions

- Phone-first, offline, no backend, like the other builds. Not yet said by the
  author for this game.
- The title is a placeholder.
- Run length: is three to four hours, in five sittings, the right size?
- Does going back to an earlier era's save fork the run or overwrite it?

## Decisions

| Date | Decision |
|---|---|
| 2026-11-24 | **Turn-based lineage, not real-time control of one animal.** The author: "Yes that's fine, but don't make it fly by without any room for investment." Traits are built over several turns and rest on earlier traits. |
| 2026-11-24 | **The Triassic is played, with a save at every era.** The author: "I also think the Triassic should be a playable age as well, with save points between every era." Era 5 runs to 201 Ma; the lineage is played as a dinosaur for the back half. |
