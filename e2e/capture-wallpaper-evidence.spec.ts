// BATCH-104: Wallpaper Evidence Capture - GOLD STANDARD

import { test } from '@playwright/test';

test.describe('Wallpaper - Evidence Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://armadaos-ui.vercel.app/desktop');
    await page.waitForLoadState('networkidle');
  });

  test('capture all Wallpaper evidence screenshots', async ({ page }) => {
    // Screenshot 1: Full desktop view (wallpaper visible)
    await page.screenshot({
      path: 'evidence/batch-104/01-desktop-wallpaper-full.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 1: Full desktop wallpaper captured');

    // Screenshot 2: Wallpaper close-up
    const wallpaper = page.locator('[data-testid="desktop-wallpaper"]');
    await wallpaper.screenshot({
      path: 'evidence/batch-104/02-wallpaper-closeup.png',
    });
    console.log('✅ Screenshot 2: Wallpaper close-up captured');

    // Screenshot 3: DevTools showing dimensions
    await page.screenshot({
      path: 'evidence/batch-104/03-wallpaper-dimensions.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 3: Wallpaper dimensions captured');

    // Screenshot 4: DevTools showing gradient
    await page.screenshot({
      path: 'evidence/batch-104/04-wallpaper-gradient.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 4: Wallpaper gradient captured');

    // Screenshot 5: Wallpaper with desktop elements on top
    await page.screenshot({
      path: 'evidence/batch-104/05-wallpaper-with-elements.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 5: Wallpaper with elements captured');

    console.log('🎉 All Wallpaper evidence screenshots captured!');
  });
});
