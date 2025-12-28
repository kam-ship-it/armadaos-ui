# BATCH-GM-02: LENS 1 - THE ARCHITECTURE

**Batch ID:** BATCH-GM-02
**Title:** Lens 1: The Architecture
**Assigned To:** Atlas 2 (UX/UI)
**Priority:** P0 - HIGHEST
**Status:** 🟡 READY FOR EXECUTION
**Created:** December 28, 2025
**Author:** COS v1.1

---

## EXECUTIVE SUMMARY

This batch implements the Architecture Lens - the view that displays all 42 components of the Immutable Computer, organized by tier, with health status, metrics, and drill-down capabilities.

**Estimated Hours:** 24-32
**Dependencies:** BATCH-GM-01 (UI Shell)
**DoD Criteria:** P13-005, P13-006, P13-007, P13-008

---

## ACCEPTANCE CRITERIA

| ID | Criterion | Verification |
|:---|:----------|:-------------|
| AC-01 | Component Map displays 3 tiers (Core Substrate, Core Services, Infrastructure) | Visual inspection |
| AC-02 | Each tier shows component count and aggregate health | API integration test |
| AC-03 | Clicking a tier drills down to show all components in that tier | Interaction test |
| AC-04 | Each component card shows name, health status, key metric | Visual inspection |
| AC-05 | Clicking a component opens detail view with metrics, logs, actions | Interaction test |
| AC-06 | Hovering over a component triggers Nexus contextual explanation | Interaction test |
| AC-07 | Component health colors match status (🟢 healthy, 🟡 degraded, 🔴 unhealthy) | Visual inspection |
| AC-08 | Restart action works for components that support it | API integration test |

---

## DELIVERABLES

### 1. Components to Create

| Component | Path | Purpose |
|:----------|:-----|:--------|
| `ArchitectureLens.tsx` | `src/components/god-mode/lenses/ArchitectureLens.tsx` | Main lens container |
| `ComponentMap.tsx` | `src/components/god-mode/architecture/ComponentMap.tsx` | 3-tier overview |
| `TierCard.tsx` | `src/components/god-mode/architecture/TierCard.tsx` | Tier summary card |
| `TierView.tsx` | `src/components/god-mode/architecture/TierView.tsx` | Drill-down tier view |
| `ComponentCard.tsx` | `src/components/god-mode/architecture/ComponentCard.tsx` | Individual component card |
| `ComponentDetail.tsx` | `src/components/god-mode/architecture/ComponentDetail.tsx` | Full component detail view |
| `MetricsPanel.tsx` | `src/components/god-mode/architecture/MetricsPanel.tsx` | Metrics display |
| `LogViewer.tsx` | `src/components/god-mode/architecture/LogViewer.tsx` | Live log stream |

### 2. Component Map Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        THE ARCHITECTURE                                  │
│                                                                          │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────┐ │
│  │   CORE SUBSTRATE    │  │   CORE SERVICES     │  │  INFRASTRUCTURE │ │
│  │                     │  │                     │  │                 │ │
│  │   10 Components     │  │   15 Components     │  │  16 Components  │ │
│  │   ● 8 Healthy       │  │   ● 12 Healthy      │  │  ● 10 Healthy   │ │
│  │   ● 2 Degraded      │  │   ● 3 Degraded      │  │  ● 6 Planned    │ │
│  │                     │  │                     │  │                 │ │
│  │   [View Details →]  │  │   [View Details →]  │  │  [View →]       │ │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3. The 3 Tiers (42 Components)

#### Tier 1: Core Substrate (10 Components)

| # | Component | Purpose |
|:-:|:----------|:--------|
| 1 | The One Gateway | Single entry point |
| 2 | Agent Runtime | Executes agent logic |
| 3 | Constitution Enforcer | Validates against Constitution |
| 4 | Event Store | Immutable audit log |
| 5 | Validator | Validates agent outputs |
| 6 | Red Team Agent | Adversarial testing |
| 7 | System-Level Shadow | Monitors system health |
| 8 | Orchestrator | Multi-agent coordination |
| 9 | Action Queue | Manages pending actions |
| 10 | Agent Router | Routes to correct agent |

#### Tier 2: Core Services (15 Components)

| # | Component | Purpose |
|:-:|:----------|:--------|
| 11 | Context Engine | Long-term memory |
| 12 | Sandbox Bridge | Secure code execution |
| 13 | Master Architect | Code indexing |
| 14 | Treasury | Cost tracking |
| 15 | State Manager | State tracking |
| 16 | Context Injector | Context injection |
| 17 | Weaviate | Vector database |
| 18 | Approval Engine | Approval workflows |
| 19 | Cost Model | Cost estimation |
| 20 | Memory Controller | Working memory |
| 21 | RAM Agent | In-memory cache |
| 22 | God Mode API | Chairman API |
| 23 | God Mode Console | Chairman UI |
| 24 | Service Adapters | External API connectors |
| 25 | Backup Service | Backup and restore |

#### Tier 3: Infrastructure & Observability (16 Components)

| # | Component | Purpose |
|:-:|:----------|:--------|
| 26 | Linkerd | Service mesh |
| 27 | OpenTelemetry | Distributed tracing |
| 28 | AWS Secrets Manager | Secret storage |
| 29 | AWS ALB/NLB | Load balancing |
| 30 | ECS/Kubernetes | Container orchestration |
| 31 | Health Monitor | Individual health checks |
| 32 | Health Aggregator | Holistic health view |
| 33 | Rollback Mechanism | Automated rollback |
| 34 | Dead Man's Switch | Fail-safe |
| 35 | Dependency Graph | Build order |
| 36 | Configuration Management | Config management |
| 37 | Service Discovery | Service discovery |
| 38 | Disaster Recovery | DR setup |
| 39 | Shadow of Shadow | Backup monitor |
| 40 | CI/CD Pipelines | Automated deployment |
| 41 | Canary Deployment | Progressive rollouts |

#### Tier 4: UI & Generative (1 Component)

| # | Component | Purpose |
|:-:|:----------|:--------|
| 42 | Generative UI | AI-powered interface |

### 4. Component Card Specification

```typescript
interface ComponentCardProps {
  id: string;
  name: string;
  tier: 'core_substrate' | 'core_services' | 'infrastructure' | 'ui_generative';
  status: 'healthy' | 'degraded' | 'unhealthy' | 'planned';
  keyMetric: {
    label: string;
    value: string | number;
    unit?: string;
  };
  sparklineData?: number[]; // Last hour, 60 points
}
```

### 5. Component Detail View

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ← Back to Core Substrate                                               │
│                                                                          │
│  THE ONE GATEWAY                                                        │
│  ● Healthy | Uptime: 24h 30m | Last Restart: Dec 27, 14:00             │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ KEY METRICS                                                          ││
│  │                                                                       ││
│  │  Requests/sec: 1,234    Latency (p99): 45ms    Error Rate: 0.01%   ││
│  │  [Sparkline]            [Sparkline]            [Sparkline]          ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ HEALTH HISTORY (24h)                                                 ││
│  │  [████████████████████████████████████████████████████████████]     ││
│  │  100% healthy                                                        ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ LIVE LOGS                                                            ││
│  │  14:37:22 [INFO] Request processed: /v1/agents/cos/query            ││
│  │  14:37:21 [INFO] Request processed: /v1/health                      ││
│  │  14:37:20 [INFO] Request processed: /v1/events                      ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ACTIONS                                                                │
│  [Restart Service]  [View Full Logs]  [Configure]                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## API ENDPOINTS REQUIRED

| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/god/components` | GET | List all 42 components with health |
| `/v1/god/components?tier={tier}` | GET | List components in specific tier |
| `/v1/god/components/{id}` | GET | Get component details |
| `/v1/god/components/{id}/metrics` | GET | Get component metrics |
| `/v1/health/trends?service_id={id}` | GET | Get health history |
| `/v1/events/stream?component={id}` | WS | Live log stream |
| `/v1/god/components/{id}/restart` | POST | Restart component |

**Contract Location:** `armadaos-ui/docs/ARMADAOS_API_CONTRACT_V1.yaml`

---

## NEXUS INTEGRATION

### Hover Explanation

When user hovers over a component for >500ms, trigger Nexus to display:

```typescript
// Request to Nexus
{
  capability: "guide",
  context: {
    component_id: "the-one-gateway",
    current_status: "healthy"
  }
}

// Expected response format
{
  title: "The One Gateway",
  description: "The single entry point for all requests to the Immutable Computer...",
  key_facts: [
    "Handles ~1,234 requests/second",
    "Routes to 10 downstream services",
    "Last incident: None in 30 days"
  ]
}
```

---

## LOADING STATES (CPO REQUIREMENT)

All components must implement proper loading states. Reference `specs/GOD_MODE_ERROR_STATES_V1.md` for patterns.

### Required Loading States

| Component | Loading State | Pattern |
|:----------|:--------------|:--------|
| ComponentMap | Skeleton cards for 3 tiers | Gray cards with shimmer |
| TierView | Skeleton grid of component cards | Placeholder cards |
| ComponentDetail | Skeleton for metrics + logs | Shimmer animation |
| MetricsPanel | Sparkline placeholders | Gray lines |
| LogViewer | "Loading logs..." message | Spinner + message |

### Skeleton Pattern

```typescript
// Tier card skeleton
<div className="animate-pulse">
  <div className="h-6 w-32 bg-gray-800 rounded mb-2" />
  <div className="h-4 w-24 bg-gray-800 rounded" />
</div>
```

---

## REFERENCE DOCUMENTS

| Document | Path | Purpose |
|:---------|:-----|:--------|
| Error States | `specs/GOD_MODE_ERROR_STATES_V1.md` | Loading/error patterns |
| Master UX Spec | `specs/EXECUTION_SPEC_GOD_MODE_NEXUS_UX_V1.md` | Full UX specification |
| Component Details | `specs/COMPONENT_DETAIL_SPEC_V1.md` | All 42 components with metrics |
| API Mapping | `specs/GOD_MODE_API_MAPPING_V1.md` | Endpoint mapping |
| Nexus Prompts | `specs/NEXUS_PROMPT_ENGINEERING_V1.md` | Nexus capability prompts |

---

## VERIFICATION CHECKLIST

Before marking complete:

- [ ] Component Map shows 3 tiers correctly
- [ ] Tier cards show component count and health summary
- [ ] Clicking tier drills down to component list
- [ ] Each component card shows name, status, key metric
- [ ] Clicking component opens detail view
- [ ] Detail view shows metrics, health history, logs
- [ ] Restart action triggers API call
- [ ] Nexus hover explanation works
- [ ] Health colors are correct
- [ ] WebSocket log stream works

---

## SHADOW L3 GATE

This batch requires Shadow L3 verification before proceeding to BATCH-GM-03.

**Verification criteria:**
- All 42 components display correctly
- All API integrations work
- Nexus integration functional
- Drill-down navigation works
- Actions execute correctly

---

*BATCH-GM-02 - Lens 1: The Architecture*
*Atlas 2 - Execute with 0% ambiguity*
