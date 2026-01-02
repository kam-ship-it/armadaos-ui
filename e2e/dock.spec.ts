// BATCH-101: Dock E2E Tests - CORRECTED
// Tests the STATES with correct selectors and dock reveal logic

import { test, expect } from '@playwright/test';

const VERCEL_URL = 'https://armadaos-ui.vercel.app/desktop';

test.describe('Dock - State-Based Tests', () => {
  test('Dock renders at bottom of viewport', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    // Use correct ID
    const dock = page.locator('#dock');
    
    // If dock is auto-hidden, hover near bottom to reveal it
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      await page.mouse.move(viewportSize.width / 2, viewportSize.height - 10);
      await page.waitForTimeout(300); // Wait for reveal animation
    }
    
    await expect(dock).toBeVisible();
    
    const box = await dock.boundingBox();
    const viewportHeight = viewportSize?.height || 0;
    
    expect(box?.y).toBeGreaterThan(viewportHeight - 100);
  });

  test('Dock has correct height (64px)', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const dock = page.locator('#dock');
    
    // Reveal dock if auto-hidden
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      await page.mouse.move(viewportSize.width / 2, viewportSize.height - 10);
      await page.waitForTimeout(300);
    }
    
    const height = await dock.evaluate(el => el.clientHeight);
    expect(height).toBe(64);
  });

  test('Dock contains 5 app icons', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    // Reveal dock
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      await page.mouse.move(viewportSize.width / 2, viewportSize.height - 10);
      await page.waitForTimeout(300);
    }
    
    const icons = page.locator('#dock .dock-icon');
    await expect(icons).toHaveCount(5);
  });

  test('Dock icon has correct size (48px)', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      await page.mouse.move(viewportSize.width / 2, viewportSize.height - 10);
      await page.waitForTimeout(300);
    }
    
    const icon = page.locator('#dock .dock-icon').first();
    const box = await icon.boundingBox();
    
    expect(box?.width).toBe(48);
    expect(box?.height).toBe(48);
  });

  test('Dock icon shows tooltip on hover', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      await page.mouse.move(viewportSize.width / 2, viewportSize.height - 10);
      await page.waitForTimeout(300);
    }
    
    const icon = page.locator('#dock .dock-icon').first();
    await icon.hover();
    await page.waitForTimeout(600); // Wait for 500ms tooltip delay + buffer
    
    const tooltip = page.locator('.dock-tooltip');
    await expect(tooltip).toBeVisible();
  });

  test('Dock has frosted glass background', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      await page.mouse.move(viewportSize.width / 2, viewportSize.height - 10);
      await page.waitForTimeout(300);
    }
    
    const dock = page.locator('#dock');
    const bgColor = await dock.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    expect(bgColor).toContain('rgba(28, 28, 31');
  });
});
