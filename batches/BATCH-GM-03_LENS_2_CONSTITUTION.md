# BATCH-GM-03: LENS 2 - THE CONSTITUTION

**Batch ID:** BATCH-GM-03
**Title:** Lens 2: The Constitution
**Assigned To:** Atlas 2 (UX/UI)
**Priority:** P0 - HIGHEST
**Status:** 🟡 READY FOR EXECUTION
**Created:** December 28, 2025
**Author:** COS v1.1

---

## EXECUTIVE SUMMARY

This batch implements the Constitution Lens - the view that displays the immutable event log (timeline), filtering capabilities, and the full Constitution text with Nexus interpretation.

**Estimated Hours:** 24-32
**Dependencies:** BATCH-GM-01 (UI Shell)
**DoD Criteria:** P13-009, P13-010, P13-011, P13-012

---

## ACCEPTANCE CRITERIA

| ID | Criterion | Verification |
|:---|:----------|:-------------|
| AC-01 | Timeline View displays infinite-scrolling event log | Interaction test |
| AC-02 | Events show timestamp, type, component, and description | Visual inspection |
| AC-03 | Timeline can be filtered by Component | Filter test |
| AC-04 | Timeline can be filtered by Event Type | Filter test |
| AC-05 | Timeline can be filtered by Agent | Filter test |
| AC-06 | Timeline can be filtered by Date Range | Filter test |
| AC-07 | Clicking an event triggers Nexus Causal Chain Analysis | Interaction test |
| AC-08 | Constitution text is viewable and searchable | Interaction test |

---

## DELIVERABLES

### 1. Components to Create

| Component | Path | Purpose |
|:----------|:-----|:--------|
| `ConstitutionLens.tsx` | `src/components/god-mode/lenses/ConstitutionLens.tsx` | Main lens container |
| `Timeline.tsx` | `src/components/god-mode/constitution/Timeline.tsx` | Infinite-scroll event log |
| `EventRow.tsx` | `src/components/god-mode/constitution/EventRow.tsx` | Single event display |
| `TimelineFilters.tsx` | `src/components/god-mode/constitution/TimelineFilters.tsx` | Filter controls |
| `ConstitutionViewer.tsx` | `src/components/god-mode/constitution/ConstitutionViewer.tsx` | Full text viewer |
| `ArticleCard.tsx` | `src/components/god-mode/constitution/ArticleCard.tsx` | Article display |
| `SearchBar.tsx` | `src/components/god-mode/constitution/SearchBar.tsx` | Text search |

### 2. Timeline Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        THE CONSTITUTION                                  │
│                                                                          │
│  [Timeline]  [Constitution Text]                                        │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ FILTERS                                                              ││
│  │ Component: [All ▼]  Type: [All ▼]  Agent: [All ▼]  Date: [Today ▼] ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ TIMELINE                                                             ││
│  │                                                                       ││
│  │  14:37:22  ● SUCCESS  context-injector                              ││
│  │            Context injection completed for Atlas query               ││
│  │                                                                       ││
│  │  14:35:10  ● SUCCESS  the-one-gateway                               ││
│  │            BATCH-136 deployed successfully                           ││
│  │                                                                       ││
│  │  14:32:01  ● INFO     master-architect                              ││
│  │            Atlas committed bf23a6d to armadaos-genesis              ││
│  │                                                                       ││
│  │  14:30:45  ● WARNING  health-monitor                                ││
│  │            validator latency increased to 150ms                      ││
│  │                                                                       ││
│  │  14:28:00  ● FAILURE  context-injector                              ││
│  │            Context injection failed: timeout                         ││
│  │                                                                       ││
│  │  [Load More...]                                                      ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3. Event Row Specification

```typescript
interface EventRowProps {
  id: string;
  timestamp: string; // ISO-8601
  type: 'success' | 'failure' | 'warning' | 'info' | 'violation';
  component: string;
  agent?: string;
  description: string;
  details?: Record<string, any>;
}

// Color mapping
const typeColors = {
  success: '#22c55e', // green
  failure: '#ef4444', // red
  warning: '#f59e0b', // amber
  info: '#3b82f6',    // blue
  violation: '#dc2626' // dark red
};
```

### 4. Filter Specification

| Filter | Options | API Parameter |
|:-------|:--------|:--------------|
| Component | All 42 components + "All" | `component={component_id}` |
| Event Type | success, failure, warning, info, violation | `event_type={type}` |
| Agent | COS, Atlas, Shadow, CMO, CPO, CFO + "All" | `agent_id={agent_id}` |
| Date Range | Today, Last 7 Days, Last 30 Days, Custom | `start_date={}&end_date={}` |

### 5. Constitution Text View

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        THE CONSTITUTION                                  │
│                                                                          │
│  [Timeline]  [Constitution Text]                                        │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🔍 Search Constitution...                                           ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ARTICLES                                                             ││
│  │                                                                       ││
│  │  ┌───────────────────────────────────────────────────────────────┐  ││
│  │  │ ARTICLE 1: THE CHAIRMAN'S AUTHORITY                           │  ││
│  │  │                                                                │  ││
│  │  │ The Chairman holds supreme authority over all aspects of      │  ││
│  │  │ ArmadaOS. All agents, systems, and processes exist to serve   │  ││
│  │  │ the Chairman's vision and objectives.                         │  ││
│  │  │                                                                │  ││
│  │  │ [Ask Nexus about this article →]                              │  ││
│  │  └───────────────────────────────────────────────────────────────┘  ││
│  │                                                                       ││
│  │  ┌───────────────────────────────────────────────────────────────┐  ││
│  │  │ ARTICLE 2: THE IMMUTABLE COMPUTER                             │  ││
│  │  │                                                                │  ││
│  │  │ The system shall maintain an immutable record of all actions  │  ││
│  │  │ and decisions. Nothing is deleted. Everything is auditable.   │  ││
│  │  │                                                                │  ││
│  │  │ [Ask Nexus about this article →]                              │  ││
│  │  └───────────────────────────────────────────────────────────────┘  ││
│  │                                                                       ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## API ENDPOINTS REQUIRED

| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/events` | GET | Paginated event list |
| `/v1/events?agent_id={}&event_type={}&start_date={}&end_date={}` | GET | Filtered events |
| `/v1/nexus/interpret?event_id={id}` | GET | Causal Chain Analysis |
| `/v1/constitution/articles` | GET | Full Constitution text |
| `/v1/nexus/explain?article_id={id}` | GET | Article explanation |

**Contract Location:** `armadaos-ui/docs/ARMADAOS_API_CONTRACT_V1.yaml`

---

## NEXUS INTEGRATION

### Causal Chain Analysis

When user clicks an event, trigger Nexus to perform Causal Chain Analysis:

```typescript
// Request to Nexus
{
  capability: "interpret",
  context: {
    event_id: "evt-123456",
    event_type: "failure",
    component: "context-injector"
  }
}

// Expected response format
{
  title: "Context Injection Failure",
  summary: "The context-injector service failed to inject context for an Atlas query due to a timeout.",
  causal_chain: [
    {
      timestamp: "14:27:30",
      event: "Atlas initiated query requiring context injection"
    },
    {
      timestamp: "14:27:45",
      event: "Context-injector began fetching from Weaviate"
    },
    {
      timestamp: "14:28:00",
      event: "Weaviate query exceeded 15s timeout threshold"
    },
    {
      timestamp: "14:28:00",
      event: "Context-injector returned timeout error"
    }
  ],
  root_cause: "Weaviate query performance degradation",
  impact: "Atlas query failed; user received error response",
  recommendation: "Investigate Weaviate performance; consider increasing timeout threshold"
}
```

### Article Explanation

When user clicks "Ask Nexus about this article":

```typescript
// Request to Nexus
{
  capability: "explain",
  context: {
    article_id: "article-1",
    article_title: "The Chairman's Authority"
  }
}

// Expected response format
{
  title: "Article 1: The Chairman's Authority",
  explanation: "This article establishes the fundamental governance structure...",
  history: [
    { date: "2025-01-01", change: "Original ratification" },
    { date: "2025-06-15", change: "Amendment: Added delegation clause" }
  ],
  related_violations: [],
  key_implications: [
    "All agents must defer to Chairman decisions",
    "No autonomous action can override Chairman directive"
  ]
}
```

---

## INFINITE SCROLL IMPLEMENTATION

```typescript
// Pagination state
interface TimelineState {
  events: Event[];
  cursor: string | null;
  hasMore: boolean;
  isLoading: boolean;
  filters: FilterState;
}

// Fetch function
async function fetchEvents(cursor?: string, filters?: FilterState) {
  const params = new URLSearchParams({
    limit: '50',
    ...(cursor && { cursor }),
    ...(filters?.component && { component: filters.component }),
    ...(filters?.eventType && { event_type: filters.eventType }),
    ...(filters?.agent && { agent_id: filters.agent }),
    ...(filters?.startDate && { start_date: filters.startDate }),
    ...(filters?.endDate && { end_date: filters.endDate }),
  });
  
  const response = await fetch(`/v1/events?${params}`);
  return response.json();
}

// Intersection Observer for infinite scroll
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && hasMore && !isLoading) {
      fetchEvents(cursor, filters);
    }
  },
  { threshold: 0.1 }
);
```

---

## LOADING STATES (CPO REQUIREMENT)

All components must implement proper loading states. Reference `specs/GOD_MODE_ERROR_STATES_V1.md` for patterns.

### Required Loading States

| Component | Loading State | Pattern |
|:----------|:--------------|:--------|
| Timeline | Skeleton event rows | Gray rows with shimmer |
| EventRow | N/A (part of timeline skeleton) | - |
| TimelineFilters | Static (no loading) | Always visible |
| ConstitutionViewer | Skeleton article cards | Placeholder text blocks |
| SearchBar | Static (no loading) | Always visible |

### Infinite Scroll Loading

```typescript
// Show loading indicator at bottom during fetch
{isLoading && (
  <div className="flex justify-center py-4">
    <Spinner className="w-6 h-6 text-purple-500" />
  </div>
)}
```

---

## REFERENCE DOCUMENTS

| Document | Path | Purpose |
|:---------|:-----|:--------|
| Error States | `specs/GOD_MODE_ERROR_STATES_V1.md` | Loading/error patterns |
| Master UX Spec | `specs/EXECUTION_SPEC_GOD_MODE_NEXUS_UX_V1.md` | Full UX specification |
| API Mapping | `specs/GOD_MODE_API_MAPPING_V1.md` | Endpoint mapping |
| Nexus Prompts | `specs/NEXUS_PROMPT_ENGINEERING_V1.md` | Nexus capability prompts |
| Constitution | `CONSTITUTION/` | Full Constitution text |

---

## VERIFICATION CHECKLIST

Before marking complete:

- [ ] Timeline displays events correctly
- [ ] Infinite scroll loads more events
- [ ] Component filter works
- [ ] Event Type filter works
- [ ] Agent filter works
- [ ] Date Range filter works
- [ ] Clicking event triggers Nexus Causal Chain
- [ ] Constitution text displays all articles
- [ ] Search finds text in Constitution
- [ ] "Ask Nexus" triggers article explanation
- [ ] Event colors match type

---

## SHADOW L3 GATE

This batch requires Shadow L3 verification before proceeding to BATCH-GM-04.

**Verification criteria:**
- All acceptance criteria met
- Timeline performance acceptable (< 200ms load)
- Filters work correctly
- Nexus integrations functional
- Constitution text complete

---

*BATCH-GM-03 - Lens 2: The Constitution*
*Atlas 2 - Execute with 0% ambiguity*
