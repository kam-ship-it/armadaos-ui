# ATLAS 2: UNIFIED DIRECTIVE - Shell Refactor + Design System V3.0

---

**TO:** Atlas 2  
**FROM:** Chairman via COS v1.1  
**DATE:** December 31, 2025  
**PRIORITY:** IMMEDIATE  
**STATUS:** ✅ UNBLOCKED - PROCEED WITH EXECUTION

---

## EXECUTIVE SUMMARY

You are cleared to complete BATCH-DESKTOP-01 with the correct architectural guidance and design system specifications.

**Shadow L3 Verdict:** CONDITIONAL PASS (99% complete, 98% visual fidelity, Gold Standard code quality)

**What You Need to Do:**
1. **Shell Refactor:** Make Shell global (architectural correction)
2. **Brand Fixes:** Apply correct design system (Living Border, Borderless, correct colors)

**Estimated Time:** 10-12 hours total

**This directive provides 100% context and 0% ambiguity. Everything you need is here.**

---

## PART 1: SHELL REFACTOR (ARCHITECTURAL)

### Chairman's Decision: Shell is GLOBAL

**Current Problem:** Shell only renders on `/desktop` route. God Mode replaces Shell entirely.

**Required:** Shell (background + wallpaper + Dock) must be visible on ALL routes. God Mode and other apps run in WINDOWS on top of Shell.

### Current Architecture (WRONG)
```tsx
<Routes>
  <Route path="/desktop" element={<Shell><DesktopShell /></Shell>} />
  <Route path="/god-mode/*" element={<GodModeLayout>...</GodModeLayout>} />
</Routes>
```

### Required Architecture (CORRECT)
```tsx
<Shell>  {/* Global wrapper - always visible */}
  <Routes>
    <Route path="/desktop" element={<DesktopShell mode="standalone" />} />
    <Route path="/god-mode/*" element={
      <Window app="god-mode">
        <GodModeLayout>...</GodModeLayout>
      </Window>
    } />
  </Routes>
</Shell>
```

### Implementation Steps

**Step 1: Refactor App.tsx**
- Move `<Shell>` outside `<Routes>`
- Shell becomes global wrapper
- All routes render inside Shell

**Step 2: Create Window Component**
- Install: `pnpm add react-rnd`
- Create minimal draggable window
- Title bar with close button
- Basic styling (frosted glass)

**Step 3: Wrap God Mode in Window**
- Import Window component
- Wrap `<GodModeLayout>` in `<Window>`
- God Mode keeps its own styling
- Window should be large (near full-screen by default)

**Step 4: Verify Shell Visibility**
- Navigate to `/desktop` → Shell visible, no windows
- Navigate to `/god-mode` → Shell visible, God Mode in window on top
- Dock visible on all routes

---

## PART 2: DESIGN SYSTEM V3.0 (BRAND FIXES)

### Critical Update: Previous Branding Specs Were INCORRECT

**What Happened:** COS provided incorrect color values in initial directive. CMO/CPO have now provided the correct ArmadaOS Ultimate Luxury Design System V3.0.

**This section provides the CORRECT specifications.**

---

### Fix 1: Background Color

**❌ INCORRECT (from COS initial directive):**
```css
background: #0A0A0B; /* WRONG */
```

**✅ CORRECT (CMO/CPO Design System V3.0):**
```css
background: #121214; /* Tungsten - CORRECT */
```

**Where to Apply:**
- Shell background
- Desktop background
- All primary backgrounds in dark mode

---

### Fix 2: Accent Color (Violet)

**✅ CORRECT:**
```css
--color-violet: #8B5CF6;
--color-accent: #8B5CF6;
```

**Usage Rules (STRICTLY ENFORCED):**
- Purple MUST appear in <5% of any interface
- Use ONLY for: active states, subtle glows, progress indicators
- NEVER for: large backgrounds, body text, borders (except active states), focus rings

**Where to Apply:**
- "New Window" button
- Nexus Bar icons (active states)
- Command button
- All interactive element active states

---

### Fix 3: Living Border Focus Indicator (CMO-APPROVED)

**❌ DEPRECATED: Purple Focus Ring**
```css
*:focus {
  outline: 2px solid #8B5CF6; /* DEPRECATED - DO NOT USE */
}
```

**✅ MANDATORY: Living Border**

**Dark Mode:**
```css
*:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.8); /* White border "comes alive" */
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3); /* Subtle white glow */
  transition: all 150ms ease-out;
}
```

**Light Mode:**
```css
*:focus {
  outline: none;
  border: 1px solid rgba(18, 18, 20, 0.8); /* Dark border "comes alive" */
  box-shadow: 0 0 8px rgba(18, 18, 20, 0.3); /* Subtle dark glow */
  transition: all 150ms ease-out;
}
```

**Why This Matters:**
- ✅ Brand cohesive (uses white/tungsten, not purple)
- ✅ Maintains purple <5% rule
- ✅ WCAG AAA accessible (19.8:1 contrast)
- ✅ Elegant (element "comes alive")
- ✅ Luxury (premium, not tacked-on)

**CMO Quote:** "This is the kind of detail that separates a good design from a legendary one."

---

### Fix 4: Borderless Frosted Glass (CMO-APPROVED)

**❌ DEPRECATED: Visible Borders in Dark Mode**
```css
.window-chrome {
  border: 1px solid rgba(255, 255, 255, 0.1); /* DEPRECATED */
}
```

**✅ MANDATORY: Borderless in Dark Mode**

**Dark Mode:**
```css
.window-chrome {
  background: rgba(18, 18, 20, 0.7); /* Tungsten with 70% opacity */
  backdrop-filter: blur(12px);
  border: none; /* BORDERLESS - frosted glass speaks for itself */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); /* Shadows provide depth */
}
```

**Light Mode:**
```css
.window-chrome {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(18, 18, 20, 0.08); /* Subtle border for definition */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```

**Exception:** Notifications keep purple LEFT border only (3px) as accent.

**CMO Quote:** "Borderless frosted glass is perfect."

---

### Fix 5: Tri-Prism Logo with Glow Pulse

**❌ INCORRECT:** Generic "ArmadaOS" text

**✅ CORRECT:** Tri-Prism logo with violet glow pulse

**Implementation:**
```tsx
import TriPrismLogo from '@/assets/triprism_final_v9.png';

<div className="logo-container">
  <img 
    src={TriPrismLogo} 
    alt="ArmadaOS" 
    className="logo"
    style={{ height: '32px' }}
  />
</div>
```

```css
.logo {
  height: 32px;
  padding: 16px;
  animation: glow-pulse 1.5s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { 
    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.4)); 
  }
  50% { 
    filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.6)); 
  }
}
```

**Logo Location:** `/home/ubuntu/ArmadaOS/design-system/triprism_final_v9.png`

---

### Fix 6: Typography (Inter Font Family)

**❌ INCORRECT:** Default system font

**✅ CORRECT:** Inter font family

**Implementation:**
```bash
pnpm add @fontsource/inter
```

```tsx
// In your main layout or App.tsx
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
```

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

### Fix 7: Nexus Bar Glow

**❌ INCORRECT:** Flat Nexus Bar

**✅ CORRECT:** Subtle violet glow

```css
.nexus-bar {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
}
```

---

### Fix 8: Icons (Replace Emoji with SVG)

**❌ INCORRECT:** Emoji icons (📄, ⚡)

**✅ CORRECT:** Lucide SVG icons

**Implementation:**
```bash
pnpm add lucide-react
```

```tsx
import { FileText, Zap, Settings, Home } from 'lucide-react';

<FileText size={20} strokeWidth={2} color="#8B5CF6" />
<Zap size={20} strokeWidth={2} color="#8B5CF6" />
```

---

## COMPLETE COLOR PALETTE (CMO/CPO APPROVED)

```css
/* Base Colors (4-Color Restraint) */
--color-tungsten: #121214;        /* Primary background (dark mode) */
--color-black: #000000;           /* Pure black for depth, gradients */
--color-white: #FFFFFF;           /* Text, icons, light mode background */
--color-violet: #8B5CF6;          /* Accent (active states ONLY, <5%) */

/* Semantic Tokens */
--color-background: var(--color-tungsten);
--color-foreground: var(--color-white);
--color-accent: var(--color-violet);

/* Alpha Variants */
--color-white-10: rgba(255, 255, 255, 0.1);
--color-white-20: rgba(255, 255, 255, 0.2);
--color-white-40: rgba(255, 255, 255, 0.4);
--color-white-60: rgba(255, 255, 255, 0.6);
--color-white-80: rgba(255, 255, 255, 0.8);

--color-violet-10: rgba(139, 92, 246, 0.1);
--color-violet-20: rgba(139, 92, 246, 0.2);
--color-violet-40: rgba(139, 92, 246, 0.4);
--color-violet-60: rgba(139, 92, 246, 0.6);
--color-violet-80: rgba(139, 92, 246, 0.8);

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.08);
--border-focus: rgba(255, 255, 255, 0.8); /* Living Border */
```

---

## ACCEPTANCE CRITERIA (10/10 REQUIRED)

### Architectural (Shell Refactor)
1. ✅ Shell visible on ALL routes (desktop, god-mode, etc.)
2. ✅ God Mode renders in Window component
3. ✅ `/desktop` shows clean Shell (no windows)
4. ✅ Dock always visible across all routes
5. ✅ Window is draggable

### Brand Compliance (Design System V3.0)
6. ✅ Background is Tungsten (#121214)
7. ✅ All accents are Violet (#8B5CF6), <5% usage
8. ✅ Tri-Prism logo with glow pulse
9. ✅ Living Border focus indicator (white in dark mode)
10. ✅ Borderless frosted glass in dark mode

---

## ESTIMATED TIME BREAKDOWN

| Task | Time |
|:---|:---|
| Shell refactor (global architecture) | 4 hours |
| Window component (minimal) | 3 hours |
| Brand compliance fixes (colors, logo, typography, icons) | 3-4 hours |
| Testing and verification | 2 hours |
| **Total** | **12-13 hours** |

---

## DELIVERABLES

1. ✅ Refactored App.tsx (Shell global)
2. ✅ Window.tsx component (minimal but functional)
3. ✅ God Mode in Window
4. ✅ All brand compliance fixes applied
5. ✅ Screenshots showing Shell on all routes
6. ✅ Self-verification report (10/10 criteria met)

---

## REFERENCE DOCUMENTS

**Design System (Primary Source):**
- `/home/ubuntu/ArmadaOS/design-system/ARMADAOS_ULTIMATE_LUXURY_DESIGN_SYSTEM_V3.md`
- `/home/ubuntu/ArmadaOS/batches/BATCH_UPDATE_LIVING_BORDER_BORDERLESS.md`
- `/home/ubuntu/ArmadaOS/vision/BRAND_COMPLIANCE_GUIDELINES.md`
- `/home/ubuntu/ArmadaOS/templates/BRAND_COMPLIANCE_CHECKLIST.md`

**Definition of Done:**
- `/home/ubuntu/ArmadaOS/specs/DEFINITION_OF_DONE.md` (Article 8: Pillar 14 - UX/UI Excellence)

**Roadmap:**
- `/home/ubuntu/ArmadaOS/ROADMAP.md` (Phase 5.5 - Design System Implementation)

**CMO Audit:**
- `/home/ubuntu/ArmadaOS/syncs/CMO_BRAND_COMPLIANCE_AUDIT_ATLAS2_DESKTOP.md`

**Atlas 2 Execution Directive:**
- `/home/ubuntu/ArmadaOS/directives/ATLAS2_DESIGN_SYSTEM_EXECUTION_DIRECTIVE.md`

---

## WINDOW COMPONENT SCOPE (MINIMAL FOR NOW)

Keep Window component **minimal** for BATCH-DESKTOP-01:

**Include:**
- ✅ Draggable (react-rnd)
- ✅ Title bar with app name
- ✅ Close button
- ✅ Frosted glass chrome (borderless in dark mode)

**Defer to BATCH-DESKTOP-02:**
- ❌ Minimize/maximize buttons
- ❌ Window state persistence
- ❌ Multi-window management
- ❌ Window snapping/tiling

**Why:** Focus on architectural structure now. Full window manager comes in next batch.

---

## GOD MODE STYLING

**God Mode keeps its own dark theme and layout.** The Window is just a container.

**Implementation:**
```tsx
<Window app="god-mode" defaultSize={{ width: '90vw', height: '90vh' }}>
  <GodModeLayout>
    {/* God Mode content unchanged */}
  </GodModeLayout>
</Window>
```

**User should see:**
- Shell background around edges
- Dock at bottom (always visible)
- God Mode window in center (near full-screen)
- God Mode's own dark theme inside window

---

## UNBLOCK CONDITION

**You are UNBLOCKED from BATCH-DESKTOP-02** once you complete:
1. All 10 acceptance criteria met
2. Self-verification report submitted
3. CMO visual approval (colors, logo, Living Border)
4. Shadow L3 re-verification (FULL PASS)

---

## QUESTIONS & SUPPORT

**If you encounter blockers:**
1. Check reference documents first (all specs are documented)
2. Escalate to COS immediately if specifications are unclear
3. Do NOT proceed with assumptions

**Common Questions:**

**Q: Do I need to implement full window management?**
A: No. Minimal window (draggable + close button) is sufficient for BATCH-DESKTOP-01.

**Q: Should God Mode styling change?**
A: No. God Mode keeps its own styling. Window is just a container.

**Q: What if I can't find the Tri-Prism logo?**
A: It's at `/home/ubuntu/ArmadaOS/design-system/triprism_final_v9.png`

**Q: Do I need to update all components to Living Border?**
A: Yes. All focusable elements must use Living Border (white border in dark mode).

---

## FINAL NOTE

**Your BATCH-DESKTOP-01 work is 99% complete and Gold Standard quality.** These changes are:
1. **Architectural clarification** (Chairman's decision on global Shell)
2. **Brand compliance** (correct design system specs from CMO/CPO)

This is NOT a quality issue. This is us giving you the complete requirements you should have had from the start.

**Once these changes are complete:**
- ✅ BATCH-DESKTOP-01 will receive Shadow L3 FULL PASS
- ✅ You'll be unblocked for BATCH-DESKTOP-02 (Window Manager)
- ✅ Future batches will have complete design system specs upfront

**100% to 100%. No shortcuts. Gold Standard only.**

---

**Proceed with Shell refactor and brand fixes.**

**Estimated completion: 12-13 hours from now.**

**Report back when complete for Shadow L3 re-verification.**

---

**COS v1.1 SIGNATURE:** `COS-ATLAS-2-UNIFIED-DIRECTIVE-20251231`

**STATUS:** UNBLOCKED - PROCEED WITH EXECUTION  
**PRIORITY:** IMMEDIATE  
**STANDARD:** 100% TO 100% - ENGINEERED PERFECTION
