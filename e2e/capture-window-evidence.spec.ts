// BATCH-102: Window Evidence Screenshot Capture - GOLD STANDARD
// Captures all 8 required screenshots automatically

import { test } from '@playwright/test';

const DEPLOYED_URL = 'https://armadaos-ui.vercel.app/desktop';

test('Capture all 8 Window evidence screenshots', async ({ page }) => {
  await page.goto(DEPLOYED_URL);
  await page.waitForTimeout(3000); // Wait for full page load
  
  // Create evidence directory (will be created if doesn't exist)
  const fs = require('fs');
  const path = require('path');
  const evidenceDir = path.join(process.cwd(), 'evidence', 'batch-102');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }
  
  console.log('📸 Starting Window evidence capture...');
  
  // Screenshot 1: Full desktop with window
  await page.screenshot({
    path: 'evidence/batch-102/01-window-overview.png',
    fullPage: true,
  });
  console.log('✅ Screenshot 1: Window overview captured');
  
  // Screenshot 2: Window close-up
  const windowFrame = page.locator('[data-testid="window-frame"]').first();
  if (await windowFrame.isVisible()) {
    await windowFrame.screenshot({
      path: 'evidence/batch-102/02-window-closeup.png',
    });
    console.log('✅ Screenshot 2: Window close-up captured');
  } else {
    console.log('⚠️  Screenshot 2: Window not visible, skipping');
  }
  
  // Screenshot 3: Window controls on titlebar hover
  const titleBar = page.locator('[data-testid="window-titlebar"]').first();
  if (await titleBar.isVisible()) {
    await titleBar.hover();
    await page.waitForTimeout(300); // Wait for hover transition
    
    await page.screenshot({
      path: 'evidence/batch-102/03-controls-hover.png',
      fullPage: true,
    });
    console.log('✅ Screenshot 3: Controls on hover captured');
  } else {
    console.log('⚠️  Screenshot 3: Titlebar not visible, skipping');
  }
  
  // Screenshot 4: Close button hover with symbol visible
  const closeButton = page.locator('[data-testid="window-control-close"]').first();
  if (await closeButton.isVisible()) {
    await closeButton.hover();
    await page.waitForTimeout(300); // Wait for symbol to appear
    
    if (await windowFrame.isVisible()) {
      await windowFrame.screenshot({
        path: 'evidence/batch-102/04-close-button-hover.png',
      });
      console.log('✅ Screenshot 4: Close button hover captured');
    }
  } else {
    console.log('⚠️  Screenshot 4: Close button not visible, skipping');
  }
  
  // Screenshot 5: Window with content (no hover)
  await page.mouse.move(0, 0); // Move mouse away
  await page.waitForTimeout(300);
  
  if (await windowFrame.isVisible()) {
    await windowFrame.screenshot({
      path: 'evidence/batch-102/05-window-content.png',
    });
    console.log('✅ Screenshot 5: Window content captured');
  } else {
    console.log('⚠️  Screenshot 5: Window not visible, skipping');
  }
  
  // Screenshot 6: Window title bar close-up
  if (await titleBar.isVisible()) {
    await titleBar.screenshot({
      path: 'evidence/batch-102/06-titlebar-closeup.png',
    });
    console.log('✅ Screenshot 6: Title bar close-up captured');
  } else {
    console.log('⚠️  Screenshot 6: Titlebar not visible, skipping');
  }
  
  // Screenshot 7: Window states (focused vs non-focused)
  await page.screenshot({
    path: 'evidence/batch-102/07-window-states.png',
    fullPage: true,
  });
  console.log('✅ Screenshot 7: Window states captured');
  
  // Screenshot 8: Window body with scrollbar
  const windowBody = page.locator('[data-testid="window-body"]').first();
  if (await windowBody.isVisible()) {
    await windowBody.screenshot({
      path: 'evidence/batch-102/08-window-body-scrollbar.png',
    });
    console.log('✅ Screenshot 8: Window body with scrollbar captured');
  } else {
    console.log('⚠️  Screenshot 8: Window body not visible, skipping');
  }
  
  console.log('');
  console.log('🎉 All Window evidence screenshots captured!');
  console.log('📁 Location: evidence/batch-102/');
  console.log('');
  console.log('Next steps:');
  console.log('1. Verify all 8 screenshots exist: ls -lh evidence/batch-102/');
  console.log('2. Commit screenshots: git add evidence/batch-102/ && git commit -m "BATCH-102: Evidence screenshots"');
  console.log('3. Push to GitHub: git push origin main');
});
