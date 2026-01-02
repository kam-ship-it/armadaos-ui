// BATCH-103: God Mode E2E Tests - GOLD STANDARD

import { test, expect } from '@playwright/test';

test.describe('God Mode - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://armadaos-ui.vercel.app/desktop');
    await page.waitForLoadState('networkidle');
  });

  // GM-E2E-01: God Mode Opens with ⌘K
  test('opens God Mode with Command+K', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    
    const overlay = page.locator('[data-testid="god-mode-overlay"]');
    await expect(overlay).toBeVisible();
    await expect(overlay).toHaveAttribute('data-visible', 'true');
  });

  // GM-E2E-02: God Mode Closes with Escape
  test('closes God Mode with Escape key', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    await page.waitForTimeout(300);
    
    await page.keyboard.press('Escape');
    
    const overlay = page.locator('[data-testid="god-mode-overlay"]');
    await expect(overlay).not.toBeVisible();
  });

  // GM-E2E-03: God Mode Closes with Backdrop Click
  test('closes God Mode when backdrop is clicked', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    await page.waitForTimeout(300);
    
    const backdrop = page.locator('[data-testid="god-mode-backdrop"]');
    await backdrop.click();
    
    const overlay = page.locator('[data-testid="god-mode-overlay"]');
    await expect(overlay).not.toBeVisible();
  });

  // GM-E2E-04: Search Input Focused
  test('focuses search input when opened', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    await page.waitForTimeout(300);
    
    const searchInput = page.locator('[data-testid="god-mode-search"]');
    await expect(searchInput).toBeFocused();
  });

  // GM-E2E-05: Commands Render
  test('renders default commands', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    await page.waitForTimeout(300);
    
    await expect(page.locator('[data-testid="god-mode-result-new-window"]')).toBeVisible();
    await expect(page.locator('[data-testid="god-mode-result-close-window"]')).toBeVisible();
    await expect(page.locator('[data-testid="god-mode-result-settings"]')).toBeVisible();
    await expect(page.locator('[data-testid="god-mode-result-help"]')).toBeVisible();
  });

  // GM-E2E-06: Search Filtering Works
  test('filters commands based on search query', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    await page.waitForTimeout(300);
    
    const searchInput = page.locator('[data-testid="god-mode-search"]');
    await searchInput.fill('window');
    
    await expect(page.locator('[data-testid="god-mode-result-new-window"]')).toBeVisible();
    await expect(page.locator('[data-testid="god-mode-result-close-window"]')).toBeVisible();
    await expect(page.locator('[data-testid="god-mode-result-settings"]')).not.toBeVisible();
  });

  // GM-E2E-07: Arrow Navigation Works
  test('navigates commands with arrow keys', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    await page.waitForTimeout(300);
    
    const firstItem = page.locator('[data-testid="god-mode-result-new-window"]');
    const secondItem = page.locator('[data-testid="god-mode-result-close-window"]');
    
    await expect(firstItem).toHaveAttribute('data-selected', 'true');
    
    await page.keyboard.press('ArrowDown');
    
    await expect(firstItem).toHaveAttribute('data-selected', 'false');
    await expect(secondItem).toHaveAttribute('data-selected', 'true');
  });

  // GM-E2E-08: Visual Styling Correct
  test('has correct visual styling', async ({ page }) => {
    await page.keyboard.press('Meta+K');
    await page.waitForTimeout(300);
    
    const modal = page.locator('[data-testid="god-mode-modal"]');
    
    const boundingBox = await modal.boundingBox();
    expect(boundingBox?.width).toBeCloseTo(700, 10);
    expect(boundingBox?.height).toBeCloseTo(400, 10);
    
    const backgroundColor = await modal.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toContain('rgba');
  });
});
