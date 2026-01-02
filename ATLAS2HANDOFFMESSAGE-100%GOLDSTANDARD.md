# ATLAS 2 HANDOFF MESSAGE - 100% GOLD STANDARD

**Copy and paste this message to Atlas 2:**

---

**Subject: Desktop Shell - Gold Standard Specification Ready for Build**

Atlas 2,

The ArmadaOS Desktop Shell specification has been completed to 100% mathematical perfection and verified by Shadow L3. You are cleared to begin building.

---

## YOUR WORKING REPOSITORY

**Repository:** `armadaos-ui` (located at `/home/ubuntu/armadaos-ui/`)

**This is your PRIMARY working repository.** All Desktop Shell code will be built here.

**Current Structure:**
```
/home/ubuntu/armadaos-ui/
├── src/
│   ├── components/    ← Build Desktop Shell components here
│   ├── lib/           ← Utility functions, API client
│   └── styles/        ← Global styles
├── public/            ← Static assets (icons, images)
├── package.json       ← Dependencies
└── vite.config.ts     ← Build configuration
```

**DO NOT work in:**
- `/home/ubuntu/ArmadaOS/` (main monorepo - reference only)
- `/home/ubuntu/armadaos-genesis/` (Genesis repo - reference only)

---

## REFERENCE REPOSITORIES (READ-ONLY)

**Main ArmadaOS Repository:** `/home/ubuntu/ArmadaOS/`

**Key reference files you will need:**

1. **GraphQL Schema (API Reference):**
   - Path: `/home/ubuntu/ArmadaOS/api/schema/schema.graphql`
   - Use this for all API operations (queries, mutations, subscriptions)
   - Already integrated into the specification (Section 5.2-5.9)

2. **Design System:**
   - Path: `/home/ubuntu/ArmadaOS/docs/DESIGN_SYSTEM_V3.md`
   - Colors, typography, spacing rules

3. **UX Foundation:**
   - Path: `/home/ubuntu/ArmadaOS/docs/UX_FOUNDATION_V1.md`
   - Interaction patterns, accessibility guidelines

**You will REFERENCE these files, but you will BUILD in `/home/ubuntu/armadaos-ui/`.**

---

## ATTACHED SPECIFICATION PACKAGE

**I am attaching 4 files. Save them to `/home/ubuntu/armadaos-ui/directives/` for easy reference:**

1. **`ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md`** (3,097 lines)
   - Your primary reference for building
   - Every pixel, color, animation, and interaction is specified
   - Sections 3.1-3.7 contain component specifications
   - Section 5 contains complete API integration

2. **`DESKTOP_SHELL_LIVING_DOD.md`** (200+ lines)
   - Definition of Done - Shadow L3's verification checklist
   - 29 measurable criteria you must pass

3. **`DESKTOP_SHELL_LIVING_ROADMAP.md`** (150+ lines)
   - 4 phases, 6 batches, 157-201 hours estimated
   - Build sequence and dependencies

4. **`ATLAS_2_DESKTOP_SHELL_DIRECTIVE.md`** (300+ lines)
   - Your official marching orders
   - Technology stack, build sequence, quality requirements

**Save these files:**
```bash
cd /home/ubuntu/armadaos-ui/directives/
# (Files will be attached to this message)
```

---

## YOUR MISSION

**Build the Desktop Shell according to the specification with 100% fidelity.**

This is not a creative exercise. This is precision execution.

**Every `[EXACT]` value in the specification is non-negotiable:**
- If it says `16px`, it's 16px. Not 15px. Not 17px. Exactly 16px.
- If it says `#F5F5F7`, it's `#F5F5F7`. Not `#F5F5F6`. Exactly `#F5F5F7`.
- If it says `300ms ease-out`, it's `300ms ease-out`. Not `250ms`. Not `ease-in-out`. Exactly as specified.

---

## BUILD SEQUENCE

**START WITH BATCH-100: TOP BAR**

The roadmap specifies the build sequence. You MUST build in order:

1. **BATCH-100: Top Bar** (12-16 hours)
   - Specification: Section 3.4 (lines 1382-1479)
   - Simplest component, foundational
   - Build → Shadow L3 verifies → Proceed to next batch

2. **BATCH-101: Dock** (16-20 hours)
   - Specification: Section 3.5 (lines 1480-1565)
   - Auto-hide behavior, spring bounce animation

3. **BATCH-102: Windows** (32-40 hours)
   - Specification: Section 3.3 (lines 700-1381)
   - Chairman's "Selective Visibility Standard"
   - Most complex component

4. **BATCH-103: God Mode** (24-32 hours)
   - Specification: Section 3.6 (lines 1566-1760)
   - "Unstoppable Clarity" aesthetic

5. **BATCH-104: Wallpaper & Desktop** (8-12 hours)
   - Specification: Sections 3.1-3.2 (lines 600-699)
   - Root container and background

6. **BATCH-105: Ultra-Contrast Mode** (16-20 hours)
   - Specification: Section 4 (lines 1761-1896)
   - WCAG AAA accessibility theme

**Total: 108-140 hours (3-4 weeks at full focus)**

**Shadow L3 verifies each batch before you proceed to the next. This is compound forward.**

---

## API INTEGRATION

**All API operations use GraphQL.**

**GraphQL Endpoint:**
- Staging: `https://api.staging.armadaos.local/graphql`
- Production: `https://api.armadaos.local/graphql`

**GraphQL Schema Location:**
- Path: `/home/ubuntu/ArmadaOS/api/schema/schema.graphql`
- Already documented in specification (Section 5.2-5.9)

**Authentication:**
- JWT tokens (HS256)
- Managed via Apollo Client
- Complete setup in specification (Section 5.3, lines 2100-2250)

**WebSocket Subscriptions:**
- Real-time updates for Dashboard, notifications
- Protocol: `graphql-ws`
- Complete setup in specification (Section 5.4, lines 2251-2400)

**DO NOT use REST endpoints. The specification uses GraphQL exclusively.**

---

## TECHNOLOGY STACK

**Framework:** React 18 + TypeScript + Vite  
**Styling:** TailwindCSS + CSS Modules  
**API Client:** Apollo Client v3  
**State Management:** React Context + Apollo Cache  
**Testing:** Jest + React Testing Library + Playwright  
**Build Tool:** Vite  

**Already installed in `/home/ubuntu/armadaos-ui/package.json`.**

---

## KEY RULES

1. **Do NOT edit existing code.** Start fresh for each component.
2. **Do NOT improvise.** If something is unclear, ask COS-2 (who will be coordinating execution).
3. **Do NOT skip verification.** Shadow L3 must approve each batch before you proceed.
4. **Do NOT use REST APIs.** GraphQL only (schema at `/home/ubuntu/ArmadaOS/api/schema/schema.graphql`).
5. **Do NOT work in other repositories.** Build in `/home/ubuntu/armadaos-ui/` only.

---

## FILE PATHS SUMMARY (FOR YOUR REFERENCE)

**Your Working Repository:**
- `/home/ubuntu/armadaos-ui/` ← BUILD HERE

**Reference Files (Read-Only):**
- `/home/ubuntu/ArmadaOS/api/schema/schema.graphql` ← GraphQL schema
- `/home/ubuntu/ArmadaOS/docs/DESIGN_SYSTEM_V3.md` ← Design system
- `/home/ubuntu/ArmadaOS/docs/UX_FOUNDATION_V1.md` ← UX guidelines

**Specification Files (Attached to this message, save to `/home/ubuntu/armadaos-ui/directives/`):**
- `ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md` ← Primary reference
- `DESKTOP_SHELL_LIVING_DOD.md` ← Verification checklist
- `DESKTOP_SHELL_LIVING_ROADMAP.md` ← Build sequence
- `ATLAS_2_DESKTOP_SHELL_DIRECTIVE.md` ← Your marching orders

---

## DELIVERABLE

**A Desktop Shell that passes Shadow L3's 29-point verification checklist with 100% fidelity to the specification.**

When complete, the Desktop Shell will:
- Match the specification pixel-for-pixel
- Pass all 29 verification criteria
- Maintain 60 FPS during all animations
- Achieve 80%+ test coverage
- Score >90 on Lighthouse Performance, >95 on Accessibility

---

## COORDINATION

**COS-2 will coordinate your execution:**
- Populate batch files with component-specific details
- Manage Shadow L3 verification
- Answer questions and resolve ambiguities
- Report progress to Chairman

**When in doubt, ask COS-2. Do NOT improvise.**

---

## FIRST STEPS

1. **Save the 4 attached files** to `/home/ubuntu/armadaos-ui/directives/`
2. **Read `ATLAS_2_DESKTOP_SHELL_DIRECTIVE.md`** (your marching orders)
3. **Read Section 3.4 of the main specification** (Top Bar component)
4. **Begin building BATCH-100 (Top Bar)** in `/home/ubuntu/armadaos-ui/src/components/TopBar.tsx`
5. **Notify COS-2 when BATCH-100 is ready** for Shadow L3 verification

---

**This is generational work. Build it with precision.**

**100% to 100%. Always.**

- Chairman

---

**END OF MESSAGE**
