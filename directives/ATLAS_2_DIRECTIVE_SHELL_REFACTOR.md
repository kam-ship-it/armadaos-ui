# ATLAS 2 DIRECTIVE: SHELL GLOBAL REFACTOR

---

**TO:** Atlas 2  
**FROM:** COS v1.1  
**DATE:** December 31, 2025  
**PRIORITY:** IMMEDIATE  
**CLASSIFICATION:** ARCHITECTURAL CORRECTION  

---

## 1.0 EXECUTIVE SUMMARY

Shadow L3 has issued a **CONDITIONAL PASS** for BATCH-DESKTOP-01. Your work is exceptional (99% complete, 98% visual fidelity, Gold Standard quality), but Chairman has clarified a critical architectural decision:

**The Shell must be GLOBAL, not route-specific.**

This directive provides the architectural guidance to complete BATCH-DESKTOP-01 to 100%.

---

## 2.0 CHAIRMAN'S ARCHITECTURAL DECISION

**Question:** Is the Shell a global layer or route-specific?

**Chairman's Answer:** **SCENARIO A - GLOBAL SHELL (100% to 100%)**

> "It's ok for an App to have its own styling like godmode being kind of different, but that's still INSIDE in a window correct?"

**Architectural Clarification:**
- Shell (background + wallpaper + Dock) = **Global persistent layer** (like macOS Finder)
- God Mode = **App running in a window** on top of Shell
- All other apps = **Windows** on top of Shell  
- `/desktop` route = Shell with NO windows open (clean desktop view)
- Other routes = Shell with app windows rendered on top

---

## 3.0 CURRENT IMPLEMENTATION ANALYSIS

**Current Architecture (App.tsx):**
```tsx
<Routes>
  <Route path="/desktop" element={<Shell><DesktopShell /></Shell>} />
  <Route path="/god-mode/*" element={<GodModeLayout>...</GodModeLayout>} />
</Routes>
```

**Problem:** Shell only renders on `/desktop` route. God Mode replaces Shell entirely.

**Required Architecture:**
```tsx
<Shell>  {/* Global wrapper - always visible */}
  <Routes>
    <Route path="/desktop" element={<DesktopShell mode="standalone" />} />
    <Route path="/god-mode/*" element={<Window app="god-mode"><GodModeLayout>...</GodModeLayout></Window>} />
  </Routes>
</Shell>
```

---

## 4.0 REFACTOR REQUIREMENTS

### 4.1 App.tsx Refactor
**Objective:** Make Shell the global wrapper for all routes.

**Changes Required:**
1. Move `<Shell>` outside of `<Routes>`
2. Wrap God Mode routes in a Window component
3. Ensure `/desktop` route shows Shell with no windows (clean desktop)
4. Ensure `/god-mode/*` routes show Shell with God Mode window on top

### 4.2 Window Component
**Objective:** Create a reusable Window component for apps.

**Requirements:**
- Draggable window (use `react-rnd` or similar)
- Resizable window
- Window chrome (title bar, close/minimize/maximize buttons)
- Z-index management (active window on top)
- Window state management (position, size, minimized/maximized)

**Note:** Window component implementation can be **minimal/placeholder** for now. Focus on architectural structure. Full window management will be BATCH-DESKTOP-02.

### 4.3 God Mode Integration
**Objective:** God Mode should render inside a Window on top of Shell.

**Changes Required:**
1. Wrap `<GodModeLayout>` in `<Window>` component
2. God Mode should maintain its own styling (dark theme, unique layout)
3. Window should be full-screen by default (or near full-screen)
4. User should still see Shell background/Dock behind/around God Mode window

---

## 5.0 ACCEPTANCE CRITERIA (REFACTOR COMPLETION)

| ID | Criterion | Verification Method |
|:---|:---|:---|
| 1 | Shell visible on ALL routes | Navigate to `/desktop`, `/god-mode/architecture` - Shell + Dock visible on both |
| 2 | God Mode renders in Window | God Mode has window chrome (title bar, close button) |
| 3 | `/desktop` shows clean Shell | No windows open, just background + wallpaper + Dock |
| 4 | Dock always visible | Dock persists across all routes |
| 5 | God Mode maintains styling | God Mode's dark theme and layout unchanged |
| 6 | Window is draggable | Can drag God Mode window around (even if minimal) |
| 7 | No visual regressions | Shell/Dock visual fidelity remains 98%+ |

---

## 6.0 IMPLEMENTATION GUIDANCE

### 6.1 Suggested Approach
1. **Phase 1:** Refactor App.tsx to make Shell global (2 hours)
2. **Phase 2:** Create minimal Window component (3 hours)
3. **Phase 3:** Integrate God Mode into Window (2 hours)
4. **Phase 4:** Test and verify all acceptance criteria (1 hour)

**Total Estimated Time:** 8 hours

### 6.2 Window Component Scope
**For this refactor, Window component can be MINIMAL:**
- Basic draggable div (use `react-rnd`)
- Simple title bar with close button
- No minimize/maximize (can be placeholder buttons)
- No window state persistence (can be added in BATCH-DESKTOP-02)

**Goal:** Prove the architecture works. Full window management is BATCH-DESKTOP-02.

---

## 7.0 DELIVERABLES

1. **Refactored App.tsx** with Shell as global wrapper
2. **Window.tsx component** (minimal but functional)
3. **God Mode integration** (renders inside Window)
4. **Verification screenshots** showing Shell visible on all routes
5. **Self-verification report** confirming all 7 acceptance criteria met

---

## 8.0 TIMELINE & BLOCKING STATUS

**Status:** Atlas 2 is **BLOCKED** from BATCH-DESKTOP-02 implementation until this refactor is complete.

**Allowed Activities:**
- ✅ Research for BATCH-DESKTOP-02
- ✅ Architecture planning for BATCH-DESKTOP-02
- ❌ Implementation of BATCH-DESKTOP-02 (blocked)

**Target Completion:** Within 24 hours of receiving this directive

**Unblock Condition:** All 7 acceptance criteria met + self-verification report submitted

---

## 9.0 BRANDING SPECIFICATION UPDATE

**Note:** Atlas 2 identified a gap in batch directives. Future batches will explicitly reference:
- **Color System V2** (canonical color palette)
- **Typography System V1** (font hierarchy)

This gap will be addressed in updated batch directive templates. Thank you for identifying this.

---

## 10.0 FINAL NOTES

**Atlas 2, your work on BATCH-DESKTOP-01 is exceptional.** This is not a quality issue—it's an architectural clarification. The Shell/Dock implementation is Gold Standard. We just need to move it from route-specific to global.

**This refactor proves the architecture.** Once complete, BATCH-DESKTOP-02 (Window Manager) will build on this foundation.

**Questions?** Escalate to COS immediately. Do not proceed with assumptions.

---

**COS v1.1 SIGNATURE:** `COS-ATLAS-2-DIRECTIVE-SHELL-REFACTOR-20251231`

**DIRECTIVE STATUS:** ACTIVE  
**BLOCKING:** BATCH-DESKTOP-02 implementation  
**UNBLOCK CONDITION:** 7/7 acceptance criteria met + verification report submitted

---

**100% to 100%. No shortcuts. Gold Standard only.**
