// BATCH-105: Ultra-Contrast Mode Evidence Capture - GOLD STANDARD

import { test } from '@playwright/test';

test.describe('Ultra-Contrast Mode - Evidence Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://armadaos-ui.vercel.app/desktop');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test('capture all Ultra-Contrast Mode evidence screenshots', async ({ page }) => {
    // Screenshot 1: Normal mode (before toggle)
    await page.screenshot({
      path: 'evidence/batch-105/01-normal-mode.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 1: Normal mode captured');

    // Screenshot 2: Toggle button close-up (normal mode)
    const toggle = page.locator('[data-testid="ultra-contrast-toggle"]');
    await toggle.screenshot({
      path: 'evidence/batch-105/02-toggle-button-normal.png',
    });
    console.log('✅ Screenshot 2: Toggle button (normal) captured');

    // Screenshot 3: Toggle button hover
    await toggle.hover();
    await page.waitForTimeout(300);
    await toggle.screenshot({
      path: 'evidence/batch-105/03-toggle-button-hover.png',
    });
    console.log('✅ Screenshot 3: Toggle button hover captured');

    // Screenshot 4: Ultra-contrast mode enabled
    await toggle.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'evidence/batch-105/04-ultra-contrast-enabled.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 4: Ultra-contrast mode enabled captured');

    // Screenshot 5: Toggle button in ultra-contrast mode
    await toggle.screenshot({
      path: 'evidence/batch-105/05-toggle-button-contrast.png',
    });
    console.log('✅ Screenshot 5: Toggle button (contrast) captured');

    // Screenshot 6: Wallpaper in ultra-contrast (pure black)
    const wallpaper = page.locator('[data-testid="desktop-wallpaper"]');
    await wallpaper.screenshot({
      path: 'evidence/batch-105/06-wallpaper-pure-black.png',
    });
    console.log('✅ Screenshot 6: Wallpaper pure black captured');

    // Screenshot 7: Full desktop comparison (side-by-side simulation)
    await page.screenshot({
      path: 'evidence/batch-105/07-full-desktop-contrast.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 7: Full desktop contrast captured');

    console.log('🎉 All Ultra-Contrast Mode evidence screenshots captured!');
  });
});
