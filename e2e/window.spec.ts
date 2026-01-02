// BATCH-102: Window E2E Tests - GOLD STANDARD
// Target: 8 tests, all passing on Vercel deployment

import { test, expect } from '@playwright/test';

const DEPLOYED_URL = 'https://armadaos-ui.vercel.app/desktop';

test.describe('Window - E2E Tests (Gold Standard)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEPLOYED_URL);
    await page.waitForTimeout(2000); // Wait for page load and hydration
  });

  // E2E-01: Window Renders on Deployed Site
  test('Window renders on deployed Vercel site', async ({ page }) => {
    // Check if at least one window frame exists
    const windowFrame = page.locator('[data-testid="window-frame"]').first();
    
    // Wait up to 5 seconds for window to appear
    await expect(windowFrame).toBeVisible({ timeout: 5000 });
  });

  // E2E-02: Window Title Displays
  test('Window title displays correctly', async ({ page }) => {
    const windowTitle = page.locator('[data-testid="window-title"]').first();
    
    await expect(windowTitle).toBeVisible();
    await expect(windowTitle).not.toBeEmpty();
  });

  // E2E-03: Window Controls Visible on Hover
  test('Window controls become visible on titlebar hover', async ({ page }) => {
    const titleBar = page.locator('[data-testid="window-titlebar"]').first();
    const closeButton = page.locator('[data-testid="window-control-close"]').first();
    
    // Hover over title bar
    await titleBar.hover();
    await page.waitForTimeout(200); // Wait for transition
    
    // Controls should be visible
    await expect(closeButton).toBeVisible();
  });

  // E2E-04: Close Button Works
  test('Close button closes the window', async ({ page }) => {
    const windowFrame = page.locator('[data-testid="window-frame"]').first();
    const closeButton = page.locator('[data-testid="window-control-close"]').first();
    
    // Verify window exists
    await expect(windowFrame).toBeVisible();
    
    // Hover to make button visible
    await closeButton.hover();
    await page.waitForTimeout(200);
    
    // Click close
    await closeButton.click();
    await page.waitForTimeout(500); // Wait for close animation
    
    // Window should be gone (or minimized)
    const windowCount = await page.locator('[data-testid="window-frame"]').count();
    expect(windowCount).toBeLessThanOrEqual(0);
  });

  // E2E-05: Window Has Frosted Glass Background
  test('Window has frosted glass styling (backdrop-filter)', async ({ page }) => {
    const windowFrame = page.locator('[data-testid="window-frame"]').first();
    
    // Get computed backdrop-filter style
    const backdropFilter = await windowFrame.evaluate((el) => {
      return window.getComputedStyle(el).backdropFilter;
    });
    
    // Should contain 'blur'
    expect(backdropFilter).toContain('blur');
  });

  // E2E-06: Window Controls Have macOS Colors
  test('Window controls have correct macOS-style colors', async ({ page }) => {
    const closeButton = page.locator('[data-testid="window-control-close"]').first();
    const minimizeButton = page.locator('[data-testid="window-control-minimize"]').first();
    const maximizeButton = page.locator('[data-testid="window-control-maximize"]').first();
    
    // Hover to make visible
    await closeButton.hover();
    await page.waitForTimeout(200);
    
    // Get background colors
    const closeColor = await closeButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    const minimizeColor = await minimizeButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    const maximizeColor = await maximizeButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Verify colors (RGB format)
    // Close: #FF5F57 = rgb(255, 95, 87)
    expect(closeColor).toContain('255');
    expect(closeColor).toContain('95');
    expect(closeColor).toContain('87');
    
    // Minimize: #FFBD2E = rgb(255, 189, 46)
    expect(minimizeColor).toContain('255');
    expect(minimizeColor).toContain('189');
    
    // Maximize: #28C940 = rgb(40, 201, 64)
    expect(maximizeColor).toContain('40');
    expect(maximizeColor).toContain('201');
  });

  // E2E-07: Window Body Renders Content
  test('Window body renders content', async ({ page }) => {
    const windowBody = page.locator('[data-testid="window-body"]').first();
    
    await expect(windowBody).toBeVisible();
    
    // Window body should not be empty
    const hasContent = await windowBody.evaluate((el) => {
      return el.textContent && el.textContent.trim().length > 0;
    });
    
    expect(hasContent).toBeTruthy();
  });

  // E2E-08: No Console Errors on Page Load
  test('No console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    
    // Capture console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Navigate and wait
    await page.goto(DEPLOYED_URL);
    await page.waitForTimeout(3000);
    
    // Filter out known non-critical errors (e.g., favicon 404)
    const criticalErrors = errors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('404')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});
