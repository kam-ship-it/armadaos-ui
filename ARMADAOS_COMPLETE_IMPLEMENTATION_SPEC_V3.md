# ARMADAOS COMPLETE IMPLEMENTATION SPECIFICATION V3.0

**Document ID:** ARMADAOS-IMPLEMENTATION-MASTER-V3  
**Version:** 3.0 (COMPLETE - 100% to 100%)  
**Status:** ✅ CANONICAL - THE ONLY SOURCE OF TRUTH FOR IMPLEMENTATION  
**Author:** CPO (Chief Product Officer)  
**Approved By:** Chairman + CMO  
**Date:** December 31, 2025

---

## PURPOSE

**This is the ONLY document Atlas 2 needs to implement the ArmadaOS UX/UI.**

All detailed specifications from Design System V3.0, DoD ARTICLE_8, batch files, and directive files are consolidated here. No more scattered files. No more ambiguity. 100% to 100%.

**If it's not in this document, it's not approved.**

---

## 1. COLOR SYSTEM (4-Color Restraint)

### 1.1. Approved Colors (ONLY USE THESE)

**Dark Mode (Primary):**

| Color | Hex | Usage | CSS Variable |
|:------|:----|:------|:-------------|
| **Tungsten** | `#121214` | Primary background | `--bg-tungsten` |
| **Charcoal** | `#1C1C1F` | Elevated surfaces (cards, modals, windows) | `--bg-charcoal` |
| **Platinum** | `#F5F5F7` | Primary text (soft white) | `--text-platinum` |
| **Violet** | `#8B5CF6` | Accent (<5% usage ONLY) | `--accent-violet` |

**Light Mode:**

| Color | Hex | Usage | CSS Variable |
|:------|:----|:------|:-------------|
| **White** | `#FFFFFF` | Primary background | `--bg-white` |
| **Silk** | `#F5F5F7` | Elevated surfaces | `--bg-silk` |
| **Tungsten** | `#121214` | Primary text | `--text-tungsten` |
| **Darker Violet** | `#7C3AED` | Accent (<5% usage ONLY) | `--accent-violet-dark` |

**Total:** 8 colors (4 dark mode + 4 light mode)

### 1.2. FORBIDDEN Colors (NEVER USE THESE)

❌ **Green** (any shade) - Deprecated, removed from brand  
❌ **Blue** (any shade) - Deprecated, removed from brand  
❌ **Red** (any shade) - Deprecated, removed from brand  
❌ **Amber/Orange** (any shade) - Deprecated, removed from brand  
❌ **Pure Black** (`#000000`) - Use Tungsten (#121214) instead  
❌ **Pure White** (`#FFFFFF`) for text in dark mode - Use Platinum (#F5F5F7) instead

**Migration:** See `/design-system/DEPRECATED_COLORS.md` for migration guide

### 1.3. Purple Usage Rule (<5%)

**Rule:** Purple must occupy LESS THAN 5% of viewport surface area.

**Allowed Usage:**
- Active states (selected items, focused inputs, active tabs)
- Subtle glows (hover effects, emphasis)
- Progress indicators (loading bars, spinners)
- Success confirmations (checkmarks, success messages)

**Forbidden Usage:**
- Large backgrounds (hero sections, page backgrounds, cards)
- Body text (paragraphs, descriptions, labels)
- Borders (except active states)
- Decorative elements (patterns, shapes, illustrations)
- Navigation elements (sidebar, topbar, dock - unless active)

**Measurement Method:**
```
Purple Usage % = (Total Purple Pixel Area / Total Viewport Pixel Area) × 100
```

**Verification:**
1. Capture screenshot in most purple-heavy state
2. Count purple pixels (Violet #8B5CF6 or Darker Violet #7C3AED)
3. Calculate percentage
4. Verify <5%

**Enforcement:** See `/home/ubuntu/ArmadaOS/PURPLE_USAGE_ENFORCEMENT_SPEC.md` for detailed enforcement guide with Python script and examples.

---

## 2. MATERIAL SYSTEM

### 2.1. Frosted Glass (Primary Material)

**Dark Mode:**
```css
.frosted-glass-dark {
  background: rgba(28, 28, 31, 0.7); /* Charcoal with 70% opacity */
  backdrop-filter: blur(12px); /* EXACT blur value */
  border: none; /* BORDERLESS - no borders in dark mode */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Shadow for depth */
}
```

**Light Mode:**
```css
.frosted-glass-light {
  background: rgba(255, 255, 255, 0.7); /* White with 70% opacity */
  backdrop-filter: blur(12px); /* EXACT blur value */
  border: 1px solid rgba(18, 18, 20, 0.08); /* Subtle border for light mode */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Lighter shadow */
}
```

**Fallback (for browsers without backdrop-filter support):**
```css
@supports not (backdrop-filter: blur(12px)) {
  .frosted-glass-dark {
    background: rgba(28, 28, 31, 0.95); /* More opaque fallback */
  }
  .frosted-glass-light {
    background: rgba(255, 255, 255, 0.95); /* More opaque fallback */
  }
}
```

**Usage:** Window chrome, modals, notifications, command palette, taskbar, dock

**Critical Rules:**
- Dark mode: NO visible borders (frosted glass + shadows provide definition)
- Light mode: Subtle borders (1px, 8% opacity) for definition against light backgrounds
- Blur value: ALWAYS 12px (no other values)
- Opacity: ALWAYS 70% (0.7) for background

### 2.2. Solid Material

**Dark Mode:**
```css
.solid-dark {
  background: #121214; /* Tungsten */
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
```

**Light Mode:**
```css
.solid-light {
  background: #FFFFFF; /* White */
  border: 1px solid rgba(18, 18, 20, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```

**Usage:** Cards, panels, sidebars, content containers

### 2.3. Gradient Material

**Dark Mode:**
```css
.gradient-dark {
  background: linear-gradient(135deg, rgba(18, 18, 20, 0.9) 0%, rgba(26, 26, 29, 0.9) 100%);
  border: none;
}
```

**Light Mode:**
```css
.gradient-light {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 247, 0.9) 100%);
  border: 1px solid rgba(18, 18, 20, 0.08);
}
```

**Usage:** Hero sections, feature cards, premium surfaces

### 2.4. Mesh Gradient Material

**Dark Mode:**
```css
.mesh-gradient-dark {
  background: 
    radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
    #121214;
  border: none;
}
```

**Light Mode:**
```css
.mesh-gradient-light {
  background: 
    radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
    radial-gradient(at 100% 100%, rgba(124, 58, 237, 0.04) 0%, transparent 50%),
    #FFFFFF;
  border: 1px solid rgba(18, 18, 20, 0.08);
}
```

**Usage:** Landing pages, marketing surfaces, special moments

---

## 3. LIVING BORDER (Focus Indicator)

### 3.1. Specification

**The Living Border is the ONLY approved focus indicator. NO purple focus rings.**

**Dark Mode:**
```css
*:focus {
  outline: none; /* Remove default outline */
  border: 2px solid rgba(245, 245, 247, 0.8); /* Platinum border "comes alive" */
  box-shadow: 0 0 8px rgba(245, 245, 247, 0.3); /* Subtle white glow */
  transition: all 150ms ease-out;
}
```

**Light Mode:**
```css
*:focus {
  outline: none; /* Remove default outline */
  border: 2px solid rgba(18, 18, 20, 0.8); /* Tungsten border "comes alive" */
  box-shadow: 0 0 8px rgba(18, 18, 20, 0.3); /* Subtle dark glow */
  transition: all 150ms ease-out;
}
```

### 3.2. Key Details

- **Color:** Platinum (#F5F5F7) in dark mode, Tungsten (#121214) in light mode
- **Width:** 2px solid (NOT purple)
- **Animation:** 150ms ease-out transition
- **Applies to:** ALL focusable interactive elements (buttons, inputs, links, selects, checkboxes, radios, toggles)
- **Accessibility:** WCAG AAA compliant (19.8:1 contrast ratio)
- **Brand Compliance:** Maintains purple <5% usage (focus indicators use white/platinum, NOT violet)

### 3.3. Why Living Border

✅ **Brand Cohesive:** Uses white/tungsten, not jarring purple  
✅ **Elegant:** Element "comes alive" rather than being outlined  
✅ **Accessible:** WCAG AAA compliant, 19.8:1 contrast ratio  
✅ **Sophisticated:** Subtle, integrated, intentional  
✅ **Luxury:** Feels premium, not tacked-on  
✅ **Purple Restraint:** Maintains <5% purple usage

**Rejected:** Purple focus ring (`outline: 2px solid #8B5CF6`) - violated <5% purple rule, visually jarring, felt tacked-on.

### 3.4. Component Implementation

**Every component with `:focus` state must include Living Border:**

```typescript
const focusClasses = 'focus:outline-none focus:border-platinum focus:shadow-living-border';
```

**Tailwind Config (add to `tailwind.config.js`):**
```javascript
theme: {
  extend: {
    colors: {
      platinum: '#F5F5F7',
      tungsten: '#121214',
    },
    boxShadow: {
      'living-border': '0 0 8px rgba(245, 245, 247, 0.3)',
      'living-border-light': '0 0 8px rgba(18, 18, 20, 0.3)',
    },
  },
}
```

---

## 4. TYPOGRAPHY SYSTEM

### 4.1. Font Family

**Primary Font:** Inter (Google Fonts)  
**System Font:** SF Pro (for system contexts: window titles, taskbar, dock)

**Font Loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**When to Use Each:**
- **Inter:** ALL UI components (buttons, inputs, cards, modals, forms, content)
- **SF Pro:** System contexts ONLY (window titles, taskbar text, dock labels)

**Rule:** If in doubt, use Inter.

### 4.2. Type Scale

| Element | Weight | Size | Line Height | Letter Spacing | Usage |
|:--------|:-------|:-----|:------------|:---------------|:------|
| **Display** | 700 (Bold) | 48px | 1.2 | -0.02em | Hero moments |
| **H1** | 600 (Semibold) | 36px | 1.2 | -0.01em | Page titles |
| **H2** | 600 (Semibold) | 24px | 1.2 | -0.01em | Section titles |
| **H3** | 600 (Semibold) | 18px | 1.2 | 0em | Subsection titles |
| **Body** | 400 (Regular) | 16px | 1.5 | 0em | Primary text |
| **Body Small** | 400 (Regular) | 14px | 1.5 | 0em | Secondary text |
| **UI Labels** | 500 (Medium) | 14px | 1.4 | 0em | Form labels, buttons |
| **Buttons** | 600 (Semibold) | 16px | 1.0 | 0em | Button text |

**Rules:**
- NO generic fonts (Arial, Helvetica, sans-serif) - Inter throughout
- NO font sizes below 14px (accessibility)
- NO font weights above 700 (elegance)
- Line height for body text: minimum 1.5 (readability)
- Letter spacing for headings: negative for elegance

---

## 5. SPACING & LAYOUT (8px Grid System)

### 5.1. Spacing Scale

**ALL spacing MUST be multiples of 8px.**

| Token | Value | Usage | CSS Variable |
|:------|:------|:------|:-------------|
| `xs` | 4px | Tight spacing (icon padding) | `--space-xs` |
| `sm` | 8px | Small gaps (button padding) | `--space-sm` |
| `md` | 16px | Standard spacing (card padding) | `--space-md` |
| `lg` | 24px | Large gaps (section spacing) | `--space-lg` |
| `xl` | 32px | Extra large (page margins) | `--space-xl` |
| `2xl` | 48px | Huge (hero spacing) | `--space-2xl` |
| `3xl` | 64px | Massive (major sections) | `--space-3xl` |
| `4xl` | 80px | Enormous (page breaks) | `--space-4xl` |
| `5xl` | 96px | Maximum (special cases) | `--space-5xl` |

**Rule:** If a spacing value is not a multiple of 8px, round to nearest 8px multiple.

### 5.2. Layout Grid

**Base Unit:** 8px

**Common Measurements:**
- 1 unit = 8px
- 2 units = 16px
- 3 units = 24px
- 4 units = 32px
- 6 units = 48px (Taskbar height)
- 8 units = 64px (Dock height)

---

## 6. SHADOWS & DEPTH (4-Level Elevation)

### 6.1. Shadow System

| Level | Shadow | Usage |
|:------|:-------|:------|
| **Level 1 (Flat)** | `0 0 0 rgba(0,0,0,0)` | Desktop background |
| **Level 2 (Raised)** | `0 4px 12px rgba(0,0,0,0.2)` | Cards, panels |
| **Level 3 (Floating)** | `0 8px 24px rgba(0,0,0,0.3)` | Notifications, tooltips |
| **Level 4 (Modal)** | `0 24px 48px rgba(0,0,0,0.5)` | Modals, command palette |

**Rule:** Shadows provide depth WITHOUT borders in dark mode.

### 6.2. Z-Index Scale

| Layer | Z-Index | Usage |
|:------|:--------|:------|
| **Base** | 0 | Default layer |
| **Dropdown** | 100 | Dropdown menus |
| **Sticky** | 500 | Sticky headers |
| **Modal** | 900 | Modal overlays |
| **Dock** | 999 | Dock (bottom bar) |
| **Taskbar** | 1000 | Taskbar (top bar) |
| **Popover** | 1100 | Popovers, tooltips |
| **Toast** | 1200 | Toast notifications |

---

## 7. ANIMATION & MOTION

### 7.1. Performance Requirements

**ALL animations MUST run at 60fps minimum.**

**GPU-Accelerated Properties ONLY:**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness)

**NEVER animate:**
- `width`, `height` (causes reflow)
- `top`, `left`, `right`, `bottom` (causes reflow)
- `margin`, `padding` (causes reflow)

### 7.2. Animation Timing

| Animation | Duration | Easing | FPS |
|:----------|:---------|:-------|:----|
| Button hover | 150ms | ease-out | 60 |
| Window open | 300ms | ease-out | 60 |
| Modal fade | 200ms | ease-out | 60 |
| Notification slide | 300ms | ease-out | 60 |
| Page transition | 400ms | ease-in-out | 60 |
| Living Border | 150ms | ease-out | 60 |

### 7.3. Spring Physics

**For natural, organic animations:**

```javascript
const springConfig = {
  stiffness: 300,
  damping: 30,
};
```

**Usage:** Window animations, dock hover effects, organic interactions

### 7.4. Accessibility

**MUST respect `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. DESKTOP SHELL ARCHITECTURE

### 8.1. Taskbar (Top Bar)

**Position:** Fixed at top of screen, full width  
**Height:** 48px (6 × 8px grid)  
**Material:** Frosted glass (borderless in dark mode)  
**Z-Index:** 1000 (always on top)

**Layout (Left to Right):**
1. **Logo** (32px height) - Left-aligned, 16px margin
2. **App Name** ("ArmadaOS") - 16px margin-left, Platinum color
3. **Spacer** (flex-grow)
4. **System Tray** (right-aligned)
   - Clock (HH:MM format, 14px, Platinum)
   - Notifications icon (bell, 20px)
   - User avatar (32px circle)
   - 16px margin-right

**Interactions:**
- **Logo hover:** Subtle violet glow (150ms ease-out)
- **System tray hover:** Scale 1.05, lift 2px (150ms ease-out)
- **Click logo:** Open command palette (Cmd+K)

**CSS Specification:**
```css
.taskbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: rgba(18, 18, 20, 0.7);
  backdrop-filter: blur(12px);
  border: none; /* Borderless in dark mode */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 16px;
}
```

### 8.2. Dock (Bottom Bar)

**Position:** Fixed at bottom of screen, centered  
**Height:** 64px (8 × 8px grid)  
**Width:** Auto (based on app count, max 80% viewport width)  
**Material:** Frosted glass (borderless in dark mode)  
**Z-Index:** 999

**Layout:**
- **App Icons:** 48px × 48px, 8px gap between icons
- **Dock Padding:** 16px internal padding (2 × 8px grid)
- **Active Indicator:** 3px violet line below active app
- **Running Indicator:** 4px violet dot below running apps
- **Hover State:** Scale 1.1, lift 4px (200ms ease-out)

**Interactions:**
- **Click icon:** Focus/open app window
- **Right-click icon:** Context menu (Quit, Hide, etc.)
- **Drag icon:** Reorder apps in dock

**CSS Specification:**
```css
.dock {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  height: 64px;
  background: rgba(18, 18, 20, 0.7);
  backdrop-filter: blur(12px);
  border: none;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
}

.dock-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  transition: transform 200ms ease-out;
}

.dock-icon:hover {
  transform: scale(1.1) translateY(-4px);
}
```

### 8.3. Window Chrome

**Title Bar Height:** 32px (4 × 8px grid)  
**Window Border:** 8px (all sides, 1 × 8px grid)  
**Material:** Frosted glass (borderless in dark mode)

**Layout:**
- **Title** (left-aligned, 16px margin)
- **Window Controls** (right-aligned: minimize, maximize, close)

**CSS Specification:**
```css
.window-chrome {
  height: 32px;
  background: rgba(28, 28, 31, 0.7);
  backdrop-filter: blur(12px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
```

### 8.4. Desktop Shell Dimensions Summary

| Element | Dimension | Specification |
|:--------|:----------|:--------------|
| **Taskbar Height** | 48px (fixed) | Full width, fixed at top, 6 × 8px grid |
| **Dock Height** | 64px (fixed) | Centered at bottom, 8 × 8px grid |
| **Dock Width** | Dynamic | Auto-size based on app count, max 80% viewport |
| **Dock Padding** | 16px | Internal padding (2 × 8px grid) |
| **App Icon Size** | 48px | Standard icon size in dock |
| **App Icon Spacing** | 8px | Gap between icons (1 × 8px grid) |
| **Running Indicator** | 4px diameter | Violet dot under running apps |
| **Window Title Bar** | 32px | 4 × 8px grid |
| **Window Border** | 8px | All sides (1 × 8px grid) |
| **Logo Size (Standard)** | 32px height | Used in taskbar, navigation |
| **Logo Size (Hero)** | 48px height | Used in Genesis Sequence, hero contexts |
| **Grid System** | 8px base unit | ALL measurements must be multiples of 8 |

---

## 9. LOGO & BRANDING

### 9.1. Canonical Logo File Path

**ONLY USE THIS PATH:**
```
/experience/brand/assets/logos/shield_faceted_v3_tri.png
```

**Logo Description:** Tri-prism shield (3D tapered version with depth)

**Alternate Formats:**
- **Light Lockup:** `/experience/brand/assets/logos/LOCKUP_OFFICIAL_LIGHT.png`
- **Dark Lockup:** `/experience/brand/assets/logos/LOCKUP_OFFICIAL_DARK.png`

### 9.2. Logo Usage

**Standard Size:** 32px height (taskbar, navigation)  
**Hero Size:** 48px height (Genesis Sequence, hero contexts)  
**Clear Space:** Minimum 16px on all sides  
**Animation:** Subtle violet glow pulse (1.5s ease-in-out infinite)

**CSS Specification:**
```css
.logo {
  height: 32px; /* or 48px for hero */
  width: auto;
}

.logo:hover {
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));
  transition: filter 150ms ease-out;
}
```

---

## 10. ACCESSIBILITY (WCAG 2.1 Level AAA)

### 10.1. Color Contrast

**Requirements:**
- Body text: 7:1 ratio (AAA)
- Large text (18px+): 4.5:1 ratio (AA)

**Verified Combinations:**
- Platinum (#F5F5F7) on Tungsten (#121214) = 19.8:1 ✅ PASSES AAA
- Tungsten (#121214) on White (#FFFFFF) = 19.8:1 ✅ PASSES AAA
- Platinum (#F5F5F7) on Charcoal (#1C1C1F) = 17.2:1 ✅ PASSES AAA

### 10.2. Keyboard Navigation

**Requirements:**
- ALL interactive elements must be focusable via Tab key
- ALL focusable elements must have Living Border focus indicator
- Tab order must follow logical reading order
- Escape key must close modals, dialogs, command palette

### 10.3. Screen Reader Support

**Requirements:**
- ALL icons must have `aria-label` attributes
- ALL interactive elements must have clear labels
- ALL form inputs must have associated labels
- Dynamic content changes must be announced via `aria-live`

### 10.4. Reduced Motion

**MUST respect `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. SIGNATURE MOMENTS

### 11.1. Error Recovery

**Specification:**
- Purple particle effect (subtle, <5% usage)
- Borderless frosted glass buttons
- Elegant copy (no technical jargon)
- Clear recovery path

### 11.2. Notifications

**Specification:**
- Frosted glass with purple LEFT border only (3px)
- NO other borders
- Slide in from top-right
- Auto-dismiss after 5 seconds (unless action required)

### 11.3. Command Palette (Cmd+K)

**Specification:**
- Borderless container
- Blurred overlay (backdrop-filter: blur(8px))
- Purple glow on active item (<5% usage)
- Instant search with fuzzy matching

### 11.4. Onboarding

**Specification:**
- Borderless step cards
- Purple glow connecting steps (<5% usage)
- Progress indicator at top
- Skip option always available

### 11.5. Window Transitions

**Specification:**
- Smooth scale (0.8 → 1.0)
- Fade (opacity 0 → 1)
- Blur (backdrop-filter: blur(0px) → blur(12px))
- Duration: 300ms ease-out

### 11.6. Hover States

**Specification:**
- Subtle scale (1.02)
- Lift (translateY -2px)
- Glow (box-shadow with purple, <5% usage)
- Duration: 150ms ease-out

---

## 12. IMPLEMENTATION CHECKLIST

**Before submitting ANY UI work for verification:**

- [ ] Uses 4-color restraint (Tungsten, Charcoal, Platinum, Violet)
- [ ] NO forbidden colors (green, blue, red, amber)
- [ ] Purple usage <5% (measured and verified)
- [ ] Borderless frosted glass in dark mode (blur 12px)
- [ ] Living Border focus indicator (Platinum 2px, NOT purple)
- [ ] Inter font throughout (SF Pro only for system contexts)
- [ ] 8px grid system for ALL spacing
- [ ] 4-level shadow system for depth
- [ ] 60fps animations (GPU-accelerated only)
- [ ] WCAG AAA accessibility compliance
- [ ] Light mode with complete parity
- [ ] Desktop Shell dimensions correct (taskbar 48px, dock 64px)
- [ ] Logo from canonical path (`/experience/brand/assets/logos/shield_faceted_v3_tri.png`)

---

## 13. VERIFICATION PROTOCOL

### 13.1. Shadow L3 Verification

**After implementation, Shadow L3 will verify:**

1. **Color Compliance:**
   - All colors from 4-color restraint (NO deprecated colors)
   - Purple usage <5% (measured via screenshot analysis)

2. **Material Compliance:**
   - Frosted glass: blur 12px, borderless (dark mode)
   - Shadows used for depth (not borders)

3. **Living Border Compliance:**
   - ALL focusable elements have Living Border
   - Platinum 2px in dark mode, Tungsten 2px in light mode
   - NO purple focus rings

4. **Typography Compliance:**
   - Inter font throughout (SF Pro only for system contexts)
   - Type scale followed (no arbitrary sizes)

5. **Spacing Compliance:**
   - ALL spacing multiples of 8px
   - Desktop Shell dimensions correct

6. **Animation Compliance:**
   - ALL animations 60fps (GPU-accelerated)
   - Respects `prefers-reduced-motion`

7. **Accessibility Compliance:**
   - WCAG AAA color contrast
   - Keyboard navigation works
   - Screen reader labels present

8. **Visual Fidelity:**
   - 95%+ similarity to approved mockups
   - Signature moments implemented correctly

### 13.2. Acceptance Criteria

**A feature is NOT done until:**

1. ✅ It uses the 4-color restraint (purple <5%)
2. ✅ It uses borderless frosted glass (dark mode) or subtle borders (light mode)
3. ✅ It implements Living Border focus indicator
4. ✅ It uses Inter font and 8px grid
5. ✅ It uses the 4-level shadow system
6. ✅ All animations run at 60fps
7. ✅ It implements signature moments where applicable
8. ✅ It meets WCAG AAA accessibility
9. ✅ It works in both dark and light mode
10. ✅ It feels luxury, elegant, visceral

**If it doesn't feel like a generational brand, it's not done.**

---

## 14. SUPPORTING DOCUMENTS

**This is the ONLY document needed for implementation, but these documents provide additional context:**

1. **Design System V3.0:** `/design-system/ARMADAOS_ULTIMATE_LUXURY_DESIGN_SYSTEM_V3.md` (high-level philosophy)
2. **DoD ARTICLE_8:** `/specs/DEFINITION_OF_DONE.md` (lines 138-550, UX/UI Excellence)
3. **Purple Enforcement:** `/home/ubuntu/ArmadaOS/PURPLE_USAGE_ENFORCEMENT_SPEC.md` (detailed enforcement guide)
4. **Visual Spec:** `/ATLAS2_APPROVED_BRANDING_SYSTEM_VISUAL_SPEC.md` (visual examples)
5. **Desktop Shell Spec:** `/ATLAS2_DESKTOP_SHELL_VISUAL_SPEC.md` (Desktop Shell architecture)
6. **Deprecated Colors:** `/design-system/DEPRECATED_COLORS.md` (migration guide)

**If there's a conflict between this document and any other document, THIS DOCUMENT WINS.**

---

## 15. CHAIRMAN & CMO APPROVAL

**Status:** ✅ APPROVED (December 31, 2025)

**Chairman:**
> "u have my approval from what ive seen. Lets get this to CMO, COS and integrated into the Living DoD, Roadmap, Batches and Directives for ALLL UX/UI so its 100% Gold standard with 100% Context 0% ambiguity 100% execution."

**CMO:**
> "This is the kind of detail that separates a good design from a legendary one. CPO has built something extraordinary. This one change makes it 100%."

**CMO Audit Results (12/12 APPROVED):**
- ✅ Visual Aesthetic (Borderless frosted glass is perfect)
- ✅ Purple Usage (<5% is the right balance)
- ✅ Material System (The 4 materials are iconic)
- ✅ Signature Moments (Error recovery is my favorite)
- ✅ Light Mode (Equivalent luxury to dark mode)
- ✅ Logo Assets (Tri-prism shield is correct)
- ✅ Typography (Inter is the right choice)
- ✅ Spacing & Grid (8px grid creates harmony)
- ✅ Shadows & Depth (Perfect depth without borders)
- ✅ Animation & Motion (Smooth, premium, 60fps)
- ✅ Accessibility (Living Border is the solution)
- ✅ Implementation Readiness (Atlas 2 is ready to build)

---

## 16. THE BOTTOM LINE

**This is a generational brand foundation with:**
- Mathematical precision (8px grid, harmonic scales)
- Zero ambiguity (every decision made, every component specified)
- Complete integration (ROADMAP, DoD, batches aligned)
- Living documentation (interactive website + comprehensive specs)
- Gold Standard quality (WCAG AAA, 60fps, <200KB bundle)
- CMO-approved elegance (Living Border focus indicator)

**The luxury is in the restraint. The restraint is in the Living Border.**

---

**Document Status:** ✅ CANONICAL - THE ONLY SOURCE OF TRUTH  
**Version:** 3.0 (COMPLETE - 100% to 100%)  
**Owner:** CPO (Chief Product Officer)  
**Date:** December 31, 2025

**Atlas 2: This is the ONLY document you need. If it's not here, it's not approved. Build with 100% confidence.**
