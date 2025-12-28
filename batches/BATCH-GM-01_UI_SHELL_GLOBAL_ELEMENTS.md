# BATCH-GM-01: UI SHELL & GLOBAL ELEMENTS

**Batch ID:** BATCH-GM-01
**Title:** UI Shell & Global Elements
**Assigned To:** Atlas 2 (UX/UI)
**Priority:** P0 - HIGHEST
**Status:** 🟡 READY FOR EXECUTION
**Created:** December 28, 2025
**Author:** COS v1.1

---

## EXECUTIVE SUMMARY

This batch establishes the foundational UI shell for the God Mode Console, including the global layout, The Pulse top bar, left navigation, and the Nexus panel shell.

**Estimated Hours:** 16-24
**Dependencies:** None (first batch)
**DoD Criteria:** P13-001, P13-002, P13-003, P13-004

---

## ACCEPTANCE CRITERIA

| ID | Criterion | Verification |
|:---|:----------|:-------------|
| AC-01 | Boot sequence plays 9-second brand ritual on first load | Visual inspection |
| AC-02 | Global layout has 4 zones: Pulse (top), Nav (left), Content (center), Nexus (right) | Visual inspection |
| AC-03 | The Pulse displays System Health from `GET /v1/health/aggregate` | API integration test |
| AC-04 | The Pulse displays ARC Treasury from `GET /v1/treasury/balance` | API integration test |
| AC-05 | The Pulse displays Open Loops from `GET /v1/god/loops` | API integration test |
| AC-06 | The Pulse displays Alerts count from `GET /v1/nexus/alerts?unread_only=true` | API integration test |
| AC-07 | Left Nav has 3 lens buttons: Architecture, Constitution, Battlefield | Visual inspection |
| AC-08 | Nexus Panel shell is present and can expand/collapse | Interaction test |

---

## DELIVERABLES

### 1. Components to Create

| Component | Path | Purpose |
|:----------|:-----|:--------|
| `GodModeLayout.tsx` | `src/components/god-mode/GodModeLayout.tsx` | Main layout wrapper |
| `PulseBar.tsx` | `src/components/god-mode/PulseBar.tsx` | Top status bar |
| `LeftNav.tsx` | `src/components/god-mode/LeftNav.tsx` | Left navigation |
| `NexusPanel.tsx` | `src/components/god-mode/NexusPanel.tsx` | Right panel shell |
| `BootSequence.tsx` | `src/components/god-mode/BootSequence.tsx` | 9-second brand ritual |

### 2. Layout Specification

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           THE PULSE (PulseBar)                          │
│  [System: ●]  [ARC: $X,XXX]  [Loops: X]  [Alerts: X]                   │
├──────────┬──────────────────────────────────────────────┬───────────────┤
│          │                                              │               │
│  LEFT    │              MAIN CONTENT                    │    NEXUS      │
│  NAV     │              (Lens View)                     │    PANEL      │
│          │                                              │               │
│  [🏗️]    │                                              │   [Nexus      │
│  [📜]    │                                              │    Chat]      │
│  [⚔️]    │                                              │               │
│          │                                              │               │
└──────────┴──────────────────────────────────────────────┴───────────────┘

Width ratios: Nav (60px) | Content (flex) | Nexus (320px, collapsible)
```

### 3. The Pulse Specification

| Element | Data Source | Display Format |
|:--------|:------------|:---------------|
| System Health | `GET /v1/health/aggregate` | Colored dot (🟢/🟡/🔴) + "Healthy/Degraded/Critical" |
| ARC Treasury | `GET /v1/treasury/balance` | "$X,XXX ARC" |
| Open Loops | `GET /v1/god/loops` | "X Open Loops" |
| Alerts | `GET /v1/nexus/alerts?unread_only=true` | "X Alerts" (red badge if >0) |

### 4. Boot Sequence Specification

Per CMO spec, the 9-second boot sequence:

```
0-3s: Black screen → Armada logo fade in
3-5s: Logo pulse animation
5-7s: "Initializing God Mode..." text
7-9s: Fade to main interface
```

**Skip option:** After first view, user can click to skip.

---

## API ENDPOINTS REQUIRED

| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/health/aggregate` | GET | System health status |
| `/v1/treasury/balance` | GET | ARC balance |
| `/v1/god/loops` | GET | Open loop count |
| `/v1/nexus/alerts` | GET | Alert count |

**Contract Location:** `armadaos-ui/docs/ARMADAOS_API_CONTRACT_V1.yaml`

---

## LOADING STATES (CPO REQUIREMENT)

All components must implement proper loading states. Reference `specs/GOD_MODE_ERROR_STATES_V1.md` for patterns.

### Required Loading States

| Component | Loading State | Pattern |
|:----------|:--------------|:--------|
| PulseBar | Skeleton pulse animation | Gray bars with shimmer |
| LeftNav | Static (no loading) | Always visible |
| NexusPanel | "Connecting..." message | Centered spinner |
| Boot Sequence | N/A (is the loading state) | Full-screen animation |

### Skeleton Pattern

```typescript
// Use consistent skeleton component
<Skeleton className="h-4 w-24 bg-gray-800 animate-pulse" />
```

---

## REFERENCE DOCUMENTS

| Document | Path | Purpose |
|:---------|:-----|:--------|
| Error States | `specs/GOD_MODE_ERROR_STATES_V1.md` | Loading/error patterns |
| Master UX Spec | `specs/EXECUTION_SPEC_GOD_MODE_NEXUS_UX_V1.md` | Full UX specification |
| CMO Experience Spec | `comms/CMO_CPO_UXUI_SYNC_COMPLETE_EXPERIENCE_SPEC_V1.md` | Brand, voice, boot sequence |
| Microcopy Map | `specs/GOD_MODE_MICROCOPY_MAP_V1.md` | All UI text |
| API Mapping | `specs/GOD_MODE_API_MAPPING_V1.md` | Endpoint mapping |
| Error States | `specs/GOD_MODE_ERROR_STATES_V1.md` | Error handling |

---

## IMPLEMENTATION NOTES

### State Management

```typescript
// Global state for Pulse data
interface PulseState {
  systemHealth: 'healthy' | 'degraded' | 'critical';
  arcBalance: number;
  openLoops: number;
  alertCount: number;
  lastUpdated: Date;
}

// Refresh interval: 30 seconds
```

### Error Handling

If any Pulse endpoint fails:
- Display last known value with "stale" indicator
- Show error toast
- Retry with exponential backoff

### Responsive Behavior

- **Desktop (>1200px):** Full layout with Nexus panel
- **Tablet (768-1200px):** Nexus panel collapsed by default
- **Mobile (<768px):** View-only mode per `GOD_MODE_RESPONSIVE_SCOPE_V1.md`

---

## VERIFICATION CHECKLIST

Before marking complete:

- [ ] Boot sequence plays correctly on first load
- [ ] All 4 layout zones render correctly
- [ ] System Health updates from API
- [ ] ARC Treasury updates from API
- [ ] Open Loops updates from API
- [ ] Alerts count updates from API
- [ ] Left Nav has 3 lens buttons
- [ ] Nexus Panel expands/collapses
- [ ] Error states handled gracefully
- [ ] Responsive breakpoints work

---

## SHADOW L3 GATE

This batch requires Shadow L3 verification before proceeding to BATCH-GM-02.

**Verification criteria:**
- All acceptance criteria met
- All components render correctly
- All API integrations work
- No console errors
- Responsive behavior correct

---

*BATCH-GM-01 - UI Shell & Global Elements*
*Atlas 2 - Execute with 0% ambiguity*
