# BATCH-GM-00: PROJECT FOUNDATION

**Batch ID:** BATCH-GM-00
**Title:** Project Foundation - armadaos-ui Repository Setup
**Assigned To:** Atlas 2 (UX/UI)
**Priority:** P0 - CRITICAL BLOCKER
**Status:** 🔴 EXECUTE IMMEDIATELY
**Created:** December 28, 2025
**Author:** COS v1.1

---

## ⚠️ CRITICAL: DO NOT USE MANUS WEBDEV

**YOU MUST USE THE GITHUB REPOSITORY.**

```bash
gh repo clone kam-ship-it/armadaos-ui
cd armadaos-ui
```

**DO NOT** use `webdev_init_project` or any Manus scaffolding tools.

**WHY:** The `armadaos-ui` repository is the official ArmadaOS frontend. It already has:
- Directory structure
- API contract (`docs/ARMADAOS_API_CONTRACT_V1.yaml`)
- Batch specifications
- README with architecture

**Your job is to initialize the project INSIDE this existing repository.**

---

## EXECUTIVE SUMMARY

This batch initializes the `armadaos-ui` GitHub repository as a fully functional React/TypeScript/Tailwind project. This is the foundation that all subsequent God Mode batches build upon.

**Estimated Hours:** 8-12
**Dependencies:** None (this is the first batch)
**Blocks:** ALL other GM batches (GM-01 through GM-06)

---

## ACCEPTANCE CRITERIA

| ID | Criterion | Verification |
|:---|:----------|:-------------|
| AC-01 | Project initializes with `pnpm install` | Command succeeds |
| AC-02 | Dev server starts with `pnpm dev` | localhost:5173 loads |
| AC-03 | TypeScript compiles with zero errors | `pnpm build` succeeds |
| AC-04 | Tailwind styles apply correctly | Visual inspection |
| AC-05 | React Router navigates between routes | Interaction test |
| AC-06 | API client types generated from OpenAPI | Types exist in `src/api/` |
| AC-07 | MSW mocks intercept API calls in dev | Console shows mock responses |
| AC-08 | **MSW handlers cover ALL 23 God Mode endpoints** | All endpoints return realistic mock data |
| AC-09 | Base layout renders | Visual inspection |
| AC-10 | All changes committed to GitHub | `git log` shows commits |

---

## STEP-BY-STEP EXECUTION

### Step 1: Clone the Repository

```bash
gh repo clone kam-ship-it/armadaos-ui
cd armadaos-ui
```

### Step 2: Initialize Vite + React + TypeScript

```bash
# Initialize package.json
pnpm init

# Install core dependencies
pnpm add react react-dom react-router-dom @tanstack/react-query
pnpm add -D vite @vitejs/plugin-react typescript @types/react @types/react-dom

# Install Tailwind
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional tools
pnpm add -D @tanstack/react-query-devtools
pnpm add react-hotkeys-hook  # For keyboard shortcuts
pnpm add clsx tailwind-merge  # For className utilities
```

### Step 3: Create Configuration Files

#### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/v1': {
        target: process.env.VITE_API_URL || 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

#### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ArmadaOS Design Tokens
        'armada': {
          'bg': '#0A0A0A',
          'surface': '#111111',
          'border': '#1F1F1F',
          'text': '#FFFFFF',
          'text-muted': '#A0A0A0',
          'purple': {
            DEFAULT: '#8B5CF6',
            'light': '#A78BFA',
            'dark': '#7C3AED',
          },
          'green': '#22C55E',
          'yellow': '#EAB308',
          'red': '#EF4444',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

#### `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### `.env.example`

```env
# API Configuration
VITE_API_URL=http://localhost:8080

# Feature Flags
VITE_ENABLE_MOCKS=true
```

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ArmadaOS - God Mode</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  </head>
  <body class="bg-armada-bg text-armada-text">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Step 4: Create Source Files

#### `src/main.tsx`

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';

// Initialize MSW in development
async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'true') {
    return;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
});
```

#### `src/App.tsx`

```typescript
import { Routes, Route, Navigate } from 'react-router-dom';
import { GodModeLayout } from './components/layouts/GodModeLayout';

function App() {
  return (
    <Routes>
      {/* Redirect root to God Mode */}
      <Route path="/" element={<Navigate to="/god-mode" replace />} />
      
      {/* God Mode Routes */}
      <Route path="/god-mode" element={<GodModeLayout />}>
        <Route index element={<Navigate to="architecture" replace />} />
        <Route path="architecture" element={<div>Architecture Lens (GM-02)</div>} />
        <Route path="constitution" element={<div>Constitution Lens (GM-03)</div>} />
        <Route path="battlefield" element={<div>Battlefield Lens (GM-04)</div>} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
```

#### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  height: 100%;
  width: 100%;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #111111;
}

::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #444444;
}
```

#### `src/components/layouts/GodModeLayout.tsx`

```typescript
import { Outlet } from 'react-router-dom';

export function GodModeLayout() {
  return (
    <div className="h-screen w-screen flex flex-col bg-armada-bg">
      {/* Pulse Bar - Placeholder for GM-01 */}
      <div className="h-12 bg-armada-surface border-b border-armada-border flex items-center px-4">
        <span className="text-armada-purple font-semibold">ARMADA</span>
        <span className="text-armada-text-muted ml-2">GOD MODE</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-armada-green animate-pulse" />
          <span className="text-sm text-armada-text-muted">System Healthy</span>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Nav - Placeholder for GM-01 */}
        <div className="w-16 bg-armada-surface border-r border-armada-border flex flex-col items-center py-4 gap-4">
          <div className="w-10 h-10 rounded bg-armada-purple/20 flex items-center justify-center text-armada-purple">
            1
          </div>
          <div className="w-10 h-10 rounded bg-armada-border flex items-center justify-center text-armada-text-muted">
            2
          </div>
          <div className="w-10 h-10 rounded bg-armada-border flex items-center justify-center text-armada-text-muted">
            3
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
        
        {/* Nexus Panel - Placeholder for GM-05 */}
        <div className="w-80 bg-armada-surface border-l border-armada-border p-4">
          <div className="text-armada-purple font-semibold mb-4">NEXUS</div>
          <div className="text-armada-text-muted text-sm">
            AI co-pilot ready. (GM-05)
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Step 5: Set Up MSW (Mock Service Worker)

```bash
pnpm add -D msw
npx msw init public/ --save
```

#### `src/mocks/handlers.ts`

**CRITICAL: This file must include handlers for ALL 23 God Mode endpoints.**

Refer to `docs/ARMADAOS_API_CONTRACT_V1.yaml` for the complete endpoint list.

```typescript
import { http, HttpResponse } from 'msw';

// Mock data generators
const mockTimestamp = () => new Date().toISOString();
const mockId = () => Math.random().toString(36).substring(7);

export const handlers = [
  // ============================================
  // GLOBAL / PULSE ENDPOINTS (5)
  // ============================================
  
  // 1. System Status
  http.get('/v1/god/status', () => {
    return HttpResponse.json({
      status: 'healthy',
      uptime: 86400,
      version: '1.0.0',
      components: { total: 42, healthy: 40, warning: 2, critical: 0 },
      treasury: { arc_balance: 1000000, burn_rate: 150 },
      open_loops: 7,
    });
  }),

  // 2. System Alerts
  http.get('/v1/god/alerts', () => {
    return HttpResponse.json({
      alerts: [
        { id: '1', severity: 'warning', message: 'High memory usage on validator', timestamp: mockTimestamp() },
        { id: '2', severity: 'info', message: 'Scheduled maintenance in 2 hours', timestamp: mockTimestamp() },
      ],
    });
  }),

  // 3. Kill Switch (Pause)
  http.post('/v1/god/pause', () => {
    return HttpResponse.json({ success: true, message: 'System paused' });
  }),

  // 4. Resume
  http.post('/v1/god/resume', () => {
    return HttpResponse.json({ success: true, message: 'System resumed' });
  }),

  // 5. Treasury
  http.get('/v1/god/treasury', () => {
    return HttpResponse.json({
      arc_balance: 1000000,
      burn_rate: 150,
      transactions: [
        { id: '1', type: 'burn', amount: 50, reason: 'Agent execution', timestamp: mockTimestamp() },
      ],
    });
  }),

  // ============================================
  // ARCHITECTURE LENS ENDPOINTS (7)
  // ============================================
  
  // 6. Components List
  http.get('/v1/god/components', () => {
    return HttpResponse.json({
      components: [
        { id: 'the-one-gateway', name: 'The One Gateway', status: 'healthy', tier: 'core_substrate', metrics: { cpu: 45, memory: 62 } },
        { id: 'event-store', name: 'Event Store', status: 'healthy', tier: 'core_substrate', metrics: { cpu: 30, memory: 55 } },
        { id: 'validator', name: 'Validator', status: 'warning', tier: 'core_substrate', metrics: { cpu: 78, memory: 80 } },
        { id: 'context-engine', name: 'Context Engine', status: 'healthy', tier: 'intelligence_layer', metrics: { cpu: 40, memory: 50 } },
        { id: 'cos-agent', name: 'COS Agent', status: 'healthy', tier: 'agent_collective', metrics: { cpu: 25, memory: 40 } },
      ],
    });
  }),

  // 7. Component Detail
  http.get('/v1/god/components/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: `Component ${params.id}`,
      status: 'healthy',
      tier: 'core_substrate',
      description: 'Mock component description',
      metrics: { cpu: 45, memory: 62, requests_per_sec: 150 },
      logs: [
        { level: 'info', message: 'Component started', timestamp: mockTimestamp() },
        { level: 'info', message: 'Health check passed', timestamp: mockTimestamp() },
      ],
      actions: ['restart', 'scale', 'view_logs'],
    });
  }),

  // 8. Component Metrics
  http.get('/v1/god/components/:id/metrics', ({ params }) => {
    return HttpResponse.json({
      component_id: params.id,
      timerange: '1h',
      data: [
        { timestamp: mockTimestamp(), cpu: 45, memory: 62 },
        { timestamp: mockTimestamp(), cpu: 48, memory: 65 },
      ],
    });
  }),

  // 9. Component Logs
  http.get('/v1/god/components/:id/logs', ({ params }) => {
    return HttpResponse.json({
      component_id: params.id,
      logs: [
        { level: 'info', message: 'Request processed', timestamp: mockTimestamp() },
        { level: 'warn', message: 'High latency detected', timestamp: mockTimestamp() },
      ],
    });
  }),

  // 10. Component Actions
  http.post('/v1/god/components/:id/action', async ({ params, request }) => {
    const body = await request.json() as { action: string };
    return HttpResponse.json({
      success: true,
      component_id: params.id,
      action: body.action,
      message: `Action ${body.action} executed successfully`,
    });
  }),

  // 11. Tiers List
  http.get('/v1/god/tiers', () => {
    return HttpResponse.json({
      tiers: [
        { id: 'core_substrate', name: 'Core Substrate', component_count: 12, health: 'healthy' },
        { id: 'intelligence_layer', name: 'Intelligence Layer', component_count: 8, health: 'healthy' },
        { id: 'agent_collective', name: 'Agent Collective', component_count: 15, health: 'warning' },
        { id: 'interface_layer', name: 'Interface Layer', component_count: 7, health: 'healthy' },
      ],
    });
  }),

  // 12. Tier Detail
  http.get('/v1/god/tiers/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: `Tier ${params.id}`,
      components: [
        { id: 'comp-1', name: 'Component 1', status: 'healthy' },
        { id: 'comp-2', name: 'Component 2', status: 'healthy' },
      ],
    });
  }),

  // ============================================
  // CONSTITUTION LENS ENDPOINTS (5)
  // ============================================
  
  // 13. Events Timeline
  http.get('/v1/events', ({ request }) => {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    return HttpResponse.json({
      events: [
        { id: mockId(), type: 'decision', component: 'cos-agent', description: 'Batch approved', timestamp: mockTimestamp(), agent: 'COS' },
        { id: mockId(), type: 'execution', component: 'atlas-agent', description: 'Code deployed', timestamp: mockTimestamp(), agent: 'Atlas' },
        { id: mockId(), type: 'validation', component: 'validator', description: 'Constitution check passed', timestamp: mockTimestamp(), agent: 'Validator' },
      ],
      cursor: cursor ? null : 'next-page-token',
      hasMore: !cursor,
    });
  }),

  // 14. Event Detail
  http.get('/v1/events/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      type: 'decision',
      component: 'cos-agent',
      description: 'Batch GM-01 approved for execution',
      timestamp: mockTimestamp(),
      agent: 'COS',
      causal_chain: [
        { event_id: 'prev-1', description: 'Chairman requested batch execution' },
        { event_id: 'prev-2', description: 'Shadow L3 verification completed' },
      ],
      metadata: { batch_id: 'GM-01', approval_type: 'standard' },
    });
  }),

  // 15. Constitution Text
  http.get('/v1/constitution', () => {
    return HttpResponse.json({
      version: '1.0',
      articles: [
        { id: 'article-1', title: 'The First Law', content: 'Nothing is real until it is in GitHub.' },
        { id: 'article-2', title: 'The Chain of Command', content: 'Chairman > Shadow > COS > Agents' },
      ],
    });
  }),

  // 16. Constitution Article
  http.get('/v1/constitution/:article', ({ params }) => {
    return HttpResponse.json({
      id: params.article,
      title: `Article ${params.article}`,
      content: 'Full article content here...',
      amendments: [],
    });
  }),

  // 17. Approvals Queue
  http.get('/v1/god/approvals', () => {
    return HttpResponse.json({
      approvals: [
        { id: 'apr-1', type: 'batch', title: 'BATCH-GM-02 Execution', requester: 'Atlas', status: 'pending', timestamp: mockTimestamp() },
        { id: 'apr-2', type: 'spend', title: 'ARC Burn Request', requester: 'COS', status: 'pending', timestamp: mockTimestamp() },
      ],
    });
  }),

  // ============================================
  // BATTLEFIELD LENS ENDPOINTS (5)
  // ============================================
  
  // 18. Batches List
  http.get('/v1/god/batches', () => {
    return HttpResponse.json({
      batches: [
        { id: 'GM-00', title: 'Project Foundation', status: 'in_progress', progress: 60, assignee: 'Atlas 2' },
        { id: 'GM-01', title: 'UI Shell', status: 'queued', progress: 0, assignee: 'Atlas 2' },
        { id: 'GM-02', title: 'Architecture Lens', status: 'queued', progress: 0, assignee: 'Atlas 2' },
      ],
    });
  }),

  // 19. Batch Detail
  http.get('/v1/god/batches/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      title: `Batch ${params.id}`,
      status: 'in_progress',
      progress: 60,
      assignee: 'Atlas 2',
      acceptance_criteria: [
        { id: 'ac-1', description: 'Project initializes', status: 'complete' },
        { id: 'ac-2', description: 'Dev server starts', status: 'complete' },
        { id: 'ac-3', description: 'TypeScript compiles', status: 'in_progress' },
      ],
      blockers: [],
      pre_mortem: 'Risk: Complex MSW setup may cause delays',
    });
  }),

  // 20. Agents List
  http.get('/v1/god/agents', () => {
    return HttpResponse.json({
      agents: [
        { id: 'cos', name: 'COS', status: 'active', current_task: 'Coordinating Atlas 2', metrics: { tasks_completed: 47 } },
        { id: 'atlas-1', name: 'Atlas 1', status: 'active', current_task: 'Backend development', metrics: { tasks_completed: 23 } },
        { id: 'atlas-2', name: 'Atlas 2', status: 'active', current_task: 'GM-00 execution', metrics: { tasks_completed: 5 } },
        { id: 'shadow', name: 'Shadow', status: 'active', current_task: 'L3 verification', metrics: { tasks_completed: 31 } },
      ],
    });
  }),

  // 21. Agent Detail
  http.get('/v1/god/agents/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: `Agent ${params.id}`,
      status: 'active',
      current_task: 'Executing assigned batch',
      metrics: { tasks_completed: 47, success_rate: 0.98 },
      recent_activity: [
        { action: 'Completed task', timestamp: mockTimestamp() },
        { action: 'Started new batch', timestamp: mockTimestamp() },
      ],
    });
  }),

  // 22. Threats Feed
  http.get('/v1/god/threats', () => {
    return HttpResponse.json({
      threats: [
        { id: 't-1', severity: 'medium', source: 'drift-monitor', description: 'Configuration drift detected in staging', timestamp: mockTimestamp() },
        { id: 't-2', severity: 'low', source: 'red-team-agent', description: 'Potential security improvement identified', timestamp: mockTimestamp() },
      ],
    });
  }),

  // ============================================
  // NEXUS ENDPOINT (1)
  // ============================================
  
  // 23. Nexus Query
  http.post('/v1/nexus/query', async ({ request }) => {
    const body = await request.json() as { message: string; context?: string };
    return HttpResponse.json({
      response: `I understand you're asking about: "${body.message}". Based on the current system state, here's my analysis...`,
      suggestions: [
        'Would you like me to explain the component architecture?',
        'Should I show you the recent events related to this?',
      ],
      context_used: body.context || 'general',
    });
  }),
];
```

#### `src/mocks/browser.ts`

```typescript
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

### Step 6: Generate API Types from OpenAPI

```bash
pnpm add -D openapi-typescript
npx openapi-typescript docs/ARMADAOS_API_CONTRACT_V1.yaml -o src/api/types.ts
```

#### `src/api/client.ts`

```typescript
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
```

### Step 7: Update package.json Scripts

```json
{
  "name": "armadaos-ui",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "typecheck": "tsc --noEmit",
    "generate:api": "openapi-typescript docs/ARMADAOS_API_CONTRACT_V1.yaml -o src/api/types.ts"
  }
}
```

### Step 8: Create .gitignore

```gitignore
# Dependencies
node_modules/

# Build
dist/
build/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# MSW
public/mockServiceWorker.js
```

### Step 9: Commit to GitHub

```bash
git add -A
git commit -m "BATCH-GM-00: Project Foundation - Vite + React + TypeScript + Tailwind

INFRASTRUCTURE:
- Vite build system configured
- TypeScript strict mode enabled
- TailwindCSS with ArmadaOS design tokens
- React Router with God Mode routes
- React Query for data fetching
- MSW for API mocking in development

DESIGN TOKENS:
- Colors: armada-bg, armada-surface, armada-purple, etc.
- Fonts: Inter (sans), JetBrains Mono (mono)
- Animations: pulse-slow, fade-in

API INTEGRATION:
- Types auto-generated from OpenAPI contract
- API client with error handling
- MSW handlers for all God Mode endpoints

READY FOR:
- BATCH-GM-01: UI Shell & Global Elements"

git push
```

---

## FINAL DIRECTORY STRUCTURE

After completion, the repository should look like:

```
armadaos-ui/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   ├── favicon.svg
│   └── mockServiceWorker.js
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   └── types.ts (auto-generated)
│   ├── components/
│   │   └── layouts/
│   │       └── GodModeLayout.tsx
│   ├── mocks/
│   │   ├── browser.ts
│   │   └── handlers.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── docs/
│   └── ARMADAOS_API_CONTRACT_V1.yaml
├── batches/
│   └── (existing batch files)
└── README.md
```

---

## VERIFICATION CHECKLIST

Before marking complete:

- [ ] `pnpm install` succeeds
- [ ] `pnpm dev` starts dev server on localhost:5173
- [ ] `pnpm build` compiles with zero errors
- [ ] Browser shows God Mode layout with placeholders
- [ ] Tailwind styles apply (dark background, purple accents)
- [ ] React Router navigation works (click lens icons)
- [ ] MSW intercepts API calls (check browser console)
- [ ] API types exist in `src/api/types.ts`
- [ ] All changes committed and pushed to GitHub

---

## SHADOW L3 GATE

This batch establishes the foundation. Shadow L3 verification confirms:

1. Project structure follows ArmadaOS conventions
2. Design tokens match brand guidelines
3. API integration pattern is correct
4. MSW mocking enables independent development
5. TypeScript strict mode enforced

---

## WHAT THIS ENABLES

After GM-00 is complete, Atlas 2 can:

| Batch | What They Can Do |
|:------|:-----------------|
| GM-01 | Replace placeholder layout with real components |
| GM-02 | Add Architecture Lens components |
| GM-03 | Add Constitution Lens components |
| GM-04 | Add Battlefield Lens components |
| GM-05 | Add Nexus integration and onboarding |
| GM-06 | Add tests |

**All subsequent batches build on this foundation.**

---

*BATCH-GM-00 - Project Foundation*
*Atlas 2 - Execute FIRST before any other GM batch*
*DO NOT USE MANUS WEBDEV - USE GITHUB REPO*
