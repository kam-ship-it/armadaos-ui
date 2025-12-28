# BATCH-135: Full Codex Injection UI

**Batch ID:** BATCH-135  
**Title:** Full Codex Injection UI  
**Track:** B (Frontend)  
**Repository:** armadaos-ui  
**Hours:** 4  
**DoD Tier:** T7 (Deployed)  
**Dependencies:** BATCH-134  

---

## Overview

Build the UI for viewing and managing agent codex documents. This allows the Chairman to see what context each agent receives and manage the constitutional documents.

---

## API Contract Reference

**Contract:** `docs/ARMADAOS_API_CONTRACT_V1.yaml`

### Endpoints Used

| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/context/assemble` | POST | View assembled context |
| `/v1/architect/search` | POST | Search indexed documents |
| `/v1/architect/index` | POST | Index new document |

---

## Acceptance Criteria

| # | Criterion | Verification |
|:--|:----------|:-------------|
| 1 | Codex viewer page renders | Visual |
| 2 | Tier 1 documents displayed | API call works |
| 3 | Document search works | POST /architect/search |
| 4 | Document preview works | Content displayed |
| 5 | Context assembly preview | POST /context/assemble |
| 6 | Token count displayed | Per tier |
| 7 | Document upload works | POST /architect/index |
| 8 | Tier classification visible | Metadata displayed |

---

## Pages

### 1. Codex Library (`/codex`)
- List all indexed documents
- Filter by tier (1, 2, 3)
- Filter by type (protocol, spec, constitution)
- Search functionality
- Document count and token totals

### 2. Document View (`/codex/[id]`)
- Full document content
- Metadata (tier, type, tokens, indexed date)
- Related documents
- Edit/delete options

### 3. Context Preview (`/codex/preview`)
- Simulate context assembly for an agent
- Show what Tier 1, 2, 3 would include
- Token budget visualization
- Test different queries

### 4. Upload Document (`/codex/upload`)
- File upload or paste content
- Auto-classify tier
- Preview before indexing
- Confirm and index

---

## Technical Implementation

### New Components

```
src/components/codex/
├── DocumentList.tsx       # List of documents
├── DocumentCard.tsx       # Single document card
├── DocumentViewer.tsx     # Full document view
├── TierBadge.tsx          # Tier indicator
├── TokenBudget.tsx        # Token visualization
├── ContextPreview.tsx     # Context assembly preview
├── SearchBar.tsx          # Document search
└── UploadForm.tsx         # Document upload
```

### Context Preview Component

```typescript
// components/codex/ContextPreview.tsx
interface ContextPreviewProps {
  agentId: string;
  query: string;
}

export function ContextPreview({ agentId, query }: ContextPreviewProps) {
  const { data } = useQuery({
    queryKey: ['context', agentId, query],
    queryFn: () => api.post('/v1/context/assemble', {
      agent_id: agentId,
      query,
    }),
  });

  return (
    <div className="space-y-4">
      <TierSection 
        tier={1} 
        tokens={data?.tier1_tokens} 
        budget={30000}
        docs={data?.tier1_docs}
      />
      <TierSection 
        tier={2} 
        tokens={data?.tier2_tokens} 
        budget={40000}
        docs={data?.tier2_docs}
      />
      <TierSection 
        tier={3} 
        tokens={data?.tier3_tokens} 
        budget={30000}
        docs={data?.tier3_docs}
      />
      <TotalTokens total={data?.total_tokens} budget={100000} />
    </div>
  );
}
```

---

## Deliverables

| # | Deliverable | Location |
|:--|:------------|:---------|
| 1 | Codex library page | `src/app/codex/page.tsx` |
| 2 | Document view page | `src/app/codex/[id]/page.tsx` |
| 3 | Context preview page | `src/app/codex/preview/page.tsx` |
| 4 | Upload page | `src/app/codex/upload/page.tsx` |
| 5 | Codex components | `src/components/codex/` |

---

## Design Requirements

### Token Budget Visualization

```
┌─────────────────────────────────────────────────────────────┐
│ CONTEXT BUDGET                                    96,732 / 100,000 │
├─────────────────────────────────────────────────────────────┤
│ Tier 1 (Always Loaded)    ████████████████░░░░  29,679 / 30,000 │
│ Tier 2 (Predictive)       █████████████████░░░  39,789 / 40,000 │
│ Tier 3 (RAG Search)       █████████████░░░░░░░  27,264 / 30,000 │
└─────────────────────────────────────────────────────────────┘
```

### Document Card

```
┌─────────────────────────────────────────────────────────────┐
│ [T1] AOSP-117: Autonomous Troubleshooting Protocol          │
│                                                             │
│ Type: Protocol    Tokens: 2,450    Indexed: Dec 28, 2024    │
│                                                             │
│ Atlas has authority to fix infrastructure issues...         │
│                                                             │
│ [View] [Edit] [Delete]                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Dependencies

| Dependency | Status | Notes |
|:-----------|:-------|:------|
| BATCH-134 (Cockpit) | Required | Must complete first |
| API Contract | ✅ Available | Design against contract |
| Context Engine | ⏳ Optional | Use mocks until ready |
| Master Architect | ⏳ Optional | Use mocks until ready |

---

## IDE Report

Upon completion, submit: `syncs/ATLAS_INSIGHTS_BATCH-135.md`

---

*BATCH-135: Full Codex Injection UI*
*Track B - Frontend Development*
