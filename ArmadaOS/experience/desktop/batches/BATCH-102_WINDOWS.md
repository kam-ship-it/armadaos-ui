# BATCH-102: WINDOWS - 100% GOLD STANDARD

**Document ID:** BATCH-102-WINDOWS-V1  
**Version:** 1.0  
**Author:** COS v1.1  
**Date:** January 01, 2026  
**Status:** COMPLETE - READY FOR ATLAS 2

---

## MISSION

**Build ONLY the Windows component. Nothing else.**

This is the MOST COMPLEX batch. Windows are the core interactive element of the Desktop Shell.

Do NOT build:
- ❌ Top Bar (already complete in BATCH-100)
- ❌ Dock (already complete in BATCH-101)
- ❌ God Mode
- ❌ Wallpaper
- ❌ Ultra-Contrast Mode

Build ONLY:
- ✅ Windows (with Chairman's "Selective Visibility Standard")
- ✅ Window dragging (with "Precision Inertia" physics)
- ✅ Window resizing (with "Magnetic Grid" snapping)
- ✅ Window stacking (z-index management)

---

## SPECIFICATION REFERENCE

**Primary Source of Truth:**  
`/home/ubuntu/ArmadaOS/experience/desktop/ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md`

**Read these sections:**
- **Section 3.3: Windows** (Lines 300-837)
  - 3.3.1: Window Structure
  - 3.3.2: Window Frame CSS
  - 3.3.3: Window Controls - The Selective Visibility Standard (**CRITICAL**)
  - 3.3.4: Window Title Bar
  - 3.3.5: Window Body
  - 3.3.6: Window Behaviors (Z-Index, Dragging with Precision Inertia, Resizing with Magnetic Grid)

**Key Requirements:**
- Min-width: 320px, Min-height: 240px
- Background: `rgba(28, 28, 31, 0.7)` with `blur(12px)`
- Border-radius: 12px
- **NO BORDER** (borderless windows)
- Controls: 12px circles (Red #FF5F57, Yellow #FFBD2E, Green #28C940)
- **Selective Visibility Standard:** Focused windows show controls at 40% opacity, non-focused at 0%
- **Precision Inertia:** 18px travel over 120ms after drag release
- **Magnetic Grid:** Snap to 8px grid within 4px threshold
- 8 resize handles (n, ne, e, se, s, sw, w, nw)

---

## DEFINITION OF DONE

### W-01: Selective Visibility Standard (CRITICAL)
- [ ] Focused window shows controls at 40% opacity at rest
- [ ] Focused window shows controls at 100% opacity on titlebar hover
- [ ] Focused window shows symbols at 100% opacity on control hover
- [ ] Focused window shows Living Border on control hover
- [ ] Non-focused window shows NO controls at rest (opacity: 0)
- [ ] Non-focused window shows controls at 100% opacity on titlebar hover
- [ ] Non-focused window shows symbols at 100% opacity on control hover
- [ ] Non-focused window shows Living Border on control hover
- [ ] All transitions are 150ms ease-out

### W-02: Window Frame Visual
- [ ] Background is `rgba(28, 28, 31, 0.7)`
- [ ] Backdrop blur is 12px
- [ ] Border-radius is 12px
- [ ] **NO BORDER** (borderless windows - CRITICAL)
- [ ] Box-shadow is `0 8px 32px rgba(0, 0, 0, 0.4)`
- [ ] Min-width is 320px
- [ ] Min-height is 240px

### W-03: Window Controls
- [ ] Controls are 12px × 12px circles
- [ ] Close button is `#FF5F57` (red)
- [ ] Minimize button is `#FFBD2E` (yellow)
- [ ] Maximize button is `#28C940` (green)
- [ ] Controls are positioned 12px from top-left
- [ ] Gap between controls is 8px
- [ ] Symbols are dark `#1C1C1F` lines
- [ ] Symbol stroke-width is 1.5px

### W-04: Precision Inertia (Dragging)
- [ ] Window travels 18px after drag release
- [ ] Inertia duration is 120ms
- [ ] Easing is `cubic-bezier(0.25, 0.1, 0.25, 1.0)`
- [ ] Settle distance is 2px
- [ ] Settle duration is 80ms
- [ ] Window respects viewport boundaries

### W-05: Magnetic Grid (Resizing)
- [ ] Window snaps to 8px grid
- [ ] Snap threshold is 4px
- [ ] Snap animation is 100ms ease-out
- [ ] Min-width is 320px
- [ ] Min-height is 240px
- [ ] 8 resize handles work correctly

### W-06: Z-Index Management (Stacking)
- [ ] Clicking window brings it to front
- [ ] Z-index updates correctly for all windows
- [ ] Only one window has `data-focused="true"`
- [ ] All other windows have `data-focused="false"`

### W-07: Window Control Buttons
- [ ] Close button removes window with fade-out animation
- [ ] Minimize button animates window to dock
- [ ] Maximize button toggles full-screen (minus top bar)
- [ ] Restore button returns to previous size/position

### W-08: Ultra-Contrast Mode
- [ ] Background is `#000000` when `body.ultra-contrast`
- [ ] Border is `2px solid #FFFFFF` when `body.ultra-contrast`
- [ ] No backdrop-filter when `body.ultra-contrast`

### W-09: Keyboard Navigation
- [ ] Window controls are focusable with Tab
- [ ] Focus indicator is visible
- [ ] Controls are activatable with Enter or Space

### W-10: Vercel Deployment
- [ ] Windows are deployed to Vercel
- [ ] Vercel URL is provided
- [ ] Windows render correctly in browser
- [ ] Dragging works on Vercel
- [ ] Resizing works on Vercel
- [ ] Stacking works on Vercel
- [ ] No console errors

---

## TEST REQUIREMENTS

### Unit Tests (Jest)
- [ ] Selective Visibility Standard works for focused windows
- [ ] Selective Visibility Standard works for non-focused windows
- [ ] Controls show/hide on titlebar hover
- [ ] Symbols show/hide on control hover
- [ ] Precision Inertia applies 18px travel after drag
- [ ] Magnetic Grid snaps to 8px grid
- [ ] Z-index management brings clicked window to front

### E2E Tests (Playwright)
- [ ] Complete interaction flow (focus, drag, resize, stack, close)
- [ ] Selective Visibility Standard works in browser
- [ ] Precision Inertia is visible and smooth
- [ ] Magnetic Grid snap is visible
- [ ] Window controls work correctly

### Coverage Target
- [ ] 80% code coverage minimum

---

## VERCEL DEPLOYMENT CHECKLIST

Before submitting to Shadow L3:

1. [ ] Deploy to Vercel
2. [ ] Open Vercel URL
3. [ ] Verify window renders with frosted glass
4. [ ] Verify **NO BORDER** (borderless)
5. [ ] Verify controls show at 40% for focused window
6. [ ] Verify controls are hidden for non-focused window
7. [ ] Hover titlebar to verify controls appear
8. [ ] Hover control to verify symbol appears
9. [ ] Drag window to verify Precision Inertia (18px travel)
10. [ ] Resize window to verify Magnetic Grid snap
11. [ ] Click window to verify z-index stacking
12. [ ] Click maximize to verify full-screen
13. [ ] Click minimize to verify dock animation
14. [ ] Click close to verify fade-out removal
15. [ ] Verify no console errors
16. [ ] Take video evidence of all interactions
17. [ ] Document Vercel URL

---

## COMPLETION REPORT TEMPLATE

```
BATCH-102 COMPLETION REPORT

Component: Windows
Status: ✅ COMPLETE
Vercel URL: [INSERT URL]
Commit Hash: [INSERT HASH]

Definition of Done:
- [✅] W-01 through W-10

Test Results:
- Unit Tests: [X/X passed]
- E2E Tests: [X/X passed]
- Coverage: [X%]

Evidence:
- Screenshot: [ATTACH]
- Video (dragging + inertia): [ATTACH]
- Video (resizing + grid snap): [ATTACH]
- Video (stacking): [ATTACH]
- Test Report: [ATTACH]

Ready for Shadow L3 verification.
```

---

**END OF BATCH-102**

**Status:** ✅ 100% COMPLETE  
**Ready for:** Atlas 2 Execution

**This is the most complex batch. Take your time. Build it with precision.**

**Next Batch:** BATCH-103 (God Mode) - Do NOT start until BATCH-102 is verified by Shadow L3
