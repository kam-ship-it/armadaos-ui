// BATCH-103: God Mode Evidence Capture - GOLD STANDARD

import { test } from '@playwright/test';

test.describe('God Mode - Evidence Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://armadaos-ui.vercel.app/desktop');
    await page.waitForLoadState('networkidle');
  });

  test('capture all God Mode evidence screenshots', async ({ page }) => {
    // Screenshot 1: God Mode closed (desktop view)
    await page.screenshot({
      path: 'evidence/batch-103/01-desktop-before-godmode.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 1: Desktop before God Mode captured');

    // Screenshot 2: God Mode open (full modal)
    await page.keyboard.press('Meta+K');
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'evidence/batch-103/02-godmode-open.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 2: God Mode open captured');

    // Screenshot 3: God Mode search input focused
    const searchInput = page.locator('[data-testid="god-mode-search"]');
    await searchInput.focus();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'evidence/batch-103/03-search-input-focused.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 3: Search input focused captured');

    // Screenshot 4: Search filtering (type "window")
    await searchInput.fill('window');
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'evidence/batch-103/04-search-filtering.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 4: Search filtering captured');

    // Screenshot 5: Command selected (arrow down)
    await searchInput.clear();
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'evidence/batch-103/05-command-selected.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 5: Command selected captured');

    // Screenshot 6: Command hover state
    const command = page.locator('[data-testid="god-mode-result-settings"]');
    await command.hover();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'evidence/batch-103/06-command-hover.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 6: Command hover captured');

    // Screenshot 7: No results (search for nonexistent)
    await searchInput.fill('xyz123nonexistent');
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'evidence/batch-103/07-no-results.png',
      fullPage: false,
    });
    console.log('✅ Screenshot 7: No results captured');

    // Screenshot 8: God Mode close-up (modal only)
    await searchInput.clear();
    await page.waitForTimeout(300);
    const modal = page.locator('[data-testid="god-mode-modal"]');
    await modal.screenshot({
      path: 'evidence/batch-103/08-modal-closeup.png',
    });
    console.log('✅ Screenshot 8: Modal close-up captured');

    console.log('🎉 All God Mode evidence screenshots captured!');
  });
});
