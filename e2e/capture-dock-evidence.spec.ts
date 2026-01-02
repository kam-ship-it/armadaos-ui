// BATCH-101: Dock Evidence Capture
// Captures 6 screenshots for completion report

import { test } from '@playwright/test';

test('Capture Dock evidence screenshots', async ({ page }) => {
  await page.goto('https://armadaos-ui.vercel.app/desktop');
  await page.waitForTimeout(2000); // Wait for animations
  
  // Screenshot 1: Full desktop view with Dock
  await page.screenshot({ 
    path: 'evidence/dock/01-full-desktop-view.png',
    fullPage: true 
  });
  
  // Screenshot 2: Dock close-up
  const dock = page.locator('#dock');
  await dock.screenshot({
    path: 'evidence/dock/02-dock-closeup.png'
  });
  
  // Screenshot 3: Icon hover state
  const firstIcon = page.locator('#dock .dock-icon').first();
  await firstIcon.hover();
  await page.waitForTimeout(600); // Wait for tooltip delay
  await page.screenshot({ 
    path: 'evidence/dock/03-icon-hover-tooltip.png' 
  });
  
  // Screenshot 4: All 5 icons
  await page.mouse.move(0, 0); // Move mouse away
  await page.waitForTimeout(200);
  await dock.screenshot({
    path: 'evidence/dock/04-all-five-icons.png'
  });
  
  // Screenshot 5: Keyboard focus state
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
  await page.screenshot({ 
    path: 'evidence/dock/05-keyboard-focus.png' 
  });
  
  // Screenshot 6: Running indicator (if applicable)
  // For now, just capture the dock in default state
  await page.mouse.move(0, 0);
  await page.waitForTimeout(200);
  await dock.screenshot({
    path: 'evidence/dock/06-dock-default-state.png'
  });
  
  console.log('✅ All 6 Dock evidence screenshots captured');
});
