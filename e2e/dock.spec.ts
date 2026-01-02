// BATCH-101: Dock E2E Tests - SIMPLIFIED STATE-BASED TESTS
// Tests the STATES, not the complex animations
// Per COS directive: Test what's visible, not how it got there

import { test, expect } from '@playwright/test';

const VERCEL_URL = 'https://armadaos-ui.vercel.app/desktop';

test.describe('Dock - State-Based Tests', () => {
  test('Dock renders at bottom of viewport', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const dock = page.locator('#dock');
    await expect(dock).toBeAttached();
    
    const box = await dock.boundingBox();
    const viewportHeight = page.viewportSize()?.height || 0;
    
    // Dock should be at bottom (within 100px of viewport bottom)
    expect(box?.y).toBeGreaterThan(viewportHeight - 100);
  });

  test('Dock has correct height (64px)', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const dock = page.locator('#dock');
    const height = await dock.evaluate(el => el.clientHeight);
    
    expect(height).toBe(64);
  });

  test('Dock contains 5 app icons', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const icons = page.locator('.dock-icon');
    await expect(icons).toHaveCount(5);
  });

  test('Dock icon has correct size (48px)', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const icon = page.locator('.dock-icon').first();
    const box = await icon.boundingBox();
    
    expect(box?.width).toBe(48);
    expect(box?.height).toBe(48);
  });

  test('Dock icon shows tooltip on hover', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const icon = page.locator('.dock-icon').first();
    await icon.hover();
    
    // Wait for tooltip to appear (500ms delay per spec)
    await page.waitForTimeout(600);
    
    const tooltip = page.locator('.dock-tooltip');
    await expect(tooltip).toBeVisible();
  });

  test('Dock has frosted glass background', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const dock = page.locator('#dock');
    const bgColor = await dock.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Should be rgba(28, 28, 31, 0.7)
    expect(bgColor).toContain('rgba(28, 28, 31');
  });
});
