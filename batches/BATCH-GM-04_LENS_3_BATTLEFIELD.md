# BATCH-GM-04: LENS 3 - THE BATTLEFIELD

**Batch ID:** BATCH-GM-04
**Title:** Lens 3: The Battlefield
**Assigned To:** Atlas 2 (UX/UI)
**Priority:** P0 - HIGHEST
**Status:** 🟡 READY FOR EXECUTION
**Created:** December 28, 2025
**Author:** COS v1.1

---

## EXECUTIVE SUMMARY

This batch implements the Battlefield Lens - the strategic view that displays batch progress (Kanban), agent status (Agent Army), and threat alerts (Threat Feed) with Nexus pre-mortem analysis.

**Estimated Hours:** 24-32
**Dependencies:** BATCH-GM-01 (UI Shell)
**DoD Criteria:** P13-013, P13-014, P13-015, P13-016

---

## ACCEPTANCE CRITERIA

| ID | Criterion | Verification |
|:---|:----------|:-------------|
| AC-01 | Batch Tracker displays Kanban board with all BATCHes | Visual inspection |
| AC-02 | Kanban has 5 columns: Proposed, Approved, In Progress, Verifying, Complete | Visual inspection |
| AC-03 | Batch cards show ID, title, assigned agent, progress | Visual inspection |
| AC-04 | Agent Army displays status for all key agents | Visual inspection |
| AC-05 | Agent cards show name, version, current task, health, ARC consumption | Visual inspection |
| AC-06 | Threat Feed displays alerts from red-team-agent and drift-monitor | API integration test |
| AC-07 | Clicking a BATCH triggers Nexus Pre-Mortem analysis | Interaction test |
| AC-08 | Threat alerts show type, severity, and summary | Visual inspection |

---

## DELIVERABLES

### 1. Components to Create

| Component | Path | Purpose |
|:----------|:-----|:--------|
| `BattlefieldLens.tsx` | `src/components/god-mode/lenses/BattlefieldLens.tsx` | Main lens container |
| `BatchTracker.tsx` | `src/components/god-mode/battlefield/BatchTracker.tsx` | Kanban board |
| `KanbanColumn.tsx` | `src/components/god-mode/battlefield/KanbanColumn.tsx` | Single column |
| `BatchCard.tsx` | `src/components/god-mode/battlefield/BatchCard.tsx` | Batch card |
| `BatchDetailModal.tsx` | `src/components/god-mode/battlefield/BatchDetailModal.tsx` | Batch detail popup |
| `AgentArmy.tsx` | `src/components/god-mode/battlefield/AgentArmy.tsx` | Agent status grid |
| `AgentCard.tsx` | `src/components/god-mode/battlefield/AgentCard.tsx` | Single agent card |
| `ThreatFeed.tsx` | `src/components/god-mode/battlefield/ThreatFeed.tsx` | Alert feed |
| `ThreatAlert.tsx` | `src/components/god-mode/battlefield/ThreatAlert.tsx` | Single alert |

### 2. Battlefield Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        THE BATTLEFIELD                                   │
│                                                                          │
│  [Batch Tracker]  [Agent Army]  [Threat Feed]                           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3. Batch Tracker (Kanban)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        BATCH TRACKER                                     │
│                                                                          │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ │
│  │ PROPOSED  │ │ APPROVED  │ │IN PROGRESS│ │ VERIFYING │ │ COMPLETE  │ │
│  │    (3)    │ │    (2)    │ │    (4)    │ │    (1)    │ │   (58)    │ │
│  ├───────────┤ ├───────────┤ ├───────────┤ ├───────────┤ ├───────────┤ │
│  │           │ │           │ │           │ │           │ │           │ │
│  │ ┌───────┐ │ │ ┌───────┐ │ │ ┌───────┐ │ │ ┌───────┐ │ │ ┌───────┐ │ │
│  │ │GM-01  │ │ │ │GEN-001│ │ │ │GEN-002│ │ │ │B-136  │ │ │ │B-135  │ │ │
│  │ │UI Shel│ │ │ │Gateway│ │ │ │Core   │ │ │ │Agent  │ │ │ │Codex  │ │ │
│  │ │Atlas 2│ │ │ │Atlas 1│ │ │ │Intel  │ │ │ │Shadow │ │ │ │Done   │ │ │
│  │ │░░░░░░ │ │ │ │████░░ │ │ │ │███░░░ │ │ │ │██████ │ │ │ │██████ │ │ │
│  │ └───────┘ │ │ └───────┘ │ │ └───────┘ │ │ └───────┘ │ │ └───────┘ │ │
│  │           │ │           │ │           │ │           │ │           │ │
│  │ ┌───────┐ │ │ ┌───────┐ │ │ ┌───────┐ │ │           │ │ ┌───────┐ │ │
│  │ │GM-02  │ │ │ │GEN-003│ │ │ │B-177  │ │ │           │ │ │B-134  │ │ │
│  │ │Arch   │ │ │ │Ops Svc│ │ │ │Infra  │ │ │           │ │ │Cockpit│ │ │
│  │ │Atlas 2│ │ │ │Atlas 1│ │ │ │Atlas 1│ │ │           │ │ │Done   │ │ │
│  │ │░░░░░░ │ │ │ │░░░░░░ │ │ │ │████░░ │ │ │           │ │ │██████ │ │ │
│  │ └───────┘ │ │ └───────┘ │ │ └───────┘ │ │           │ │ └───────┘ │ │
│  │           │ │           │ │           │ │           │ │           │ │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4. Batch Card Specification

```typescript
interface BatchCardProps {
  id: string;           // e.g., "BATCH-GM-01"
  title: string;        // e.g., "UI Shell & Global Elements"
  status: 'proposed' | 'approved' | 'in_progress' | 'verifying' | 'complete';
  assignedAgent: string; // e.g., "Atlas 2"
  progress: number;     // 0-100
  priority: 'P0' | 'P1' | 'P2';
  estimatedHours?: number;
  actualHours?: number;
  blockers?: string[];
}

// Progress bar colors
const progressColors = {
  0-25: '#ef4444',   // red - just started
  26-50: '#f59e0b',  // amber - in progress
  51-75: '#3b82f6',  // blue - good progress
  76-100: '#22c55e'  // green - almost done
};
```

### 5. Batch Detail Modal

```
┌─────────────────────────────────────────────────────────────────────────┐
│  BATCH-GM-01: UI Shell & Global Elements                          [X]  │
│                                                                          │
│  Status: IN PROGRESS                                                    │
│  Assigned: Atlas 2                                                      │
│  Priority: P0                                                           │
│  Progress: ████████████░░░░░░░░ 60%                                    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ CHECKLIST                                                           ││
│  │ ☑ Boot sequence implemented                                         ││
│  │ ☑ Global layout created                                             ││
│  │ ☑ PulseBar component created                                        ││
│  │ ☐ Nexus Panel shell created                                         ││
│  │ ☐ API integrations complete                                         ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ACTIVITY                                                             ││
│  │ 14:30 - Atlas 2 committed: "Add PulseBar component"                 ││
│  │ 14:15 - Atlas 2 committed: "Create GodModeLayout"                   ││
│  │ 14:00 - COS assigned batch to Atlas 2                               ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  [Ask Nexus for Pre-Mortem Analysis]                                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6. Agent Army

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        AGENT ARMY                                        │
│                                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │ COS v1.1        │  │ ATLAS 1         │  │ ATLAS 2         │         │
│  │ ● Active        │  │ ● Active        │  │ ● Active        │         │
│  │                 │  │                 │  │                 │         │
│  │ Task: Protocol  │  │ Task: GEN-002   │  │ Task: GM-01     │         │
│  │ Codification    │  │ Core Intel      │  │ UI Shell        │         │
│  │                 │  │                 │  │                 │         │
│  │ ARC: 12.5/hr    │  │ ARC: 8.2/hr     │  │ ARC: 6.1/hr     │         │
│  │ Health: ●●●●●   │  │ Health: ●●●●○   │  │ Health: ●●●●●   │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │ SHADOW v1.2     │  │ CMO v1.0        │  │ CPO v1.0        │         │
│  │ ● Active        │  │ ○ Idle          │  │ ○ Idle          │         │
│  │                 │  │                 │  │                 │         │
│  │ Task: L3        │  │ Task: -         │  │ Task: -         │         │
│  │ Verification    │  │                 │  │                 │         │
│  │                 │  │                 │  │                 │         │
│  │ ARC: 4.3/hr     │  │ ARC: 0.0/hr     │  │ ARC: 0.0/hr     │         │
│  │ Health: ●●●●●   │  │ Health: ●●●●●   │  │ Health: ●●●●●   │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7. Agent Card Specification

```typescript
interface AgentCardProps {
  id: string;           // e.g., "cos-v1.1"
  name: string;         // e.g., "COS"
  version: string;      // e.g., "v1.1"
  status: 'active' | 'idle' | 'error';
  currentTask?: {
    batchId: string;
    description: string;
  };
  arcConsumption: number; // ARC per hour
  health: 1 | 2 | 3 | 4 | 5; // 5-point scale
}
```

### 8. Threat Feed

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        THREAT FEED                                       │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🔴 CRITICAL | Security Anomaly                          14:35:22   ││
│  │ Unusual API access pattern detected from IP 192.168.1.100          ││
│  │ Source: red-team-agent                                              ││
│  │ [View Details] [Dismiss]                                            ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🟡 WARNING | Constitutional Drift                       14:30:15   ││
│  │ Agent response deviated 15% from expected constitutional alignment ││
│  │ Source: drift-monitor                                               ││
│  │ [View Details] [Dismiss]                                            ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🟡 WARNING | Economic Spike                             14:25:00   ││
│  │ ARC consumption increased 200% in last hour                        ││
│  │ Source: red-team-agent                                              ││
│  │ [View Details] [Dismiss]                                            ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 9. Threat Alert Specification

```typescript
interface ThreatAlertProps {
  id: string;
  type: 'security_anomaly' | 'constitutional_drift' | 'economic_spike' | 'performance_degradation';
  severity: 'critical' | 'warning' | 'info';
  summary: string;
  source: 'red-team-agent' | 'drift-monitor';
  timestamp: string;
  details?: Record<string, any>;
}

// Severity colors
const severityColors = {
  critical: '#dc2626', // red
  warning: '#f59e0b',  // amber
  info: '#3b82f6'      // blue
};
```

---

## API ENDPOINTS REQUIRED

| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/god/batches` | GET | List all batches with status |
| `/v1/god/batches/{id}` | GET | Get batch details |
| `/v1/god/agents` | GET | List all agents with status |
| `/v1/god/threats` | GET | List threat alerts |
| `/v1/nexus/challenge?batch_id={id}` | GET | Pre-mortem analysis |

**Contract Location:** `armadaos-ui/docs/ARMADAOS_API_CONTRACT_V1.yaml`

---

## NEXUS INTEGRATION

### Pre-Mortem Analysis

When user clicks "Ask Nexus for Pre-Mortem Analysis" on a batch:

```typescript
// Request to Nexus
{
  capability: "challenge",
  context: {
    batch_id: "BATCH-GM-01",
    batch_title: "UI Shell & Global Elements",
    batch_status: "in_progress",
    progress: 60
  }
}

// Expected response format
{
  title: "Pre-Mortem Analysis: BATCH-GM-01",
  summary: "This batch is progressing well, but there are potential risks to consider.",
  questions: [
    "What happens if the Pulse API endpoints are slow? Have you implemented loading states?",
    "How will the boot sequence behave on slow connections?",
    "Is the Nexus Panel shell designed to handle long chat histories?",
    "What's the fallback if system health data is unavailable?"
  ],
  risks: [
    {
      risk: "API latency causing poor UX",
      probability: "Medium",
      impact: "High",
      mitigation: "Implement skeleton loaders and optimistic updates"
    },
    {
      risk: "Boot sequence annoying on repeat visits",
      probability: "High",
      impact: "Medium",
      mitigation: "Add skip button and remember preference"
    }
  ],
  recommendation: "Consider adding comprehensive error states before marking complete."
}
```

---

## LOADING STATES (CPO REQUIREMENT)

All components must implement proper loading states. Reference `specs/GOD_MODE_ERROR_STATES_V1.md` for patterns.

### Required Loading States

| Component | Loading State | Pattern |
|:----------|:--------------|:--------|
| BatchTracker | Skeleton kanban columns | Gray columns with shimmer |
| BatchCard | Skeleton card | Placeholder with progress bar |
| AgentArmy | Skeleton agent cards | Gray cards with shimmer |
| AgentCard | N/A (part of army skeleton) | - |
| ThreatFeed | "Loading threats..." message | Spinner + message |
| ThreatAlert | N/A (part of feed skeleton) | - |

### Skeleton Pattern

```typescript
// Kanban column skeleton
<div className="animate-pulse space-y-2">
  {[1, 2, 3].map(i => (
    <div key={i} className="h-24 bg-gray-800 rounded" />
  ))}
</div>
```

---

## REFERENCE DOCUMENTS

| Document | Path | Purpose |
|:---------|:-----|:--------|
| Error States | `specs/GOD_MODE_ERROR_STATES_V1.md` | Loading/error patterns |
| Master UX Spec | `specs/EXECUTION_SPEC_GOD_MODE_NEXUS_UX_V1.md` | Full UX specification |
| API Mapping | `specs/GOD_MODE_API_MAPPING_V1.md` | Endpoint mapping |
| Nexus Prompts | `specs/NEXUS_PROMPT_ENGINEERING_V1.md` | Nexus capability prompts |

---

## VERIFICATION CHECKLIST

Before marking complete:

- [ ] Kanban board displays with 5 columns
- [ ] Batch cards show correct information
- [ ] Batch cards are in correct columns
- [ ] Clicking batch opens detail modal
- [ ] Agent Army shows all key agents
- [ ] Agent status updates correctly
- [ ] Threat Feed displays alerts
- [ ] Alert severity colors correct
- [ ] Pre-mortem analysis works
- [ ] Drag-and-drop NOT required (view-only for now)

---

## SHADOW L3 GATE

This batch requires Shadow L3 verification before proceeding to BATCH-GM-05.

**Verification criteria:**
- All acceptance criteria met
- Kanban displays correctly
- Agent status accurate
- Threat feed functional
- Nexus pre-mortem works

---

*BATCH-GM-04 - Lens 3: The Battlefield*
*Atlas 2 - Execute with 0% ambiguity*
