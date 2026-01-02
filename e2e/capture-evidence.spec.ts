// BATCH-100: Evidence Capture Script
// Captures 6 screenshots for completion report

import { test } from '@playwright/test';

const VERCEL_URL = 'https://armadaos-ui.vercel.app/desktop';

test.describe('Evidence Capture', () => {
  test('capture all required screenshots', async ({ page }) => {
    await page.goto(VERCEL_URL);
    
    // Wait for page to load
    await page.waitForSelector('#top-bar', { timeout: 10000 });
    
    // Screenshot 1: Full desktop view showing Top Bar
    await page.screenshot({ 
      path: 'evidence/01-full-desktop-view.png',
      fullPage: true
    });
    
    // Screenshot 2: DevTools inspection showing exact height (48px)
    await page.evaluate(() => {
      const topBar = document.querySelector('#top-bar');
      if (topBar) {
        const height = window.getComputedStyle(topBar).height;
        const div = document.createElement('div');
        div.id = 'height-indicator';
        div.style.cssText = 'position: fixed; top: 60px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px; font-size: 16px; z-index: 99999; border: 2px solid #8B5CF6;';
        div.textContent = `Top Bar Height: ${height}`;
        document.body.appendChild(div);
      }
    });
    await page.screenshot({ 
      path: 'evidence/02-height-verification.png'
    });
    
    // Screenshot 3: DevTools inspection showing exact background color
    await page.evaluate(() => {
      const indicator = document.querySelector('#height-indicator');
      if (indicator) indicator.remove();
      
      const topBar = document.querySelector('#top-bar');
      if (topBar) {
        const bg = window.getComputedStyle(topBar).backgroundColor;
        const backdropFilter = window.getComputedStyle(topBar).backdropFilter;
        const div = document.createElement('div');
        div.id = 'bg-indicator';
        div.style.cssText = 'position: fixed; top: 60px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px; font-size: 14px; z-index: 99999; border: 2px solid #8B5CF6; max-width: 400px;';
        div.innerHTML = `<strong>Background:</strong> ${bg}<br><strong>Backdrop Filter:</strong> ${backdropFilter}`;
        document.body.appendChild(div);
      }
    });
    await page.screenshot({ 
      path: 'evidence/03-background-verification.png'
    });
    
    // Screenshot 4: DevTools inspection showing z-index (10000)
    await page.evaluate(() => {
      const indicator = document.querySelector('#bg-indicator');
      if (indicator) indicator.remove();
      
      const topBar = document.querySelector('#top-bar');
      if (topBar) {
        const zIndex = window.getComputedStyle(topBar).zIndex;
        const position = window.getComputedStyle(topBar).position;
        const div = document.createElement('div');
        div.id = 'z-indicator';
        div.style.cssText = 'position: fixed; top: 60px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px; font-size: 16px; z-index: 99999; border: 2px solid #8B5CF6;';
        div.innerHTML = `<strong>Z-Index:</strong> ${zIndex}<br><strong>Position:</strong> ${position}`;
        document.body.appendChild(div);
      }
    });
    await page.screenshot({ 
      path: 'evidence/04-zindex-verification.png'
    });
    
    // Screenshot 5: Hover state on notification button
    await page.evaluate(() => {
      const indicator = document.querySelector('#z-indicator');
      if (indicator) indicator.remove();
    });
    
    const notificationButton = page.locator('button[aria-label="Notifications"]');
    await notificationButton.hover();
    await page.waitForTimeout(300); // Wait for hover transition
    
    await page.screenshot({ 
      path: 'evidence/05-notification-hover.png'
    });
    
    // Screenshot 6: Hover state on profile button
    const profileButton = page.locator('button[aria-label="User Profile"]');
    await profileButton.hover();
    await page.waitForTimeout(300); // Wait for hover transition
    
    await page.screenshot({ 
      path: 'evidence/06-profile-hover.png'
    });
    
    console.log('✅ All 6 screenshots captured successfully!');
  });
});
