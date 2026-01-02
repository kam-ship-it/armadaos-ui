// BATCH-100: Top Bar E2E Tests
// Target: 5 E2E tests

import { test, expect } from '@playwright/test';

const VERCEL_URL = 'https://armadaos-ui.vercel.app/desktop';

test.describe('Top Bar', () => {
  test('is visible at top of page with correct height', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    // Wait for top bar to be visible
    const topBar = page.locator('#top-bar');
    await expect(topBar).toBeVisible();
    
    // Check position and height
    const box = await topBar.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.y).toBe(0); // At top of viewport
    expect(box?.height).toBe(48); // Exact height per specification
  });

  test('displays time in correct 12-hour format', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    // Wait for time display
    const timeDisplay = page.locator('#top-bar-time');
    await expect(timeDisplay).toBeVisible();
    
    // Check time format (e.g., "2:30 PM")
    const timeText = await timeDisplay.textContent();
    expect(timeText).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
  });

  test('notification button is visible and clickable', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    // Find notification button by aria-label
    const notificationButton = page.locator('button[aria-label="Notifications"]');
    await expect(notificationButton).toBeVisible();
    
    // Verify it has correct ID
    await expect(notificationButton).toHaveAttribute('id', 'top-bar-notifications');
    
    // Click should work (no error)
    await notificationButton.click();
  });

  test('profile button is visible and clickable', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    // Find profile button by aria-label
    const profileButton = page.locator('button[aria-label="User Profile"]');
    await expect(profileButton).toBeVisible();
    
    // Verify it has correct ID
    await expect(profileButton).toHaveAttribute('id', 'top-bar-profile');
    
    // Click should work (no error)
    await profileButton.click();
  });

  test('hover states work correctly on buttons', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    const notificationButton = page.locator('button[aria-label="Notifications"]');
    await expect(notificationButton).toBeVisible();
    
    // Get initial background color
    const initialBg = await notificationButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Hover over button
    await notificationButton.hover();
    
    // Wait a bit for transition
    await page.waitForTimeout(200);
    
    // Get hover background color
    const hoverBg = await notificationButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Background should change on hover (from transparent to rgba(245, 245, 247, 0.1))
    expect(hoverBg).not.toBe(initialBg);
  });

  test('app name is displayed correctly', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    // Find app name element
    const appName = page.locator('#top-bar-app-name');
    await expect(appName).toBeVisible();
    
    // Should have text content
    const text = await appName.textContent();
    expect(text).toBeTruthy();
    expect(text?.length).toBeGreaterThan(0);
  });
});
