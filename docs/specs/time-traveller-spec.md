# The accidental time traveller (no title yet): one-page spec

Status: **draft for the author's approval, 2026-11-22.** Stage 1 of the
`game-building` workflow. Nothing is built and nothing here is measured. Scene
counts are estimates.

## Setting

Now, and then. Your uncle wrote to say he finally got it to work. His workshop
is empty, there is a note with blood on it, and there is a door that should not
be gone through. You go through it.

Three eras of our own world, each a real place in a real year, each chosen
because people already love it:

| Era | Proposed place and year | Why this one |
|---|---|---|
| Viking Norway | The western fjords, about 870, as Harald Fairhair is making one kingdom of many | Fixed by the author. Reuses Vikingr's research and style guide; later than Vikingr's 830 to 865 |
| Medieval Japan | A small province in the 1560s, the age of warring states | Fixed by the author; the year is proposed. It is the one Japanese period where a nobody rose to rule, so a zero-to-hero story is true to it. Foreigners had been landing since the 1540s, so a stranger is at least thinkable |
| The third | Rome and the Bay of Naples, AD 79 to 80: Vesuvius, then the opening of the Colosseum | **Proposed, not decided.** Ten years after Imperator, so the research carries and the story does not repeat. A city, where the other two are a fjord and a castle town |

Why it is a game: a modern person in the past has nothing (no kin, no name, no
trade, no words) and knows things nobody there knows. Both facts are dangerous.

## Shape

Two acts. This is the answer to a conflict in the brief: the story chases
through three eras, and the player is meant to live a full life in the one they
love.

- **Act 1, the chase.** A short visit to each era on the uncle's trail, always
  one step behind him. This is the comedy: you are useless, and the uncle has
  already been here and left a mess. You meet the people who will matter.
- **Act 2, the life.** The door home will not open again for a set time. You
  choose one era to wait in. This is the long part: a place earned, a person
  courted, the uncle's trouble brought to its end. When the door opens you go
  home or you stay.

A playthrough sees three visits and one life. The other two lives are a reason
to play again, and nothing written is shown twice in one run.

## Core loop

Act 1 is authored scenes in sequence. In Act 2, one turn is a season:

1. **Choose what the season is for:** work for your keep, train, travel, court,
   or follow the uncle's trail.
2. **Scenes come from where you are and who you know.** Choices, with checks
   against what you can do.
3. **Decide what to do with what you know.** Boil the water, set the bone,
   predict the eclipse, or keep your mouth shut.
4. **The season closes:** your place in the household moves, people remember,
   the door is a season nearer.

## The scarce resource

**Belonging.** You arrive at the bottom of every ladder, and the one advantage
you have makes you strange. Modern knowledge solves a problem and raises the
question of how you knew. Enough of that and you are a witch, a spy or a
madman, depending on the era.

No built game runs on this. The nearest is The Company's gap between feared and
trusted, but there the player starts with a name.

## Per-turn decision

Use what you know and rise fast and exposed, or learn the era's own way and
rise slowly and safe. The same choice sits under the romance: how much of the
truth do you tell the one person you want to tell.

## The hero

Made by the player: name, male or female, two or three modern traits that turn
out to matter (a nurse, a welder, someone who rode horses as a child, someone
who only ever read about it). Zero to hero: each era has its own ladder, from
stranger on sufferance to someone with a name.

A woman's route is its own route where the era demands it, not the man's with
the pronouns changed. The failure this guards against is a female hero living a
life the era would not have allowed, with nobody in the story noticing.

## The people, and the two you can love

Each era has four major characters, two men and two women, each with a place in
the story whoever you are. The player declares at the start whether the hero
courts men or women; the two of that sex are the love interests, and the other
two are still there as friend, rival or patron. Nothing written is wasted on a
route the player did not take.

That is twelve major characters across the game, six of them courtable in any
one setup, two in any one life. The romance is a major thread and not the
spine: it can be declined, and the life is still a life.

## The ways to lose

1. **Exposed.** Strange enough, long enough, and the household turns on you.
2. **Dead.** The past kills people for small mistakes. Rare, and from a choice
   the player saw coming.
3. **The uncle is lost.** You were too slow or too careful, and you go home
   alone.

Because this is meant to leave the player better than it found them, a loss
ends a chapter and not the game: the story bends to a harder road, and only the
last chapter's losses are final. That softness is a proposal and the author's
call.

## The one way to win

The door opens. You have saved the uncle or you have not, and you choose: go
home, or stay where you turned out to belong. The ending is read from four
things: the uncle, the place you earned, who is beside you, and which side of
the door you are on. It generalises across eras and heroes because every route
ends at the same door with the same question.

## What carries over, what does not

| Carries over | From |
|---|---|
| The story engine: scenes, checks, calendar, `hero.sex`, saves and codes | `game-narrative` (shape C) |
| Norway: places, ships, the hall, the style guide | Vikingr |
| Rome, if chosen: the city, the year before | Imperator |
| The deck: every authored line has an id and is never shown twice | Divine Mismanagement |
| The continuity checker (text must not assume a choice not made) | Knight of Adalia |

Does not carry over: any sim of money, armies or trade. The engine of this game
is people.

## Tone

Drama, comedy and wonder, in that order of difficulty.

- **Comedy comes from competence, not jokes.** A modern adult cannot light a
  fire, ride, or keep quiet. Report it flatly. The uncle is the other source:
  he has been everywhere first.
- **Wonder is the product.** The player came to stand in the hall, the castle
  town, the forum. Each visit gives them one slow look before anything goes
  wrong.
- **Real people appear as they were.** The hero is never written into a real
  person's deeds.
- **Love scenes close the door.** Proposed.

## First playable scope

The prologue, the Norway visit and the Norway life, with all four of its major
characters and both sexes of hero. About 150 scenes (estimate: prologue 10,
visit 25, life 115). The whole game on the same arithmetic is about 450. For
scale, Vikingr is 646 scenes.

Each further era is its own release. The game is worth shipping with one.

## Proof before screens (two gates)

**Gate A, the read.** Before any engine work the author reads about 3,000 words:
the prologue, the first hour in Norway, one of the uncle's leavings, and the
first meeting with one love interest. The questions: is it funny without trying,
is there wonder, do you want the next scene. This is the gate Divine
Mismanagement used, and nothing measures it but the author.

**Gate B, the numbers.** Bot policies on the same seeds, with run counts:

1. A policy that always uses modern knowledge rises fastest and is exposed most.
   One that never does is safe and ends the life as nobody. Neither is best.
2. The door's timer leaves room for a place earned and a courtship, and not for
   everything.
3. Both love interests are reachable from every hero the player can make.

## Assumptions and risks

- **Writing load is the project.** Three eras, twelve major characters, two
  sexes of hero. Shipping one era first is what makes it survivable.
- **The comedy and the wonder cannot be generated.** If Gate A fails there is no
  tuning that fixes it.
- **Language.** A modern person speaks no Old Norse. It needs one conceit (the
  uncle's device, which mostly works) stated once and then left alone, or every
  scene is about translation.
- **How the hero looks.** In a Norwegian hall a stranger is odd. In 1560s Japan
  a foreign face cannot pass at all, and the story has to be written from that
  fact.
- **Japan is new ground.** No built game has touched it, and it has to be right
  for players who know it well. It is the most research and should not be the
  first era built.
- **The history is from memory:** Harald Fairhair's dates, the 1540s landings in
  Japan, Vesuvius in 79 and the Colosseum in 80. All to be checked and sourced.
- **The film Timeline** is the feeling aimed at, as the author said. Nothing of
  its story, people or places is used.

## Open for the author

1. **The third era.** Rome is proposed. The alternatives from ground already
   covered are the Navy in 1793 and Missouri in the 1870s. France and Italy in
   the 1300s are left out as too close to four games already built.
2. **The two-act shape,** and the door that stays shut for a set time.
3. **How soft losing is.**
4. **A title.**

## Decisions

| Date | Decision |
|---|---|
| 2026-11-22 | **The premise.** The author: "you must duck, weave, dive, and swoon your way three 3 eras of our worlds history to save your uncle and maybe even find the place you were meant to be. This one is more drama, comedy, narrative story telling, and dreppression curing wonder". |
| 2026-11-22 | **The eras.** The author: "The three eras are Viking Norway, medieval japan, and somewhere similar to what I've done but not the same as these two. My goal is to have 3 distinct eras and stories that will speak to a variety of players." The years, and Rome as the third, are proposals. |
| 2026-11-22 | **What it is for.** The author: "The main goal is that they get to see and interact with a slice of the era they so enjoy. A place whether they can choose 1 of 2 love interests, find a fulfilling life, and be the person they were born to be. A zero to hero type game that feels personal. One that resonates with the movie Timeline." |
| 2026-11-22 | **The hero and the romance.** The author: "The hero is the person they create. Either male or female. The love interests will be whatever they declare as their gender preference, thoigh I'm.not real interested in doing the whole non-binary. And the dating isn't the main story, it's a major part though. The other part is the world exploration/engagement, and rpg style adventure." |
