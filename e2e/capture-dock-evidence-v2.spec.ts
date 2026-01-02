// BATCH-101: Dock Evidence Capture V2 - GOLD STANDARD
// Captures 6 screenshots with PROPER tooltip, hover, and running indicator evidence

import { test } from '@playwright/test';

test('Capture Dock evidence screenshots - GOLD STANDARD', async ({ page }) => {
  await page.goto('https://armadaos-ui.vercel.app/desktop');
  await page.waitForTimeout(3000); // Wait for full page load and animations
  
  // Screenshot 1: Full desktop view with Dock (colored icons, running indicator)
  await page.screenshot({ 
    path: 'evidence/dock/01-full-desktop-view.png',
    fullPage: true 
  });
  console.log('✅ Screenshot 1: Full desktop view');
  
  // Screenshot 2: Dock close-up (colored icons visible)
  const dock = page.locator('#dock');
  await dock.screenshot({
    path: 'evidence/dock/02-dock-closeup.png'
  });
  console.log('✅ Screenshot 2: Dock close-up');
  
  // Screenshot 3: Icon hover state with tooltip (CRITICAL - must show tooltip)
  const firstIcon = page.locator('#dock .dock-icon').first();
  await firstIcon.hover();
  
  // Wait for tooltip delay (500ms) + extra buffer
  await page.waitForTimeout(800);
  
  // Capture full page to show tooltip above dock
  await page.screenshot({ 
    path: 'evidence/dock/03-icon-hover-tooltip.png',
    fullPage: true
  });
  console.log('✅ Screenshot 3: Icon hover with tooltip (God Mode)');
  
  // Screenshot 4: Running indicator visible (Browser icon)
  // Move mouse away to clear hover state
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
  
  // Hover over Browser icon (5th icon, should have running indicator)
  const browserIcon = page.locator('#dock .dock-icon').nth(4); // 0-indexed, so 4 = 5th icon
  await browserIcon.hover();
  await page.waitForTimeout(800); // Wait for tooltip
  
  await page.screenshot({ 
    path: 'evidence/dock/04-running-indicator-browser.png',
    fullPage: true
  });
  console.log('✅ Screenshot 4: Running indicator on Browser icon');
  
  // Screenshot 5: Keyboard focus state
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
  
  // Tab to first icon
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(300);
  
  await page.screenshot({ 
    path: 'evidence/dock/05-keyboard-focus.png',
    fullPage: true
  });
  console.log('✅ Screenshot 5: Keyboard focus');
  
  // Screenshot 6: Living Border animation (close-up)
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
  
  // Capture dock close-up to show Living Border (now at 0.5 opacity)
  await dock.screenshot({
    path: 'evidence/dock/06-living-border-closeup.png'
  });
  console.log('✅ Screenshot 6: Living Border close-up');
  
  console.log('✅ All 6 GOLD STANDARD Dock evidence screenshots captured');
});
