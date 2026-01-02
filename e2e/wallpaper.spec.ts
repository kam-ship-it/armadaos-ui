// BATCH-104: Wallpaper E2E Tests - GOLD STANDARD

import { test, expect } from '@playwright/test';

test.describe('Wallpaper - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://armadaos-ui.vercel.app/desktop');
    await page.waitForLoadState('networkidle');
  });

  // WP-E2E-01: Wallpaper Renders
  test('renders wallpaper on desktop', async ({ page }) => {
    const wallpaper = page.locator('[data-testid="desktop-wallpaper"]');
    await expect(wallpaper).toBeVisible();
  });

  // WP-E2E-02: Wallpaper Dimensions
  test('has correct dimensions (full viewport)', async ({ page }) => {
    const wallpaper = page.locator('[data-testid="desktop-wallpaper"]');
    
    const boundingBox = await wallpaper.boundingBox();
    const viewport = page.viewportSize();
    
    expect(boundingBox?.width).toBe(viewport?.width);
    expect(boundingBox?.height).toBe(viewport?.height);
  });

  // WP-E2E-03: Wallpaper Position
  test('is positioned at top-left corner', async ({ page }) => {
    const wallpaper = page.locator('[data-testid="desktop-wallpaper"]');
    
    const boundingBox = await wallpaper.boundingBox();
    
    expect(boundingBox?.x).toBe(0);
    expect(boundingBox?.y).toBe(0);
  });

  // WP-E2E-04: Wallpaper Background
  test('has correct gradient background', async ({ page }) => {
    const wallpaper = page.locator('[data-testid="desktop-wallpaper"]');
    
    const background = await wallpaper.evaluate((el) => 
      window.getComputedStyle(el).background
    );
    
    expect(background).toContain('linear-gradient');
    expect(background).toContain('135deg');
  });

  // WP-E2E-05: Wallpaper Z-Index
  test('is behind other desktop elements (z-index: 0)', async ({ page }) => {
    const wallpaper = page.locator('[data-testid="desktop-wallpaper"]');
    
    const zIndex = await wallpaper.evaluate((el) => 
      window.getComputedStyle(el).zIndex
    );
    
    expect(zIndex).toBe('0');
  });
});
