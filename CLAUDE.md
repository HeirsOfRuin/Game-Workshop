# Game Workshop: working rules

- Skills are edited in `skills/`; `packages/` is generated. Never edit a `.skill` by hand.
- After any change: `node skills/check-skills.mjs`, then `node skills/pack.mjs`, then
  `node skills/check-skills.mjs` again. Commit sources and packages together.
- Some files exist in two skills on purpose (a skill must work installed alone).
  The pairs are listed in `skills/check-skills.mjs`; edit the canonical (first)
  copy and copy it over the other.
- `SKILL.md`: description under 1,024 characters, body under 500 lines (the hub
  under 250). Detail goes in `references/`.
- Prove a tool on a real game before calling it done, and say which game in the
  skill. A tool that has not been run says so.
- Scratch files are `tools/_*.mjs` or `*.tmp.*` and are never committed.
- Write for a reader who was not there: plain words, the failure behind each rule,
  the game that paid for it.
