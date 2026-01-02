# BATCH-100: TOP BAR - 100% GOLD STANDARD

**Document ID:** BATCH-100-TOP-BAR-V1  
**Version:** 1.0  
**Author:** COS v1.1  
**Date:** January 01, 2026  
**Status:** COMPLETE - READY FOR ATLAS 2

---

## MISSION

**Build ONLY the Top Bar component. Nothing else.**

Do NOT build:
- ❌ Dock
- ❌ Windows
- ❌ God Mode
- ❌ Wallpaper
- ❌ Ultra-Contrast Mode

Build ONLY:
- ✅ Top Bar (48px height, fixed at top, frosted glass)

---

## SPECIFICATION REFERENCE

**Primary Source of Truth:**  
`/home/ubuntu/ArmadaOS/experience/desktop/ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md`

**Read these sections:**
- **Section 3.4: Top Bar** (Lines 838-1050)
  - 3.4.1: Top Bar Structure
  - 3.4.2: Top Bar CSS
  - 3.4.3: Top Bar Behavior

**Key Requirements:**
- Height: 48px (EXACT)
- Background: `rgba(18, 18, 20, 0.5)` with `blur(16px)`
- Border-bottom: `1px solid rgba(245, 245, 247, 0.1)`
- Z-index: 10000
- Three sections: Left (app name), Center (reserved), Right (time, notifications, profile)
- Time updates every minute
- Notification badge appears when `data-visible="true"`
- Profile avatar loaded from GraphQL API

---

## DEFINITION OF DONE

### TB-01: Visual Specification
- [ ] Height is EXACTLY 48px (measure with DevTools)
- [ ] Background is `rgba(18, 18, 20, 0.5)` (inspect with DevTools)
- [ ] Backdrop blur is 16px (inspect with DevTools)
- [ ] Border-bottom is `1px solid rgba(245, 245, 247, 0.1)` (inspect with DevTools)
- [ ] Z-index is 10000 (inspect with DevTools)
- [ ] Positioned fixed at top (inspect with DevTools)

### TB-02: Layout
- [ ] Three sections: left, center, right
- [ ] Left section shows app name (18px, Medium weight)
- [ ] Center section is empty (reserved for future)
- [ ] Right section shows time, notifications, profile
- [ ] Gap between elements is 16px (measure with DevTools)

### TB-03: Time Display
- [ ] Time format is "2:45 PM" (12-hour with AM/PM)
- [ ] Time updates every 60 seconds
- [ ] Font is 16px, Regular weight, Platinum color

### TB-04: Notification Button
- [ ] Icon is 20px × 20px
- [ ] Button has 4px padding, 8px border-radius
- [ ] Hover background is `rgba(245, 245, 247, 0.1)`
- [ ] Notification badge is 4px × 4px Violet circle
- [ ] Badge is hidden when `data-visible="false"`
- [ ] Badge is visible when `data-visible="true"`

### TB-05: Profile Button
- [ ] Avatar is 28px × 28px circle
- [ ] Avatar has `1px solid rgba(245, 245, 247, 0.2)` border
- [ ] Avatar loaded from GraphQL `currentUser { avatar }` query
- [ ] Button has 4px padding, 8px border-radius
- [ ] Hover background is `rgba(245, 245, 247, 0.1)`

### TB-06: Ultra-Contrast Mode
- [ ] Background is `#000000` when `body.ultra-contrast`
- [ ] Border-bottom is `1px solid #FFFFFF` when `body.ultra-contrast`
- [ ] No backdrop-filter when `body.ultra-contrast`

### TB-07: Keyboard Navigation
- [ ] Notification and Profile buttons are focusable with Tab
- [ ] Focus indicator is visible (2px Violet box-shadow)
- [ ] Buttons are activatable with Enter or Space

### TB-08: Vercel Deployment
- [ ] Top Bar is deployed to Vercel
- [ ] Vercel URL is provided
- [ ] Top Bar renders correctly in browser at Vercel URL
- [ ] Time updates every minute on Vercel
- [ ] No console errors or warnings

---

## TEST REQUIREMENTS

### Unit Tests (Jest)
- [ ] Top Bar renders with correct height (48px)
- [ ] Time updates every 60 seconds
- [ ] Notification badge appears/disappears based on `data-visible`
- [ ] Profile avatar loads from GraphQL API

### E2E Tests (Playwright)
- [ ] Top Bar is visible at top of page
- [ ] Time displays in correct format
- [ ] Notification button is clickable
- [ ] Profile button is clickable
- [ ] Hover states work correctly

### Coverage Target
- [ ] 80% code coverage minimum

---

## VERCEL DEPLOYMENT CHECKLIST

Before submitting to Shadow L3:

1. [ ] Deploy to Vercel (`git push origin main`)
2. [ ] Open Vercel URL in browser
3. [ ] Verify Top Bar is 48px height (measure with DevTools)
4. [ ] Verify frosted glass background (inspect with DevTools)
5. [ ] Verify time displays correctly
6. [ ] Wait 60 seconds and verify time updates
7. [ ] Hover notification button to verify background change
8. [ ] Hover profile button to verify background change
9. [ ] Verify no console errors
10. [ ] Take screenshot for evidence
11. [ ] Document Vercel URL in completion report

---

## COMPLETION REPORT TEMPLATE

When BATCH-100 is complete, submit this report to COS-2:

```
BATCH-100 COMPLETION REPORT

Component: Top Bar
Status: ✅ COMPLETE
Vercel URL: [INSERT URL]
Commit Hash: [INSERT HASH]

Definition of Done:
- [✅] TB-01: Visual Specification
- [✅] TB-02: Layout
- [✅] TB-03: Time Display
- [✅] TB-04: Notification Button
- [✅] TB-05: Profile Button
- [✅] TB-06: Ultra-Contrast Mode
- [✅] TB-07: Keyboard Navigation
- [✅] TB-08: Vercel Deployment

Test Results:
- Unit Tests: [X/X passed]
- E2E Tests: [X/X passed]
- Coverage: [X%]

Evidence:
- Screenshot: [ATTACH]
- DevTools Inspection: [ATTACH]
- Test Report: [ATTACH]

Notes:
[Any additional notes or known issues]

Ready for Shadow L3 verification.
```

---

## WHAT NOT TO BUILD

**DO NOT BUILD:**
- ❌ Dock (BATCH-101)
- ❌ Windows (BATCH-102)
- ❌ God Mode (BATCH-103)
- ❌ Wallpaper (BATCH-104)
- ❌ Ultra-Contrast Mode (BATCH-105)

**BUILD ONLY:**
- ✅ Top Bar (this batch)

---

**END OF BATCH-100**

**Status:** ✅ 100% COMPLETE  
**Ready for:** Atlas 2 Execution

**Next Batch:** BATCH-101 (Dock) - Do NOT start until BATCH-100 is verified by Shadow L3
