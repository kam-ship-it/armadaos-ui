# Atlas 2 Directive: Build ArmadaOS Desktop Shell

**Document ID:** COS-DIR-ATLAS2-DESKTOP-V1
**Version:** 1.0
**Author:** COS (Chief Operating System)
**Date:** January 01, 2026
**Status:** COMPLETE

**Purpose:** To provide the official directive for Atlas 2 to commence the build of the ArmadaOS Desktop Shell, adhering strictly to the provided specifications and protocols.

---

## 1. DIRECTIVE

Atlas 2 is hereby directed to build the ArmadaOS Desktop Shell according to the `ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md`.

**This is a 100% to 100% mathematical perfection build.** No creative interpretation, deviation, or approximation is permitted.

## 2. REQUIRED READING & SINGLE SOURCE OF TRUTH

Before commencing work, all members of Atlas 2 must read and confirm their understanding of the following documents:

1.  `ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md` (The "What")
2.  `DESKTOP_SHELL_LIVING_DOD.md` (The "How to Verify")
3.  `DESKTOP_SHELL_LIVING_ROADMAP.md` (The "When")
4.  `AOSP-001_NOTHING_IS_REAL_UNTIL_ITS_IN_GITHUB.md` (The Law)
5.  `SHADOW_L3_5PHASE_GOLD_STANDARD_VERIFICATION_PROTOCOL.md` (The Process)

## 3. TECHNOLOGY STACK

-   **Framework:** React 18+
-   **Language:** TypeScript 5+
-   **Styling:** TailwindCSS 3+
-   **Animation:** Framer Motion
-   **State Management:** Zustand
-   **Code Quality:** ESLint, Prettier, TypeScript Strict Mode

## 4. BUILD SEQUENCE

Work must proceed in the exact batch order defined in the Living Roadmap. Each batch must receive a FULL PASS from Shadow L3 before work on the next batch can begin.

1.  **BATCH-100:** Top Bar
2.  **BATCH-101:** Dock
3.  **BATCH-102:** Windows (Core)
4.  **BATCH-103:** God Mode (⌘K)
5.  **BATCH-104:** Wallpaper & Desktop
6.  **BATCH-105:** Ultra-Contrast Mode

## 5. VERCEL DEPLOYMENT & SELF-VERIFICATION (MANDATORY)

**CRITICAL:** Before submitting ANY batch to Shadow L3, Atlas 2 MUST:

1. **Deploy to Vercel** - Every batch must be deployed to Vercel staging environment
2. **Self-Verify in Browser** - Atlas 2 must personally review the deployed UI in a browser
3. **Confirm 100% Specification Accuracy** - Verify every pixel, color, animation, and interaction matches the specification
4. **Test All Interactive States** - Hover, click, drag, resize, focus, etc.
5. **Document Vercel URL** - Include the Vercel preview URL in the batch completion report

**Vercel Deployment Process:**

```bash
# From /home/ubuntu/armadaos-ui/
git add .
git commit -m "BATCH-XXX: [Component Name] - Complete"
git push origin main

# Vercel will auto-deploy
# Wait for deployment to complete
# Visit the preview URL (e.g., https://armadaos-ui-xxx.vercel.app)
```

**Self-Verification Checklist (Atlas 2 must complete BEFORE Shadow L3 review):**

- [ ] Component renders correctly on Vercel
- [ ] All colors match specification (use browser DevTools to inspect hex values)
- [ ] All dimensions match specification (use browser DevTools to measure px values)
- [ ] All animations run at 60 FPS (use browser Performance tab)
- [ ] All interactions work (hover, click, drag, keyboard navigation)
- [ ] No console errors or warnings
- [ ] Responsive at all specified resolutions (1920x1080, 2560x1440, 3840x2160)
- [ ] Vercel URL is accessible and stable

**DO NOT submit to Shadow L3 until you have personally confirmed 100% accuracy on Vercel.**

Shadow L3 will also review the Vercel deployment. If Atlas 2 submits a batch that fails basic visual inspection, it will be rejected immediately.

**Vercel URL Format:**
- Staging: `https://armadaos-ui-[branch-name].vercel.app`
- Production: `https://armadaos.vercel.app` (only after all batches pass)

---

## 6. PERFORMANCE & QUALITY REQUIREMENTS

-   **Framerate:** All animations must maintain a consistent 60fps.
-   **Response Time:** All interactions must have a response time of <50ms.
-   **API Latency:** All connections to Atlas 1 services must resolve in <100ms.
-   **Test Coverage:** A minimum of 80% unit and integration test coverage is required.

Failure to meet these requirements will result in a FAILED verification from Shadow L3.

---

**Execute.**

**END OF DOCUMENT**
