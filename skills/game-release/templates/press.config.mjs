// tools/press.config.mjs: what tools/press.mjs photographs. Each shot drives the
// REAL build to a moment worth showing. Seed believable state through the game's
// own save format, and clear first-visit hints so the shot is the game, not a tooltip.
export default {
  site: 'dist/site',
  size: [480, 820],              // the measured embed size (tools/embed-measure.mjs)
  cover: 'docs/itch/cover.html',
  hide: ['.toast', '.hint'],     // transient elements that would cover a shot
  shots: [
    {
      name: 'the-turn',
      async drive({ page }) {
        await page.click('[data-act="new"]');
        for (let i = 0; i < 6; i++) {
          await page.locator('[data-action]:not([disabled])').first().click();
          if (await page.locator('.scrim [data-act="close"]').count()) await page.locator('.scrim [data-act="close"]').click();
        }
      },
    },
    {
      name: 'the-report',
      async drive({ page }) {
        await page.click('[data-act="new"]');
        await page.locator('[data-action]:not([disabled])').first().click(); // leave the turn report open
      },
    },
  ],
};
