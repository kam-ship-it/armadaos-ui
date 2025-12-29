# DEPLOYMENT PROTOCOL

**Status:** Active
**Platform:** Vercel
**Type:** Static Frontend (SPA)

---

## 1. OVERVIEW
The God Mode Console (`armadaos-ui`) is deployed to Vercel as a static Single Page Application (SPA).
This ensures the Chairman and stakeholders can visually verify UI changes instantly via a permanent, production-grade URL.

## 2. DEPLOYMENT METHODS

### A. Automatic (Recommended)
*Requires GitHub Integration*
1. Push changes to `main` branch.
2. Vercel automatically builds and deploys.
3. URL is updated instantly.

### B. Manual (CLI)
*For sandbox/local environments*
1. Run `vercel deploy --prod`
2. Authenticate via browser.
3. Confirm project settings.

## 3. CONFIGURATION
- **Framework:** Vite
- **Build Command:** `vite build`
- **Output Directory:** `dist`
- **Install Command:** `pnpm install`

## 4. VERIFICATION
After deployment, verify:
1. **Boot Sequence:** Loads correctly.
2. **Routing:** Direct links (e.g., `/god-mode/architecture`) work.
3. **Assets:** Images and fonts load without 404s.

---

**Current Production URL:** [Pending Final Output]
