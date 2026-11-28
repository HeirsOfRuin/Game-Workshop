# Middle Sea (working title): one-page spec

A grand strategy game on a real map of Europe and the Middle East. You are a
dynasty ruling a state. Each generation you build the ruler's authority, spend
it on the map, and find out whether the heir can hold what you painted.

Status: **Stage 1 draft, 2026-11-28.** Waiting for the author's approval. No
repo exists yet; when it does, this file moves there as `docs/SPEC.md`. All
history below is from memory and unchecked. Every number is a placeholder for
the kill gate to set.

---

## Setting

**The game:** Europe and the Middle East, from Iberia to Persia and from
Scandinavia to Egypt. It is played as a set of separate eras between 1000 BCE
and 1600 CE. All eras share one engine and one map. An era is data: who starts
where, their rulers, the unit roster, the innovations available, the event deck
and the era's goals.

**Why separate eras and not one run from 1000 BCE to 1600 CE.** A single
2,600-year run breaks three things:
- the history, because one technology tree across that span turns into fantasy;
- the balance, because no one can measure a run that long;
- the writing budget, because every period needs its own events.

**First era: the Crusades, starting in 1100 and ending in 1200.** No other
period on this map has more states of comparable weight pulling on each other
across the Mediterranean. Candidate starting powers (unchecked):
- the Byzantine Empire under Alexios I Komnenos;
- the Seljuk Sultanate of Rum, the Great Seljuks, the Danishmendids, and the
  Syrian emirates of Aleppo and Damascus;
- the Fatimid Caliphate, with its vizier al-Afdal;
- the crusader states: Jerusalem, Antioch, Edessa, and later Tripoli;
- Norman Sicily and Apulia;
- Venice, Genoa and Pisa;
- in Iberia, León-Castile, Aragon and the Almoravids;
- the Holy Roman Empire, France, England, Hungary, Poland, Kievan Rus, Georgia
  and the Papacy.

Later eras, in rough order of fit: the Successors of Alexander (323 BCE), the
Black Death (1340s), the Ottoman rise (1453 to 1600), Justinian and the
Sasanians (527 CE), Rome and Carthage (264 BCE), and the Iron Age kingdoms
(c. 900 BCE). Each new era is a scope widening (F10): every gate is measured
again when it goes in.

**Why it is a game.** In these periods a realm was held together by the person
at its head. Conquest, taxes and levies all spent the ruler's standing. A
strong king's death could undo a generation of gains in one season. That
tension between spending standing to grow and keeping enough of it to hold on
is a strategy game, and it is where the drama comes from.

## Core loop

One turn is half a year. A run of the first era is about 200 turns: a hundred
years, three to five rulers.

1. **Winter: the court.** Council business, buildings, innovations, marriages,
   diplomacy, plots and events. This is where authority is earned or spent on
   decisions.
2. **Summer: the campaign.** Moving armies, sieges, battles, raids and
   crusades. This is where authority is spent on the map.
3. **Resolve.** Income, upkeep, provinces' loyalty, the spread of innovations,
   and births, deaths and illness among the ruling family. The rival states run
   the same functions as the player.
4. **Succession, when the ruler dies.** The heir takes the throne with low
   authority. Every vassal, governor and recently taken province tests its
   loyalty against it. A realm held on borrowed authority cracks; a well-held
   realm passes on whole.
5. **The Legacy ledger.** Each province-year under your colour is counted, and
   the map is snapshotted at each ruler's death.

## The scarce resource

**Authority: the ruler's personal standing, not the state's money or men.**

- **It is spent on:** conquest, levies, new taxes, overruling the council,
  land held far from the capital, and land of another faith or culture.
- **It is earned by:** victories, justice, good marriages, piety, time on the
  throne and a loyal council.
- **Every held province has a holding cost.** The cost rises with distance from
  the capital, difference in faith and culture, and how the province was taken
  (inheritance costs least, conquest most). If the total cost exceeds the
  ruler's authority, the realm is over-reaching: loyalty falls and revolts
  become likely.
- **Authority does not pass on whole.** The heir inherits a share of it, and the
  rest has to be earned again.

**How it differs from the last games' resources:**
- Silk Road's resource is money.
- Touchline's is morale.
- The Company's is the gap between being feared and being trusted.
- Imperator's is legions' loyalty within one civil war.
- Here it is one person's standing, and it is tested again with every
  generation.

It is also the brake on the snowball. Map painting stays satisfying because
every province you paint has to be held, and the test of holding it comes when
you can least control it.

Money, men and supplies are real but secondary. The question each generation
asks is whether the ruler can hold what they have.

## Per-turn decision

**In winter:** given the ruler's authority, the realm's holding cost, the
council's loyalty, the treasury and the heir's age and prospects, decide where
the authority goes:
- into growth: a war, a claim, a new tax;
- into holding on: justice, gifts, concessions to vassals;
- into the next generation: the heir's marriage and education, and the
  succession law.

**In summer:** decide which war is worth the authority it will cost, and
whether to press a won battle or stop before the realm overreaches.

## The ways to lose

- **The dynasty dies out.** No eligible heir is left.
- **The capital falls.** Another power holds it for 4 consecutive turns.
- **The ruler is deposed.** Authority stays at zero for 4 consecutive turns.

## The one way to win

**Legacy at the era's end.** Legacy is the sum of every province-year held
(full weight), bound as a vassal or tributary (half weight) or under your sway
through trade, faith, marriage or culture (quarter weight). Each fulfilled era
goal adds to it, and so does the dynasty's survival to the end. Era goals in
the first era might be to take or hold Jerusalem, restore the Byzantine borders
of 1025, or hold the western end of the eastern trade.

The score is placed on a ladder of the era's historical houses, which are
scored by the same function. A score is never typed in.

The win generalises across starts and eras because every house and every era
is scored by the same function. A small house that survives and grows can
outrank a great empire that broke apart.

Proposed targets, for the author to change: about 30% of careful play survives
the era with a Legacy above the historical median, and about 10% reaches the
top three rungs.

## Systems, in one line each

- **Map:** about 120 provinces in about 25 regions, built from Natural Earth
  data with Imperator's map builder. Map modes show Held, Bound, Sway, faith,
  culture and trade.
- **Military:** armies are a mix of unit types. A battle is three or four
  orders (deployment, the reserve, press or withdraw) resolved by one resolver,
  which auto-resolve also uses. Sieges last several turns and cost supplies on
  both sides. Chance moves numbers and never decides what beats what.
- **Innovations:** a small pool per era. They spread from province to province
  over several turns. Nothing is bought in one turn.
- **Trade:** a handful of hubs (Venice, Constantinople, Alexandria, Baghdad,
  Bruges, and others) and the routes between them. Holding a hub brings money
  and Sway. Watch this one: Cradle found trade was a balance trap.
- **Diplomacy:** marriages, alliances, tribute, truces and claims, all
  remembered.
- **Cities and nations:** each province has a set number of building slots. A
  realm's laws (succession, how it raises troops, faith) shape what authority
  costs.
- **Characters:** the ruler, the heir, their spouses, and a council of five:
  marshal, steward, chancellor, spymaster, and chaplain or vizier. The drama
  comes from the council's loyalty and from succession, not from a cast of
  hundreds.
- **Events:** drawn from a deck in which no authored line repeats in a run
  (Divine Mismanagement's deck), from the first commit.
- **Playable houses:** 6 in the vertical slice, picked for different
  difficulties. Every other state is a rival on the same rules.

## Kill gate (Stage 2): the claims to test

The kill gate is a numbers-only model of the 1100 map, with fixed policies and
seeds and no screens. It must show four things:

1. **Tall** (develop and trade), **wide** (conquer) and **dynastic** (marry and
   make vassals) play each win on some seeds, and none of them dominates.
2. Over-reaching realms crack at succession at a measured rate, and careful
   play is not starved.
3. Most runs still face a crisis in their last third.
4. The map changes with the player passive. Rival states grow, fall and fight
   each other on the same rules.

If authority does nothing that holding a large army would not also do, the
core is wrong and the spec comes back before any code.

## What carries over and what does not

| Carries over | From |
|---|---|
| Shape B (ES modules, bundled); phone first, offline, installable | the stable's constraints |
| Real-geography map builder | `Imperator-of-Rome/tools/` |
| One battle resolver for fought and auto-resolved battles | `Free-Company` `resolveRound`, `Vikingr` shield-wall |
| Diplomacy that remembers | `Football/src/engine/negotiation.js` |
| Succession and dynasty | `Knight-of-Adalia-` `dynasty.ts` |
| Heraldry for each house | `The-Lists/src/engine/heraldry.js` |
| An event deck that never repeats | `Divine-Mismanagement/src/engine/deck.js` |
| Large packed saves | `Football/src/state/codec.js` |
| A ladder of rival bodies scored by one function | `Dinosaurs` (standing) |

**What is new:** many states on one map, each run by the same rules; a dynasty
across generations; and painting the map as a record, not just a means.

**What does not carry over:**
- real-time battles of any kind;
- a single technology tree across eras;
- a cast of hundreds of characters;
- any server or online play.

## Risks

1. **Scope.** This is the largest build in the workshop. The kill gate decides
   whether it goes on.
2. **Rival states.** They have to be competent and fast on a phone while
   playing by the player's rules. This is the hardest code in the project.
3. **The snowball.** If the authority brake is too weak, the late game is a
   cleanup. If it is too strong, careful play is punished.
4. **The writing load.** Events are the drama, and drama costs words.
5. **The interface.** A map game at 390px. Look at it on a phone from day one.
6. **History.** Real rulers start each era and heirs born in play are
   generated. The history is checked before it shapes a number.

## Decisions

| Date | Decision |
|---|---|
| 2026-11-28 | **The pitch.** The author: "A 4x like game. A mix between crusader Kings, civilization, total war... heavily strategic, dramatic, management-based, and focusing on several periods that can range anywhere from 1000 BCE to 1600 CE. It would have military, tech, trade, diplomacy, city and nation development, and the lovely pass time of map painting... The map I am thinking is between Europe and the middle East." |
| 2026-11-28 | **The recommendations taken.** The author: "Go with your recommendations." Taken on that word, and his to change: (1) the player is a dynasty ruling a state; (2) the first era starts c. 1100; (3) a battle is three or four orders on one resolver, with no tactical grid; (4) phone first, like the rest of the stable; (5) the scarce resource is the ruler's authority, tested at succession; (6) eras are separate campaigns on one map and engine; (7) a turn is half a year, winter for the court and summer for the campaign. The win targets (30% / 10%) are the recommender's proposal and have not been confirmed. |
