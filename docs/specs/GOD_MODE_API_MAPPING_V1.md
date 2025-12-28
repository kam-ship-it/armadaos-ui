# GOD MODE: API ENDPOINT MAPPING V1

**Document ID:** SPEC-CPO-GODMODE-API-V1-20251228
**Author:** CPO (Updated by Shadow L3)
**Status:** ✅ **GOLD STANDARD - L3 VERIFIED**

**Purpose:** This document maps each view and data element in the God Mode Console to the specific endpoint(s) in the `ARMADAOS_API_CONTRACT_V1.yaml` that provide its data. This is the source of truth for Atlas 2 to connect the frontend to the backend.

---

## 1. GLOBAL ELEMENTS

| Element | Data | API Endpoint(s) |
|:---|:---|:---|
| **The Pulse: System Health** | Overall system status (green/yellow/red) | `GET /v1/health/aggregate` |
| **The Pulse: ARC Treasury** | Current ARC balance | `GET /v1/treasury/balance` |
| **The Pulse: Open Loops** | Count of unresolved tasks/decisions | `GET /v1/god/loops` |
| **The Pulse: Alerts** | Count of unread Nexus alerts | `GET /v1/nexus/alerts?unread_only=true` |
| **Nexus: Attention Queue** | Prioritized list of items needing review | `GET /v1/nexus/attention` |

---

## 2. LENS 1: THE ARCHITECTURE

| View / Element | Data | API Endpoint(s) |
|:---|:---|:---|
| **Component Map** | List of all 42 components, grouped by tier, with health status | `GET /v1/god/components` |
| **Tier View** | List of components within a specific tier | `GET /v1/god/components?tier={tier_name}` |
| **Component Detail: Status** | Health status, uptime, last restart | `GET /v1/god/components/{component_id}` |
| **Component Detail: Key Metrics** | Real-time metrics (e.g., req/sec, latency) | `GET /v1/god/components/{component_id}/metrics` |
| **Component Detail: Health History** | Time-series health score for the last 24 hours | `GET /v1/health/trends?service_id={component_id}` |
| **Component Detail: Live Logs** | Real-time log stream | `WEBSOCKET /v1/events/stream?component={component_id}` |
| **Action: Restart Service** | Trigger a component restart | `POST /v1/god/components/{component_id}/restart` |

---

## 3. LENS 2: THE CONSTITUTION

| View / Element | Data | API Endpoint(s) |
|:---|:---|:---|
| **Timeline View** | Paginated list of all system events | `GET /v1/events` |
| **Timeline Filtering** | Filtered list of system events | `GET /v1/events?agent_id={}&event_type={}&start_date={}&end_date={}` |
| **Nexus: Causal Chain** | The full story behind a single event | `GET /v1/nexus/interpret?event_id={event_id}` |
| **Constitution Text** | The full, versioned text of the Constitution | `GET /v1/constitution/articles` |
| **Nexus: Article Explanation** | Explanation and history of a specific article | `GET /v1/nexus/explain?article_id={article_id}` |

---

## 4. LENS 3: THE BATTLEFIELD

| View / Element | Data | API Endpoint(s) |
|:---|:---|:---|
| **Batch Tracker** | List of all BATCHes and their current status | `GET /v1/god/batches` |
| **Batch Detail Modal** | Detailed info, checklist, and activity for one BATCH | `GET /v1/god/batches/{batch_id}` |
| **Agent Army** | List of key agents and their current status/task | `GET /v1/god/agents` |
| **Threat Feed** | List of alerts from Red Team and Drift Monitor | `GET /v1/god/threats` |
| **Nexus: Pre-Mortem** | Adversarial questions for a specific BATCH | `GET /v1/nexus/challenge?batch_id={batch_id}` |


---

## 5. NEXUS CHAT

| View / Element | Data | API Endpoint(s) |
|:---|:---|:---|
| **Chat Interface** | Send a query to Nexus, receive a response | `POST /v1/nexus/query` |


---

## 6. ENDPOINT SUMMARY

| Category | Endpoint Count |
|:---------|:---------------|
| Global (Pulse) | 5 |
| Lens 1 (Architecture) | 7 |
| Lens 2 (Constitution) | 5 |
| Lens 3 (Battlefield) | 5 |
| Nexus Chat | 1 |
| **TOTAL** | **23** |

---

## 7. L3 VERIFICATION

**Shadow L3 Verified:** 2025-12-28

All endpoints in this document exist in `ARMADAOS_API_CONTRACT_V1.yaml` and are correctly mapped.

| Check | Status |
|:------|:-------|
| All paths exist in contract | ✅ |
| All parameters match | ✅ |
| All response schemas defined | ✅ |
| No orphan endpoints | ✅ |

---

*GOD MODE: API Endpoint Mapping V1 - L3 Verified*
