# ATLAS 2: APPROVED BRANDING SYSTEM - VISUAL SPECIFICATION

**FROM:** CPO + Chairman  
**TO:** Atlas 2  
**DATE:** December 31, 2025  
**STATUS:** ✅ CHAIRMAN APPROVED - THIS IS THE LAW

---

## ⚠️ CRITICAL: READ THIS FIRST

**Chairman has been going in circles with you for an hour.**

**This document is the FINAL, DEFINITIVE, APPROVED branding system.**

**NO MORE ITERATIONS. NO MORE QUESTIONS. IMPLEMENT EXACTLY AS SPECIFIED.**

---

## THE 8 APPROVED COLORS (NOTHING ELSE EXISTS)

### DARK MODE (Primary Mode):

```css
/* Background Colors */
--bg-primary: #121214;    /* Tungsten - Main background */
--bg-secondary: #1C1C1F;  /* Charcoal - Cards, modals, elevated surfaces */

/* Text Colors */
--text-primary: #F5F5F7;  /* Platinum - Main text, icons */

/* Accent Colors */
--accent-primary: #8B5CF6; /* Violet - Buttons, links, active states (<5% usage) */
```

### LIGHT MODE (Secondary Mode):

```css
/* Background Colors */
--bg-primary: #FFFFFF;     /* Pure White - Main background */
--bg-secondary: #F5F5F7;   /* Silk - Cards, modals, elevated surfaces */

/* Text Colors */
--text-primary: #121214;   /* Tungsten - Main text, icons */

/* Accent Colors */
--accent-primary: #7C3AED; /* Darker Violet - Buttons, links, active states (<5% usage) */
```

---

## ❌ COLORS YOU MUST NOT USE

**These colors are FORBIDDEN:**

```css
/* FORBIDDEN - DO NOT USE */
#10B981  /* Green - NO SUCCESS GREEN */
#3B82F6  /* Blue - NO INFO BLUE */
#2DD4BF  /* Teal - NO TEAL */
#EF4444  /* Red - NO ERROR RED */
#F59E0B  /* Amber - NO WARNING AMBER */
#000000  /* Pure Black - Use #121214 instead */
#FFFFFF in dark mode text  /* Use #F5F5F7 instead */
```

**If you use ANY of these colors, you are violating the approved branding system.**

---

## CORRECT USAGE EXAMPLES

### ✅ DO THIS: Desktop Shell (Dark Mode)

```tsx
// Desktop background
<div style={{
  background: '#121214',  // Tungsten
  minHeight: '100vh'
}}>
  
  // Taskbar (frosted glass)
  <div style={{
    background: 'rgba(28, 28, 31, 0.8)',  // Charcoal with opacity
    backdropFilter: 'blur(12px)',
    borderTop: 'none',  // BORDERLESS
    color: '#F5F5F7'  // Platinum text
  }}>
    
    // Active app indicator (purple accent)
    <div style={{
      background: '#8B5CF6',  // Violet - ONLY for active state
      width: '4px',
      height: '100%'
    }} />
    
  </div>
  
  // Window (frosted glass, borderless)
  <div style={{
    background: 'rgba(28, 28, 31, 0.8)',  // Charcoal with opacity
    backdropFilter: 'blur(12px)',
    border: 'none',  // BORDERLESS - NO VISIBLE BORDERS
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',  // Shadow for depth
    color: '#F5F5F7'  // Platinum text
  }}>
    Window content here
  </div>
  
</div>
```

### ❌ DON'T DO THIS:

```tsx
// WRONG - Visible white borders
<div style={{
  border: '1px solid rgba(255, 255, 255, 0.1)'  // ❌ NO VISIBLE BORDERS
}}>

// WRONG - Using green for success
<button style={{
  background: '#10B981'  // ❌ NO GREEN
}}>Success</button>

// WRONG - Using pure white text in dark mode
<p style={{
  color: '#FFFFFF'  // ❌ Use #F5F5F7 (Platinum) instead
}}>Text</p>

// WRONG - Using pure black
<div style={{
  background: '#000000'  // ❌ Use #121214 (Tungsten) instead
}}>
```

---

## NOTIFICATION STATES (ALL USE PURPLE)

### ✅ DO THIS: Error Notification

```tsx
<div style={{
  background: 'rgba(28, 28, 31, 0.8)',  // Charcoal
  backdropFilter: 'blur(12px)',
  border: 'none',  // BORDERLESS
  boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)',  // Purple glow
  color: '#F5F5F7',  // Platinum text
  padding: '16px',
  borderRadius: '8px'
}}>
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <span style={{ fontSize: '20px' }}>⚠️</span>
    <p>We couldn't complete that action</p>
  </div>
</div>
```

### ✅ DO THIS: Warning Notification

```tsx
<div style={{
  background: 'rgba(28, 28, 31, 0.8)',
  backdropFilter: 'blur(12px)',
  border: 'none',
  boxShadow: '0 0 16px rgba(139, 92, 246, 0.28)',  // 70% intensity
  color: '#F5F5F7',
  padding: '16px',
  borderRadius: '8px'
}}>
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <span style={{ fontSize: '20px' }}>ℹ️</span>
    <p>Please review before continuing</p>
  </div>
</div>
```

### ✅ DO THIS: Success Notification

```tsx
<div style={{
  background: 'rgba(28, 28, 31, 0.8)',
  backdropFilter: 'blur(12px)',
  border: 'none',
  boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)',  // Full intensity
  color: '#F5F5F7',
  padding: '16px',
  borderRadius: '8px'
}}>
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <span style={{ fontSize: '20px' }}>✓</span>
    <p>Action completed</p>
  </div>
</div>
```

### ❌ DON'T DO THIS:

```tsx
// WRONG - Using red for errors
<div style={{
  background: '#EF4444'  // ❌ NO RED
}}>Error</div>

// WRONG - Using green for success
<div style={{
  background: '#10B981'  // ❌ NO GREEN
}}>Success</div>

// WRONG - Using amber for warnings
<div style={{
  background: '#F59E0B'  // ❌ NO AMBER
}}>Warning</div>
```

---

## FROSTED GLASS MATERIAL (BORDERLESS)

### ✅ DO THIS: Correct Frosted Glass

```css
.frosted-glass {
  background: rgba(28, 28, 31, 0.8);  /* Charcoal with 80% opacity */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: none;  /* BORDERLESS - NO VISIBLE BORDERS */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);  /* Shadow for depth */
}
```

### ❌ DON'T DO THIS:

```css
.frosted-glass-wrong {
  background: rgba(28, 28, 31, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);  /* ❌ NO VISIBLE BORDERS */
}
```

**RULE:** Frosted glass is BORDERLESS. Depth comes from shadows, not borders.

---

## PURPLE USAGE RULE (<5%)

**Purple should appear on <5% of the screen.**

### ✅ CORRECT Purple Usage:
- Active tab indicator (thin 4px line)
- Primary CTA button (one per screen)
- Focus ring (Living Border)
- Notification glow
- Active menu item highlight

### ❌ INCORRECT Purple Usage:
- Large background areas
- Multiple buttons on same screen
- Decorative elements
- Headers/footers
- Sidebars

**If more than 5% of your screen is purple, you're doing it wrong.**

---

## LIVING BORDER (Focus Indicator)

### ✅ DO THIS: Living Border on Focus

```css
*:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.8);  /* White border "comes alive" */
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);  /* Subtle glow */
  transition: all 150ms ease-out;
}
```

### ❌ DON'T DO THIS:

```css
*:focus {
  outline: 2px solid #8B5CF6;  /* ❌ NO PURPLE FOCUS RING */
}
```

**RULE:** Focus indicator is white (Living Border), NOT purple.

---

## TYPOGRAPHY

### ✅ DO THIS: Correct Typography

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #F5F5F7;  /* Platinum text in dark mode */
  background: #121214;  /* Tungsten background */
}

h1 {
  font-size: 32px;
  font-weight: 600;
  color: #F5F5F7;  /* Platinum */
}

p {
  font-size: 14px;
  font-weight: 400;
  color: #F5F5F7;  /* Platinum */
  line-height: 1.6;
}
```

### ❌ DON'T DO THIS:

```css
body {
  color: #FFFFFF;  /* ❌ Use #F5F5F7 (Platinum) instead */
}
```

---

## SPACING (8px Grid)

**ALL spacing must be multiples of 8px:**

```css
/* ✅ CORRECT */
padding: 8px;   /* 1 unit */
padding: 16px;  /* 2 units */
padding: 24px;  /* 3 units */
padding: 32px;  /* 4 units */
margin: 40px;   /* 5 units */
gap: 48px;      /* 6 units */

/* ❌ WRONG */
padding: 10px;  /* Not a multiple of 8 */
margin: 15px;   /* Not a multiple of 8 */
```

---

## SHADOWS (4 Levels)

```css
/* Level 1: Subtle (cards, inputs) */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Level 2: Medium (dropdowns, tooltips) */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

/* Level 3: Elevated (modals, popovers) */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

/* Level 4: Dramatic (dialogs, overlays) */
box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4);
```

---

## VERIFICATION CHECKLIST

Before you submit your work, verify:

- [ ] **Only 8 colors used** (4 dark, 4 light)
- [ ] **No green, blue, red, amber, or teal**
- [ ] **Frosted glass is borderless** (no visible borders)
- [ ] **Purple usage <5%** (measure it)
- [ ] **Text is #F5F5F7** (Platinum), NOT #FFFFFF
- [ ] **Background is #121214** (Tungsten), NOT #000000
- [ ] **Focus indicator is white** (Living Border), NOT purple
- [ ] **Spacing is 8px multiples**
- [ ] **Notifications use purple glow** (not red/amber/green)
- [ ] **Shadows provide depth** (not borders)

---

## WHAT CHAIRMAN EXPECTS TO SEE

**Desktop Shell:**
- Dark background (#121214)
- Frosted glass taskbar (borderless)
- Frosted glass windows (borderless)
- Purple accent on active app ONLY (<5%)
- White text (#F5F5F7)
- No visible borders anywhere

**The Store:**
- Dark background (#121214)
- Frosted glass cards (borderless)
- Purple "Install" button (one per card)
- White text (#F5F5F7)
- No green/blue/red colors

**Notifications:**
- Purple glow (not red/amber/green)
- Icon + elegant copy
- Frosted glass (borderless)

---

## IF YOU'RE STILL CONFUSED

**Ask yourself:**
1. Am I using ONLY the 8 approved colors?
2. Are my frosted glass elements borderless?
3. Is purple usage <5% of the screen?
4. Am I using #F5F5F7 for text (not #FFFFFF)?
5. Am I using #121214 for background (not #000000)?

**If the answer to ANY of these is "no", you're doing it wrong.**

---

## THE BOTTOM LINE

**This is not a suggestion. This is not a guideline. This is the LAW.**

**Chairman approved this. CMO approved this. CPO approved this.**

**Implement it EXACTLY as specified. No deviations. No interpretations. No creativity.**

**The luxury is in the restraint. The restraint is in the 4-color system.**

---

**Source of Truth:** `design-system/ARMADAOS_ULTIMATE_LUXURY_DESIGN_SYSTEM_V3.md`  
**Approved By:** Chairman (December 31, 2025)  
**Status:** ✅ FINAL - NO MORE CHANGES

**Now build it.**
