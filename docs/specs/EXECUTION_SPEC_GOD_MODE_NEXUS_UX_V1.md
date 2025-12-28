# EXECUTION SPEC: GOD MODE + NEXUS UX/UI V1

**Document ID:** SPEC-CPO-GODMODE-NEXUS-UX-V1-20251228
**Author:** CPO
**Audience:** Atlas 2 (UI/UX Team), COS (for Handoff)
**Status:** ✅ **GOLD STANDARD** - SINGLE SOURCE OF TRUTH

---

## 1. THE VISION: A COGNITIVE INTERFACE

This document defines the user experience for the **God Mode Console**, the Chairman's command center for the Immutable Supercomputer. This is not a dashboard; it is a **Cognitive Interface**—a seamless fusion of a visual UI (God Mode) and an AI co-pilot (Nexus).

**The Goal:** To transform the immense complexity of the 42-component system into a legible, controllable, and trustworthy experience. The UI must provide **visual proof** that the system is working, that every action is recorded, and that all work compounds, thereby solving the Chairman's exhaustion from chaos.

> **The Emotional Promise:** "Every bit of work is saved. Every decision is recorded. Every learning compounds. You are always moving forward. You can trust this."

---

## 2. THE CORE EXPERIENCE: 3 LENSES, 1 GUIDE

The entire experience is structured around three distinct **Lenses**, which provide different views into the system. The **Nexus Agent** is the unifying intelligence layer that provides context, guidance, and interpretation across all three.

| Lens | Name | Purpose | Analogy |
|:---|:---|:---|:---|
| **1** | **The Architecture** | View the raw health and status of the 42 components. | The Engine Room |
| **2** | **The Constitution** | View the enforcement of laws and the immutable event log. | The Soul |
| **3** | **The Battlefield** | View strategic execution, batch progress, and threats. | The Bridge |

### The Nexus Agent: The Cognitive Co-Pilot

Nexus is the brain of the interface. It manifests in three ways:

1.  **The Nexus Panel (Right Sidebar):** An always-on AI chat and attention queue.
2.  **Contextual Overlays:** Non-intrusive tooltips and explanations on hover.
3.  **Proactive Alerts:** Toast notifications for critical, high-priority events.

---

## 3. GLOBAL UI ELEMENTS

### 3.1. The Main Layout

The UI is a three-part layout:

1.  **Top Bar (The Pulse):** Persistent global status.
2.  **Left Navigation:** Switches between the 3 Lenses.
3.  **Main Content Area:** Displays the active Lens.
4.  **Right Sidebar (The Nexus Panel):** Always visible.

### 3.2. The Pulse (Top Bar)

This bar is always visible and provides the at-a-glance system health.

| Element | UI | Purpose |
|:---|:---|:---|
| **System Health Orb** | A glowing orb | Green: Nominal. Yellow: Attention Needed. Red: Critical. |
| **ARC Treasury** | `💰 1,234,567 ARC` | Current balance of the system's economic fuel. |
| **Open Loops** | `🔄 12 Open` | Number of unresolved tasks or decisions. |
| **Alerts** | `🔔 3 New` | Number of unread critical alerts from Nexus. |

### 3.3. The Nexus Panel (Right Sidebar)

This is the primary interaction point with the Nexus agent.

*   **Top Section: Attention Queue:** An AI-prioritized list of items needing the Chairman's review. Each item includes a summary, severity, and one-click action buttons (e.g., `[Review Batch]`, `[Add Credits]`).
*   **Bottom Section: Chat Interface:** A standard chat input field with the placeholder `Ask Nexus anything...` for direct queries.

---

## 4. LENS 1: THE ARCHITECTURE

**Purpose:** To provide a real-time, hierarchical view of the health and status of all 42 Immutable Supercomputer components.

### 4.1. The Component Map (Main View)

*   A grid of 8 interactive cards, one for each component tier:
    *   CORE SUBSTRATE (10)
    *   CORE SERVICES (16)
    *   INFRASTRUCTURE (16)
*   Each card displays:
    *   The Tier Name (e.g., "CORE SUBSTRATE")
    *   A status summary (e.g., "10/10 Components Healthy")
    *   A series of small, glowing dots representing each component in that tier, colored by health (Green/Yellow/Red).

### 4.2. The Tier View (Drill-Down)

*   Clicking a Tier card on the map zooms into a detailed view of that tier.
*   Displays a list or sub-grid of all components within that tier.
*   Each component is a card showing:
    *   Component Name (e.g., `the-one-gateway`)
    *   Health Status (Icon + Text)
    *   Key Metric (e.g., "Requests/sec: 1,234")
    *   A sparkline showing the key metric over the last hour.

### 4.3. The Component View (Deep Drill-Down)

*   Clicking a component card opens a dedicated detail view.
*   **Nexus Integration:** When this view opens, the Nexus Panel automatically displays a detailed explanation of the component, its purpose, and its current state.
*   This view includes:
    *   Detailed metrics and health checks.
    *   Configuration settings.
    *   Available actions (`[Restart]`, `[View Logs]`, `[Configure]`).
    *   A live-tailing log view from the selected component.

---

## 5. LENS 2: THE CONSTITUTION

**Purpose:** To provide an immutable, verifiable, and legible view into the laws of the system and their enforcement.

### 5.1. The Timeline (Main View)

*   An infinite-scrolling, chronological log of every significant event in the system, pulled from the `event-store`.
*   Each event is a single, human-readable line:
    *   `14:37:22 - [FAILURE] context-injector became unhealthy.`
    *   `14:35:10 - [SUCCESS] BATCH-136 deployed by Atlas.`
    *   `14:32:01 - [INFO] Atlas committed bf23a6d.`
*   **Nexus Integration:** Clicking any event prompts Nexus to perform a Causal Chain Analysis, explaining the full story behind that event.

### 5.2. Filters & Search

*   A powerful search and filtering bar at the top allows the Chairman to query the timeline by:
    *   Component Name
    *   Event Type (e.g., `violation`, `approval`, `deployment`)
    *   Agent Name
    *   Date/Time Range

### 5.3. The Constitution View

*   A dedicated sub-view that displays the full, version-controlled text of the ArmadaOS Constitution.
*   **Nexus Integration:** The user can highlight any article or pillar, and Nexus will provide a detailed explanation, its history, and a list of all related violations and amendments.

---

## 6. LENS 3: THE BATTLEFIELD

**Purpose:** To provide a strategic overview of execution, progress, and threats.

### 6.1. The Batch Tracker (Main View)

*   A Kanban-style board showing the status of all active BATCHes.
*   Columns: `Proposed` -> `Approved` -> `In Progress (Atlas)` -> `Verifying (Shadow)` -> `Complete`.
*   Each BATCH is a card showing:
    *   Batch ID (e.g., BATCH-134)
    *   Title
    *   Assigned Agent (e.g., Atlas 2)
    *   Progress bar
*   **Nexus Integration:** Clicking a card prompts Nexus to provide a summary, identify potential blockers, and offer to run a pre-mortem analysis.

### 6.2. The Agent Army View

*   A view showing the status of all key AI agents (COS, CMO, CPO, Shadow, Atlas).
*   Each agent has a card showing:
    *   Name & Version
    *   Current Task / Active Batch
    *   Health Status
    *   ARC consumption rate.

### 6.3. The Threat Feed

*   A feed of alerts generated by the `red-team-agent` and `drift-monitor`.
*   Each alert shows:
    *   Threat Type (e.g., "Security Anomaly", "Economic Spike", "Constitutional Drift")
    *   Severity
    *   A summary of the event.
*   **Nexus Integration:** Clicking an alert prompts Nexus to provide a full impact assessment and recommended mitigation steps.

---

## 7. ONBOARDING: FIRST TIME IN GOD MODE

The first time the Chairman enters God Mode, Nexus initiates a guided walkthrough:

1.  **Welcome:** A modal window introduces God Mode and Nexus.
2.  **Lens Tour:** Nexus guides the user through each of the 3 Lenses, explaining their purpose.
3.  **First Mission:** Nexus gives the user a simple task, e.g., "Let's review the health of the Core Substrate. Click on The Architecture lens, then the CORE card."
4.  **Contextual Help:** As the user navigates, Nexus provides contextual overlays explaining UI elements.
5.  **Graduation:** After completing the guided tasks, the onboarding ends, and the full UI is unlocked.

---

## 8. REFERENCE DOCUMENTS

This spec is built upon the Gold Standard documents in the `ArmadaOS` repository. For hyper-detailed specs, refer to:

- **Nexus Agent:** `agents/nexus/NEXUS_GOLD_STANDARD_BRIEF_V2.md`
- **Component List:** `architecture/IMMUTABLE_SUPERCOMPUTER_GOLDILOCKS_ANALYSIS.md`
- **Experience/Voice:** `comms/CMO_CPO_UXUI_SYNC_COMPLETE_EXPERIENCE_SPEC_V1.md`
- **API Contract:** `armadaos-ui/docs/ARMADAOS_API_CONTRACT_V1.yaml`
- **Component Details:** `specs/COMPONENT_DETAIL_SPEC_V1.md`
- **Nexus Prompts:** `specs/NEXUS_PROMPT_ENGINEERING_V1.md`
- **Microcopy Map:** `specs/GOD_MODE_MICROCOPY_MAP_V1.md`
- **API Mapping:** `specs/GOD_MODE_API_MAPPING_V1.md`
- **Error States:** `specs/GOD_MODE_ERROR_STATES_V1.md`
- **Responsive Scope:** `specs/GOD_MODE_RESPONSIVE_SCOPE_V1.md`
