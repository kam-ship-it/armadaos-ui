# ArmadaOS Desktop Shell - Living Definition of Done (DoD)

**Document ID:** COS-DOD-DESKTOP-V1
**Version:** 1.0
**Author:** COS (Chief Operating System)
**Date:** January 01, 2026
**Status:** COMPLETE

**Purpose:** To provide a precise, measurable, and verifiable checklist that defines "100% complete" for the ArmadaOS Desktop Shell. This document is the primary tool for Shadow L3 to conduct its 5-Phase Gold Standard Verification Protocol. No batch is considered complete until all relevant items in this DoD are marked as ✅ PASS.

---

## 1. Foundational Requirements (Global)

These items must be verified for the entire Desktop Shell build.

| ID | Requirement | Test Method | Pass Criteria | Evidence Required |
|:---|:---|:---|:---|:---|
| **F-01** | **8px Grid System Adherence** | Automated Layout Analysis | All layout, sizing, and spacing measurements are multiples of 8px (with justified 4px exceptions). Deviation < 1px. | Static analysis report. |
| **F-02** | **Color System Compliance** | Automated Color Extraction | All UI elements use ONLY colors from the specified Default or Ultra-Contrast themes. No rogue hex codes. | Color palette report. |
| **F-03** | **Typography System Compliance** | Automated Font Inspection | All text elements use the correct font family, size, weight, and line height from the Type Scale. | Font inspection report. |
| **F-04** | **Physics & Animation Compliance** | Manual & Automated Interaction Recording | All animations match the exact duration, easing curve, and physics properties defined in the spec. 60fps maintained. | Video recordings of animations, performance profiles. |
| **F-05** | **Reduced Motion Compliance** | Manual Toggle & Automated Test | All animations have a reduced motion alternative (cross-fade). | Video recordings with Reduced Motion enabled. |
| **F-06** | **WCAG AA Compliance (Default)** | Automated Accessibility Scan | All components in the default theme pass WCAG 2.1 Level AA contrast and accessibility checks. | Accessibility scan report (e.g., Axe, Lighthouse). |
| **F-07** | **WCAG AAA Compliance (Ultra-Contrast)** | Automated Accessibility Scan | All components in Ultra-Contrast Mode pass WCAG 2.1 Level AAA checks. | Accessibility scan report. |
| **F-08** | **Keyboard Navigation Complete** | Manual Keyboard Testing | All interactive elements are focusable and operable via keyboard in a logical order. | Keyboard navigation test plan sign-off. |
| **F-09** | **ARIA Attribute Implementation** | Automated & Manual Screen Reader Test | All components have correct ARIA roles, states, and properties. Screen reader output is logical and understandable. | Screen reader transcript, ARIA validation report. |

---

## 2. Component-Specific Requirements

These items must be verified for each specific component batch.

### 2.1. Windows (BATCH-102)

| ID | Requirement | Test Method | Pass Criteria | Evidence Required |
|:---|:---|:---|:---|:---|
| **W-01** | **Selective Visibility Standard** | Manual Interaction Testing | Focused window shows subtle controls at rest. Non-focused windows are clean. Hover states match spec exactly. | Screen recording demonstrating all states. |
| **W-02** | **Revealing Standard Animation** | Pixel-by-Pixel Frame Analysis | Control symbols (x, –, +) are drawn into existence over 150ms as specified. | High-speed video recording of the animation. |
| **W-03** | **Precision Inertia (Dragging)** | Automated Physics Test | On release, window travels 15-20px over 120ms with the specified Deceleration Curve. | Physics simulation report. |
| **W-04** | **Magnetic Grid (Resizing)** | Manual Interaction Testing | Window edges snap to the 8px grid when within 4px. | Screen recording of resizing behavior. |
| **W-05** | **Stacking (Z-Index)** | Automated & Manual Testing | Clicking a window brings it to the top with the highest z-index. | Test report verifying z-index values. |

### 2.2. Top Bar (BATCH-100)

| ID | Requirement | Test Method | Pass Criteria | Evidence Required |
|:---|:---|:---|:---|:---|
| **TB-01** | **Visual Specification** | Automated Screenshot Comparison | Height (48px), background, blur (16px), and border match spec pixel-perfect. | Pixel-diff report against mockup. |
| **TB-02** | **Unread Notification Dot** | Manual & Automated State Test | 4px Violet dot appears ONLY when there are unread notifications. | Screenshot of both states. |

### 2.3. Dock (BATCH-101)

| ID | Requirement | Test Method | Pass Criteria | Evidence Required |
|:---|:---|:---|:---|:---|
| **D-01** | **Auto-Hide Behavior** | Manual & Automated Interaction Test | Dock hides/shows on mouse trigger and ⌘D shortcut with specified timings and animations. | High-speed video recording of behavior. |
| **D-02** | **Spring Bounce Physics** | Automated Physics Test | Icons scale with the exact overshoot and settle physics defined in the spec. | Physics simulation report. |
| **D-03** | **Running Indicator** | Manual & Automated State Test | 4px Platinum dot appears ONLY for running applications. | Screenshot of both states. |

### 2.4. God Mode (BATCH-103)

| ID | Requirement | Test Method | Pass Criteria | Evidence Required |
|:---|:---|:---|:---|:---|
| **GM-01** | **Unstoppable Clarity Aesthetic** | Automated Screenshot Comparison | Dimensions (700x400), background, blur (24px), and border match spec pixel-perfect. | Pixel-diff report against mockup. |
| **GM-02** | **Invocation Animation & Sound** | Manual & Automated Test | Modal scales and fades in over 200ms while playing `god_mode_open.wav`. | High-speed video and audio recording. |
| **GM-03** | **Living Border Pulse** | Manual Test | On invoke, the Violet Living Border pulses once over 300ms. | Screen recording of invocation. |

---

**END OF DOCUMENT**
