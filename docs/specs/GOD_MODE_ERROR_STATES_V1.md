# GOD MODE: ERROR STATES & EDGE CASES V1

**Document ID:** SPEC-CPO-GODMODE-ERRORS-V1-20251228
**Author:** CPO
**Status:** ✅ **GOLD STANDARD**

**Purpose:** This document defines the UI/UX for all error states, empty states, and edge cases within the God Mode Console. A robust system is defined by how it handles failure, not just success.

---

## 1. GLOBAL & API-LEVEL ERRORS

| Condition | UI Manifestation | Microcopy (from Bible) |
|:---|:---|:---|
| **API Unreachable** | A full-screen modal overlay that blocks all other UI. | **Headline:** `Connection Lost` <br> **Body:** `God Mode cannot connect to the ArmadaOS API. Please check your network connection and try again.` <br> **CTA:** `[Retry Connection]` |
| **Authentication Failure (401)** | User is immediately logged out and redirected to the login screen. | **Message:** `Your session has expired. Please log in again.` |
| **Permission Denied (403)** | A toast notification appears. The attempted action fails silently. | **Message:** `You do not have permission to perform that action.` |

---

## 2. LENS 1: THE ARCHITECTURE

| Condition | UI Manifestation | Microcopy |
|:---|:---|:---|
| **Component Unreachable** | The component card in the Tier View turns red. The status text changes to `UNREACHABLE`. All metrics show `-`. | **Headline:** `Component Unreachable` <br> **Body:** `God Mode cannot connect to this component. It may be offline or experiencing network issues.` |
| **Metrics API Fails** | The metric tiles in the Component Detail view show a `-` and a small warning icon. | **Tooltip:** `Could not load metric.` |
| **Logs WebSocket Fails** | The Live Logs panel shows a persistent `Connecting...` message. | **Message:** `Attempting to connect to log stream...` |

---

## 3. LENS 2: THE CONSTITUTION

| Condition | UI Manifestation | Microcopy (from Bible) |
|:---|:---|:---|
| **Timeline: No Events Found** | The timeline area shows an empty state component. | **Headline:** `Nothing Found.` <br> **Body:** `The system couldn't find any events for your query. Try rephrasing or broadening your search.` <br> **CTA:** `[New Search]` |
| **Timeline: Reached End** | A small text indicator appears at the bottom of the list. | `You have reached the beginning of time.` |
| **Nexus: Causal Chain Fails** | The Nexus panel shows an error message. | **Message:** `I could not build the full story for that event. The data may be incomplete.` |

---

## 4. LENS 3: THE BATTLEFIELD

| Condition | UI Manifestation | Microcopy (from Bible) |
|:---|:---|:---|
| **Batch Tracker: Empty** | The Kanban board is empty and shows an empty state component. | **Headline:** `The Battlefield is Clear.` <br> **Body:** `There are no active BATCHes at this time.` <br> **CTA:** `[Propose New Batch]` |
| **Threat Feed: Empty** | The Threat Feed panel shows an empty state component. | **Headline:** `All Quiet.` <br> **Body:** `The Threat Feed is clear. No active threats have been detected.` |
| **Agent Army: Agent Unhealthy** | The agent's card in the Agent Army view turns red. | **Status Text:** `UNHEALTHY` |

---

## 5. NEXUS-SPECIFIC ERRORS

| Condition | UI Manifestation | Microcopy (from Bible) |
|:---|:---|:---|
| **Nexus: Cannot Answer** | The Nexus chat responds with a specific message. | `I cannot answer that. I do not have enough information to provide a confident answer to your question.` |
| **Nexus: Query Timeout** | The Nexus chat shows a loading indicator, then replaces it with an error. | `My response is taking longer than expected. Please try rephrasing your question.` |
| **Nexus: API Fails** | The entire Nexus panel is replaced with an error state. | **Headline:** `Nexus is Offline` <br> **Body:** `The Nexus AI co-pilot is currently unreachable.` |
