// BATCH-105: Ultra-Contrast Mode E2E Tests - GOLD STANDARD

import { test, expect } from '@playwright/test';

test.describe('Ultra-Contrast Mode - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://armadaos-ui.vercel.app/desktop');
    await page.waitForLoadState('networkidle');
    
    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  // UC-E2E-01: Toggle Button Renders
  test('renders ultra-contrast toggle button', async ({ page }) => {
    const toggle = page.locator('[data-testid="ultra-contrast-toggle"]');
    await expect(toggle).toBeVisible();
  });

  // UC-E2E-02: Initial State (Off)
  test('starts in normal mode with Moon icon', async ({ page }) => {
    const moonIcon = page.locator('[data-testid="ultra-contrast-icon-moon"]');
    await expect(moonIcon).toBeVisible();
    
    const bodyClass = await page.evaluate(() => document.body.classList.contains('ultra-contrast'));
    expect(bodyClass).toBe(false);
  });

  // UC-E2E-03: Enable Ultra-Contrast
  test('enables ultra-contrast mode when clicked', async ({ page }) => {
    const toggle = page.locator('[data-testid="ultra-contrast-toggle"]');
    await toggle.click();
    await page.waitForTimeout(300);
    
    const bodyClass = await page.evaluate(() => document.body.classList.contains('ultra-contrast'));
    expect(bodyClass).toBe(true);
    
    const sunIcon = page.locator('[data-testid="ultra-contrast-icon-sun"]');
    await expect(sunIcon).toBeVisible();
  });

  // UC-E2E-04: Disable Ultra-Contrast
  test('disables ultra-contrast mode when clicked again', async ({ page }) => {
    const toggle = page.locator('[data-testid="ultra-contrast-toggle"]');
    
    // Enable
    await toggle.click();
    await page.waitForTimeout(300);
    
    // Disable
    await toggle.click();
    await page.waitForTimeout(300);
    
    const bodyClass = await page.evaluate(() => document.body.classList.contains('ultra-contrast'));
    expect(bodyClass).toBe(false);
    
    const moonIcon = page.locator('[data-testid="ultra-contrast-icon-moon"]');
    await expect(moonIcon).toBeVisible();
  });

  // UC-E2E-05: Persistence Across Reload
  test('persists ultra-contrast mode across page reload', async ({ page }) => {
    const toggle = page.locator('[data-testid="ultra-contrast-toggle"]');
    await toggle.click();
    await page.waitForTimeout(300);
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const bodyClass = await page.evaluate(() => document.body.classList.contains('ultra-contrast'));
    expect(bodyClass).toBe(true);
    
    const sunIcon = page.locator('[data-testid="ultra-contrast-icon-sun"]');
    await expect(sunIcon).toBeVisible();
  });

  // UC-E2E-06: Wallpaper Changes
  test('changes wallpaper to pure black in ultra-contrast mode', async ({ page }) => {
    const wallpaper = page.locator('[data-testid="desktop-wallpaper"]');
    
    // Normal mode
    const normalBg = await wallpaper.evaluate((el) => 
      window.getComputedStyle(el).background
    );
    expect(normalBg).toContain('linear-gradient');
    
    // Enable ultra-contrast
    const toggle = page.locator('[data-testid="ultra-contrast-toggle"]');
    await toggle.click();
    await page.waitForTimeout(300);
    
    // Ultra-contrast mode
    const contrastBg = await wallpaper.evaluate((el) => 
      window.getComputedStyle(el).background
    );
    expect(contrastBg).toContain('rgb(0, 0, 0)'); // Pure black
  });
});
