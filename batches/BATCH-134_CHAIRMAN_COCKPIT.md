# BATCH-134: Chairman Cockpit

**Batch ID:** BATCH-134  
**Title:** Chairman Cockpit (GOD MODE Console)  
**Track:** B (Frontend)  
**Repository:** armadaos-ui  
**Hours:** 10  
**DoD Tier:** T7 (Deployed)  
**Dependencies:** BATCH-133  

---

## Overview

Build the Chairman's GOD MODE Console - the primary interface for monitoring and controlling the ArmadaOS system.

---

## API Contract Reference

**Contract:** `docs/ARMADAOS_API_CONTRACT_V1.yaml`

### Endpoints Used

| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/health` | GET | System health status |
| `/v1/god/status` | GET | Dashboard overview data |
| `/v1/god/agents` | GET | List all agents |
| `/v1/god/agents/{id}` | GET | Agent details |
| `/v1/god/pause` | POST | Kill switch |
| `/v1/god/resume` | POST | Resume operations |
| `/v1/god/events` | GET | Event timeline |
| `/v1/god/approvals` | GET | Pending approvals |
| `/v1/god/approvals/{id}` | POST | Approve/reject |
| `/v1/god/override` | POST | Override decision |

---

## Acceptance Criteria

| # | Criterion | Verification |
|:--|:----------|:-------------|
| 1 | Dashboard page renders | Visual |
| 2 | System status displays correctly | API call works |
| 3 | Agent list displays | API call works |
| 4 | Agent detail view works | Navigation + API |
| 5 | Kill switch button works | POST /pause |
| 6 | Resume button works | POST /resume |
| 7 | Event timeline displays | API call works |
| 8 | Approval queue displays | API call works |
| 9 | Approve/reject buttons work | POST /approvals/{id} |
| 10 | Real-time updates via polling | 5-second refresh |
| 11 | Responsive on tablet | Visual |
| 12 | Error states handled | UI shows errors |

---

## Pages

### 1. Dashboard (`/`)
- System health overview
- Active agents count
- Pending approvals count
- Recent events (last 10)
- Quick actions (pause/resume)

### 2. Agents (`/agents`)
- List of all agents
- Status indicators (active/idle/paused/error)
- Current task display
- Click to view details

### 3. Agent Detail (`/agents/[id]`)
- Full agent information
- Task history
- Recent events for this agent
- Pause/resume individual agent

### 4. Approvals (`/approvals`)
- Pending approval queue
- One-click approve/reject
- Approval details expandable
- Bulk actions

### 5. Events (`/events`)
- Full event timeline
- Filterable by agent, type, time
- Searchable
- Exportable

### 6. Settings (`/settings`)
- Notification preferences
- Display preferences
- API key management

---

## Technical Implementation

### Stack
```
Next.js 14 (App Router)
├── React 18
├── TailwindCSS
├── React Query (data fetching)
├── Zustand (state management)
└── shadcn/ui (components)
```

### Project Structure
```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── agents/
│   │   ├── page.tsx          # Agent list
│   │   └── [id]/page.tsx     # Agent detail
│   ├── approvals/page.tsx    # Approval queue
│   ├── events/page.tsx       # Event timeline
│   └── settings/page.tsx     # Settings
├── components/
│   ├── ui/                   # shadcn components
│   ├── dashboard/            # Dashboard components
│   ├── agents/               # Agent components
│   └── common/               # Shared components
├── lib/
│   ├── api.ts                # API client (per contract)
│   ├── hooks/                # Custom hooks
│   └── utils.ts              # Utilities
└── types/
    └── api.ts                # Types from OpenAPI
```

### API Client
```typescript
// lib/api.ts
import { createClient } from '@/lib/openapi-client';

const api = createClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// All methods match contract exactly
export const getSystemStatus = () => api.get('/v1/god/status');
export const getAgents = () => api.get('/v1/god/agents');
export const pauseAllAgents = (reason: string) => 
  api.post('/v1/god/pause', { reason });
// ... etc
```

---

## Deliverables

| # | Deliverable | Location |
|:--|:------------|:---------|
| 1 | Dashboard page | `src/app/page.tsx` |
| 2 | Agents page | `src/app/agents/page.tsx` |
| 3 | Agent detail page | `src/app/agents/[id]/page.tsx` |
| 4 | Approvals page | `src/app/approvals/page.tsx` |
| 5 | Events page | `src/app/events/page.tsx` |
| 6 | API client | `src/lib/api.ts` |
| 7 | Type definitions | `src/types/api.ts` |
| 8 | Component library | `src/components/` |

---

## Mock Data

Until backend is ready, use mock data that matches contract schema:

```typescript
// lib/mocks/status.ts
export const mockStatus = {
  status: 'operational',
  services: {
    context_engine: 'connected',
    sandbox_bridge: 'connected',
    master_architect: 'connected',
  },
  active_agents: 3,
  pending_approvals: 2,
  events_last_hour: 47,
  uptime_seconds: 86400,
};
```

---

## Dependencies

| Dependency | Status | Notes |
|:-----------|:-------|:------|
| BATCH-133 (Design) | Required | Must complete first |
| API Contract | ✅ Available | Design against contract |
| Backend Services | ⏳ Optional | Use mocks until ready |

---

## IDE Report

Upon completion, submit: `syncs/ATLAS_INSIGHTS_BATCH-134.md`

---

*BATCH-134: Chairman Cockpit*
*Track B - Frontend Development*
