// The rating ask (references/store-page.md, section 3): one line and a link, shown at the first natural stopping
// point and again at the end, each once. Copy into the game and call it from those two screens.
//
//   import { ratePrompt, RATE_URL } from './rate-prompt.js';
//   html += ratePrompt({ at: 'first-stop' });   // end of the first chapter / year / season
//   html += ratePrompt({ at: 'end' });          // the ending, epilogue or death screen
//
// In Preact or React, render the same markup: keep data-rate="first-stop" / data-rate="end" on the element,
// because tools/check-store.mjs looks for those markers to prove both asks are in the game.
// Remember that it was shown in the save (a flag), and do not show it again: never a modal, never on a timer.

/** The game's own page on the account. Change the slug; keep the account (renamed 2026-11-21). */
export const RATE_URL = 'https://heirs-of-ruin.itch.io/your-game-slug';

const LINES = {
  'first-stop': 'If you are enjoying it, a rating on itch.io helps other people find it.',
  end: 'If this life stayed with you, a rating on itch.io helps other people find it.',
};

export function ratePrompt({ at, url = RATE_URL, text } = {}) {
  if (!LINES[at]) throw new Error(`ratePrompt: at must be "first-stop" or "end", not "${at}"`);
  const t = text || LINES[at];
  return `<p class="rate-ask" data-rate="${at}">${t} <a href="${url}" target="_blank" rel="noopener">Rate it on itch.io</a></p>`;
}
