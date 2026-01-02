# BATCH-101: DOCK - 100% GOLD STANDARD

**Document ID:** BATCH-101-DOCK-V1  
**Version:** 1.0  
**Author:** COS v1.1  
**Date:** January 01, 2026  
**Status:** COMPLETE - READY FOR ATLAS 2

---

## MISSION

**Build ONLY the Dock component. Nothing else.**

Do NOT build:
- ❌ Top Bar (already complete in BATCH-100)
- ❌ Windows
- ❌ God Mode
- ❌ Wallpaper
- ❌ Ultra-Contrast Mode

Build ONLY:
- ✅ Dock (64px height, auto-hide, centered at bottom)

---

## SPECIFICATION REFERENCE

**Primary Source of Truth:**  
`/home/ubuntu/ArmadaOS/experience/desktop/ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md`

**Read these sections:**
- **Section 3.5: Dock** (Lines 1051-1280)
  - 3.5.1: Dock Structure
  - 3.5.2: Dock CSS
  - 3.5.3: Dock Behavior (Auto-Hide Logic, Icon Click Handler, Tooltip)

**Key Requirements:**
- Height: 64px (EXACT)
- Background: `rgba(28, 28, 31, 0.7)` with `blur(12px)`
- Border-radius: 16px
- Auto-hide: Hidden by default, appears when mouse within 5px of bottom
- Auto-hide delay: 3 seconds after mouse leaves
- Icons: 48px × 48px with 12px border-radius
- Spring Bounce: Scale to 1.15 on hover
- Running indicator: 4px × 4px Platinum circle below running apps
- Tooltip: Appears 500ms after hover, frosted glass style

---

## DEFINITION OF DONE

### D-01: Visual Specification
- [ ] Height is EXACTLY 64px
- [ ] Background is `rgba(28, 28, 31, 0.7)`
- [ ] Backdrop blur is 12px
- [ ] Border-radius is 16px
- [ ] Padding is 8px
- [ ] Gap between icons is 8px
- [ ] Z-index is 9999

### D-02: Dock Icons
- [ ] Icons are 48px × 48px
- [ ] Icons have 12px border-radius
- [ ] Icons are centered in dock
- [ ] Icons have 8px gap between them

### D-03: Running Indicator
- [ ] Indicator is 4px × 4px
- [ ] Indicator is Platinum `#F5F5F7`
- [ ] Indicator is positioned 8px below icon
- [ ] Indicator is hidden when `data-running="false"`
- [ ] Indicator is visible when `data-running="true"`
- [ ] Transition is 200ms ease-out

### D-04: Spring Bounce Animation
- [ ] Icon scales to 1.15 on hover
- [ ] Transition is 150ms ease-out
- [ ] Icon returns to scale 1.0 on unhover

### D-05: Auto-Hide Behavior
- [ ] Dock is hidden by default
- [ ] Dock appears when mouse is within 5px of bottom edge
- [ ] Dock appears with 200ms ease-out transition
- [ ] Dock stays visible while hovering over it
- [ ] Dock hides 3 seconds after mouse leaves
- [ ] Dock hides with 200ms ease-out transition

### D-06: Tooltip
- [ ] Tooltip appears 500ms after hovering icon
- [ ] Tooltip displays app name
- [ ] Tooltip is positioned 72px above dock (8px gap)
- [ ] Tooltip has frosted glass background
- [ ] Tooltip fades in over 150ms
- [ ] Tooltip fades out over 150ms when unhover

### D-07: Icon Click Behavior
- [ ] Clicking icon launches app (if not running)
- [ ] Clicking icon focuses window (if already running)
- [ ] Running indicator appears when app is launched

### D-08: Ultra-Contrast Mode
- [ ] Background is `#000000` when `body.ultra-contrast`
- [ ] Border is `2px solid #FFFFFF` when `body.ultra-contrast`
- [ ] No backdrop-filter when `body.ultra-contrast`

### D-09: Keyboard Navigation
- [ ] All dock icons are focusable with Tab key
- [ ] Focus indicator is visible
- [ ] Icons are activatable with Enter or Space key

### D-10: Vercel Deployment
- [ ] Dock is deployed to Vercel
- [ ] Vercel URL is provided
- [ ] Dock renders correctly in browser
- [ ] Auto-hide behavior works on Vercel
- [ ] No console errors

---

## TEST REQUIREMENTS

### Unit Tests (Jest)
- [ ] Dock is hidden by default
- [ ] Dock shows when mouse is near bottom
- [ ] Dock hides after 3 seconds
- [ ] Running indicator appears for running apps
- [ ] Icon scales on hover (spring bounce)
- [ ] Tooltip appears after 500ms hover

### E2E Tests (Playwright)
- [ ] Dock auto-hide behavior works end-to-end
- [ ] Icon click launches app
- [ ] Tooltip displays correctly
- [ ] Spring bounce animation works

### Coverage Target
- [ ] 80% code coverage minimum

---

## VERCEL DEPLOYMENT CHECKLIST

Before submitting to Shadow L3:

1. [ ] Deploy to Vercel
2. [ ] Open Vercel URL
3. [ ] Verify Dock is hidden by default
4. [ ] Move mouse to bottom edge to trigger Dock
5. [ ] Verify Dock appears with smooth animation
6. [ ] Hover over icon to verify spring bounce
7. [ ] Wait 500ms to verify tooltip appears
8. [ ] Click icon to verify running indicator appears
9. [ ] Move mouse away and wait 3 seconds
10. [ ] Verify Dock hides automatically
11. [ ] Verify no console errors
12. [ ] Take screenshot/video for evidence
13. [ ] Document Vercel URL

---

## COMPLETION REPORT TEMPLATE

```
BATCH-101 COMPLETION REPORT

Component: Dock
Status: ✅ COMPLETE
Vercel URL: [INSERT URL]
Commit Hash: [INSERT HASH]

Definition of Done:
- [✅] D-01 through D-10

Test Results:
- Unit Tests: [X/X passed]
- E2E Tests: [X/X passed]
- Coverage: [X%]

Evidence:
- Screenshot: [ATTACH]
- Video (auto-hide demo): [ATTACH]
- Test Report: [ATTACH]

Ready for Shadow L3 verification.
```

---

**END OF BATCH-101**

**Status:** ✅ 100% COMPLETE  
**Ready for:** Atlas 2 Execution

**Next Batch:** BATCH-102 (Windows) - Do NOT start until BATCH-101 is verified by Shadow L3
