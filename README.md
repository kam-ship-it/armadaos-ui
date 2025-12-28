# God Mode Console (`armadaos-ui`)

**The Chairman's Window into the Immutable Computer**

This repository contains the frontend application for the ArmadaOS God Mode Console.

---

## Quick Links

| Document | Description |
|:---------|:------------|
| [API Contract](./docs/ARMADAOS_API_CONTRACT_V1.yaml) | OpenAPI 3.0 specification (4,826 lines) |
| [Master Spec Index](./docs/specs/GOD_MODE_INDEX.md) | Index of all God Mode specifications |
| [Batches](./batches/) | All work tickets for this project |

---

## Batches (Execute in Order)

| Batch | Title | Status |
|:------|:------|:-------|
| [BATCH-GM-00](./batches/BATCH-GM-00_PROJECT_FOUNDATION.md) | **Project Foundation** | 🔴 START HERE |
| [BATCH-GM-01](./batches/BATCH-GM-01_UI_SHELL_GLOBAL_ELEMENTS.md) | UI Shell & Global Elements | 🟡 Ready |
| [BATCH-GM-02](./batches/BATCH-GM-02_LENS_1_ARCHITECTURE.md) | Lens 1: The Architecture | 🟡 Ready |
| [BATCH-GM-03](./batches/BATCH-GM-03_LENS_2_CONSTITUTION.md) | Lens 2: The Constitution | 🟡 Ready |
| [BATCH-GM-04](./batches/BATCH-GM-04_LENS_3_BATTLEFIELD.md) | Lens 3: The Battlefield | 🟡 Ready |
| [BATCH-GM-05](./batches/BATCH-GM-05_NEXUS_INTEGRATION_ONBOARDING.md) | Nexus Integration & Onboarding | 🟡 Ready |
| [BATCH-GM-06](./batches/BATCH-GM-06_TESTING.md) | Testing | 🔵 Planned |

---

## Specifications

| Spec | Description |
|:-----|:------------|
| [GOD_MODE_INDEX.md](./docs/specs/GOD_MODE_INDEX.md) | Master index of all specs |
| [EXECUTION_SPEC_GOD_MODE_NEXUS_UX_V1.md](./docs/specs/EXECUTION_SPEC_GOD_MODE_NEXUS_UX_V1.md) | Complete UX specification |
| [GOD_MODE_API_MAPPING_V1.md](./docs/specs/GOD_MODE_API_MAPPING_V1.md) | API endpoint mapping |
| [GOD_MODE_MICROCOPY_MAP_V1.md](./docs/specs/GOD_MODE_MICROCOPY_MAP_V1.md) | UI text and microcopy |
| [GOD_MODE_ERROR_STATES_V1.md](./docs/specs/GOD_MODE_ERROR_STATES_V1.md) | Error handling |
| [NEXUS_PROMPT_ENGINEERING_V1.md](./docs/specs/NEXUS_PROMPT_ENGINEERING_V1.md) | Nexus AI prompts |

---

## Mockups

| Mockup | Description |
|:-------|:------------|
| [Lens 1: Architecture](./docs/mockups/GOD_MODE_LENS1_ARCHITECTURE_V1.png) | Component map view |
| [Lens 2: Constitution](./docs/mockups/GOD_MODE_LENS2_CONSTITUTION_V1.png) | Event timeline view |
| [Lens 3: Battlefield](./docs/mockups/GOD_MODE_LENS3_BATTLEFIELD_V1.png) | Batch tracker view |
| [Component Detail](./docs/mockups/GOD_MODE_WIREFRAME_COMPONENT_DETAIL_V1.png) | Component drill-down |
| [Batch Detail](./docs/mockups/GOD_MODE_WIREFRAME_BATCH_DETAIL_V1.png) | Batch drill-down |
| [Onboarding 1: Welcome](./docs/mockups/GOD_MODE_WIREFRAME_ONBOARDING_1_WELCOME_V1.png) | Boot sequence |
| [Onboarding 2: Pulse](./docs/mockups/GOD_MODE_WIREFRAME_ONBOARDING_2_PULSE_V1.png) | Pulse introduction |
| [Onboarding 3: Lenses](./docs/mockups/GOD_MODE_WIREFRAME_ONBOARDING_3_LENSES_V1.png) | Lens introduction |
| [Onboarding 4: Nexus](./docs/mockups/GOD_MODE_WIREFRAME_ONBOARDING_4_NEXUS_V1.png) | Nexus introduction |
| [Onboarding 5: Mission](./docs/mockups/GOD_MODE_WIREFRAME_ONBOARDING_5_MISSION_V1.png) | Mission statement |

---

## Project Structure

```
armadaos-ui/
├── batches/              # Work tickets (GM-00 to GM-06)
├── docs/
│   ├── ARMADAOS_API_CONTRACT_V1.yaml  # API contract
│   ├── specs/            # All specifications
│   └── mockups/          # All visual mockups
├── public/               # Static assets
└── src/
    ├── api/              # API client and types
    ├── assets/           # Images, fonts, etc.
    ├── components/       # Reusable UI components
    ├── hooks/            # Custom React hooks
    ├── layouts/          # Page layouts
    ├── mocks/            # MSW mock handlers
    ├── pages/            # Route pages
    ├── styles/           # Global styles
    └── utils/            # Utility functions
```

---

## Getting Started

```bash
# 1. Clone the repository
gh repo clone kam-ship-it/armadaos-ui
cd armadaos-ui

# 2. Execute BATCH-GM-00 (Project Foundation)
# Follow the instructions in batches/BATCH-GM-00_PROJECT_FOUNDATION.md

# 3. After GM-00 is complete:
pnpm install
pnpm dev
```

This will start the Vite development server with the mock API enabled.

---

## The Three Lenses

God Mode provides three views into the Immutable Computer:

1. **The Architecture** - All 42 components, their health, metrics, and actions
2. **The Constitution** - The immutable event log and constitution enforcement
3. **The Battlefield** - Strategic execution, batch progress, and threats

---

## API Endpoints (23 Total)

| Category | Count | Description |
|:---------|:------|:------------|
| Global (Pulse) | 5 | System status, alerts, kill switch |
| Architecture | 7 | Components, tiers, metrics, logs |
| Constitution | 5 | Events, constitution, approvals |
| Battlefield | 5 | Batches, agents, threats |
| Nexus | 1 | AI query interface |

All endpoints are documented in `docs/ARMADAOS_API_CONTRACT_V1.yaml`.

---

## Mock Server

This project uses MSW (Mock Service Worker) to mock all 23 API endpoints during development. This allows the UI to be built independently of the backend.

**To enable mocks:** Set `VITE_ENABLE_MOCKS=true` in your `.env` file.

---

## Related Repositories

| Repository | Purpose |
|:-----------|:--------|
| [ArmadaOS](https://github.com/kam-ship-it/ArmadaOS) | Documentation, specs, protocols |
| [armadaos-genesis](https://github.com/kam-ship-it/armadaos-genesis) | Backend services |
| **armadaos-ui** (this repo) | Frontend |

---

## The First Law

> "Nothing is real until it's in GitHub."

---

*ArmadaOS UI - The Chairman's Window into the Immutable Computer*
