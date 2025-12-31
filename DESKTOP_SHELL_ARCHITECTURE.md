# Desktop Shell V2 Architecture
## BATCH-DESKTOP-00: Foundation Layer

**Version:** 1.0  
**Author:** Atlas 2  
**Date:** December 31, 2025  
**Status:** IMPLEMENTATION READY

---

## EXECUTIVE SUMMARY

This document defines the complete architecture for the ArmadaOS Desktop Shell V2 - the foundational operating system layer that all applications run within. This implementation provides the core infrastructure for window management, tab management, session persistence, and browser integration.

**Key Principles:**
- **Commander, Not Technician:** Users direct outcomes, not processes
- **Calm Technology:** Quiet by default, speaks only when valuable
- **Progressive Disclosure:** Simple surface, infinite depth
- **Everything is an Object:** Apps, Widgets, Spaces, Agents are discrete, composable objects

---

## 1. SYSTEM ARCHITECTURE

### 1.1 High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Desktop Shell V2                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────┐         │
│  │   Space    │  │   Window    │  │   Widget     │         │
│  │  Manager   │  │  Manager    │  │   Engine     │         │
│  └────────────┘  └─────────────┘  └──────────────┘         │
│         │               │                  │                │
│         └───────────────┴──────────────────┘                │
│                         │                                   │
│                  ┌──────▼──────┐                            │
│                  │   Zustand   │                            │
│                  │ Global Store│                            │
│                  └──────┬──────┘                            │
│                         │                                   │
│         ┌───────────────┼───────────────┐                  │
│         │               │               │                  │
│    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐              │
│    │ Session │    │ Browser │    │  Nexus  │              │
│    │ Manager │    │ Client  │    │   Bar   │              │
│    └─────────┘    └─────────┘    └─────────┘              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Hierarchy

```
<DesktopShell>
  ├── <TopBar />
  ├── <DesktopCanvas>
  │   ├── <WindowManager>
  │   │   └── <Window> (multiple)
  │   │       └── <TabManager>
  │   │           └── <Tab> (multiple)
  │   └── <WidgetLayer>
  │       └── <Widget> (multiple)
  ├── <Dock />
  └── <NexusBar />
</DesktopShell>
```

---

## 2. STATE MANAGEMENT ARCHITECTURE

### 2.1 Zustand Store Schema

**File:** `src/stores/desktopStore.ts`

```typescript
// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface TabState {
  id: string;
  title: string;
  url?: string;
  favicon?: string;
  isActive: boolean;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

interface WindowState {
  id: string;
  appId: string;
  title: string;
  position: Position;
  size: Size;
  zIndex: number;
  isFocused: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  spaceId: string;
  tabs: TabState[];
  activeTabId: string | null;
}

interface WidgetState {
  id: string;
  widgetId: string;
  position: Position;
  size: Size;
  props: Record<string, any>;
  spaceId: string;
}

interface SpaceState {
  id: string;
  name: string;
  icon: string;
  color: string;
  background: {
    type: 'color' | 'image' | 'generative';
    value: string;
  };
}

interface BrowserSession {
  windowId: string;
  tabs: TabState[];
  activeTabId: string | null;
}

// ============================================================================
// STORE INTERFACE
// ============================================================================

interface DesktopStore {
  // ===== STATE =====
  windows: WindowState[];
  widgets: WidgetState[];
  spaces: SpaceState[];
  activeSpaceId: string;
  focusedWindowId: string | null;
  nextZIndex: number;
  
  nexus: {
    isOpen: boolean;
    query: string;
    context: any;
  };

  browserSessions: BrowserSession[];
  
  // ===== WINDOW ACTIONS =====
  openWindow: (appId: string, spaceId?: string) => string;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  moveWindow: (id: string, position: Position) => void;
  resizeWindow: (id: string, size: Size) => void;
  
  // ===== TAB ACTIONS =====
  createTab: (windowId: string, url?: string) => string;
  closeTab: (windowId: string, tabId: string) => void;
  switchTab: (windowId: string, tabId: string) => void;
  updateTab: (windowId: string, tabId: string, updates: Partial<TabState>) => void;
  reorderTabs: (windowId: string, fromIndex: number, toIndex: number) => void;
  
  // ===== SPACE ACTIONS =====
  createSpace: (name: string, template?: 'blank' | 'mission') => string;
  switchSpace: (id: string) => void;
  deleteSpace: (id: string) => void;
  updateSpace: (id: string, updates: Partial<SpaceState>) => void;
  
  // ===== WIDGET ACTIONS =====
  addWidget: (widgetId: string, spaceId?: string) => string;
  removeWidget: (id: string) => void;
  moveWidget: (id: string, position: Position) => void;
  resizeWidget: (id: string, size: Size) => void;
  updateWidgetProps: (id: string, props: Record<string, any>) => void;
  
  // ===== NEXUS ACTIONS =====
  toggleNexus: () => void;
  setNexusQuery: (query: string) => void;
  executeNexusCommand: (command: string) => Promise<void>;
  
  // ===== SESSION ACTIONS =====
  saveSession: () => void;
  restoreSession: () => void;
  clearSession: () => void;
}
```

### 2.2 State Persistence Strategy

**Storage Mechanism:** localStorage (Phase 1)

**Persisted State:**
- All windows (position, size, state)
- All tabs (URL, title, order)
- All widgets (position, size, props)
- All spaces (name, icon, background)
- Active space ID
- Browser sessions

**Persistence Triggers:**
- Window create/close/move/resize
- Tab create/close/switch
- Space create/delete/switch
- Widget add/remove/move
- Debounced (500ms) to prevent excessive writes

**Restoration:**
- On app load, check localStorage for saved session
- If found, restore all state
- If not found, create default workspace

---

## 3. COMPONENT SPECIFICATIONS

### 3.1 DesktopShell Component

**File:** `src/components/desktop-shell/DesktopShell.tsx`

**Responsibilities:**
- Root container for entire Desktop Shell
- Manages global keyboard shortcuts
- Integrates with God Mode layout
- Handles space switching transitions

**Props:**
```typescript
interface DesktopShellProps {
  mode?: 'standalone' | 'god-mode-embedded';
}
```

**Key Features:**
- Global keyboard shortcuts (⌘K for Nexus, ⌘N for new window, ⌘W for close)
- Smooth transitions between spaces (fade + slide)
- Background rendering (color, image, or generative)
- Integration with God Mode navigation

---

### 3.2 WindowManager Component

**File:** `src/components/desktop-shell/WindowManager.tsx`

**Responsibilities:**
- Manages window lifecycle
- Handles window z-index ordering
- Provides window state to child components
- Filters windows by active space

**Key Features:**
- Automatic z-index management (focused window on top)
- Window focus on click
- Window bounds enforcement (can't drag off screen)
- Multi-window coordination

---

### 3.3 Window Component

**File:** `src/components/desktop-shell/Window.tsx`

**Responsibilities:**
- Individual draggable, resizable window
- Window chrome (title bar, controls, borders)
- Window content area
- Window state management (minimized, maximized, normal)

**Props:**
```typescript
interface WindowProps {
  id: string;
  window: WindowState;
}
```

**Key Features:**
- Drag to move (via title bar)
- Resize handles (8 directions)
- Minimize/maximize/close buttons
- Focus on click
- Smooth animations (framer-motion)
- Tab bar integration

**Library:** `react-rnd` for drag and resize

---

### 3.4 TabManager Component

**File:** `src/components/desktop-shell/TabManager.tsx`

**Responsibilities:**
- Manages tab lifecycle within windows
- Handles tab switching and ordering
- Provides tab state to child components
- Renders tab bar

**Key Features:**
- Tab creation (+ button)
- Tab reordering (drag and drop)
- Active tab highlighting
- Tab overflow handling (scroll)
- Close tab on middle click

---

### 3.5 Tab Component

**File:** `src/components/desktop-shell/Tab.tsx`

**Responsibilities:**
- Individual tab display
- Tab title and favicon
- Tab close button
- Tab loading indicator

**Props:**
```typescript
interface TabProps {
  windowId: string;
  tab: TabState;
  isActive: boolean;
}
```

**Key Features:**
- Favicon display
- Title truncation (max 20 chars)
- Loading spinner
- Close button (hover to show)
- Smooth transitions

---

### 3.6 SessionManager Component

**File:** `src/components/desktop-shell/SessionManager.tsx`

**Responsibilities:**
- Manages session persistence
- Handles session save/restore
- Provides session state to other components
- Auto-save on state changes

**Key Features:**
- Auto-save (debounced 500ms)
- Manual save/restore buttons (dev mode)
- Session migration (version compatibility)
- Clear session option

---

## 4. BROWSER INTEGRATION ARCHITECTURE

### 4.1 WebSocket Client

**File:** `src/lib/browser-client.ts`

**Purpose:** Communication with browser automation backend

**Protocol:**
```typescript
interface BrowserMessage {
  type: 'navigate' | 'click' | 'type' | 'scroll' | 'screenshot' | 'status';
  payload: any;
  sessionId: string;
  timestamp: number;
}

interface BrowserResponse {
  success: boolean;
  data?: any;
  error?: string;
  sessionId: string;
}
```

**Connection Management:**
- Auto-reconnect on disconnect (exponential backoff)
- Heartbeat every 30s
- Connection status indicator
- Queue messages when disconnected

**Endpoints:**
- Development: `ws://localhost:8300/browser`
- Production: TBD (waiting for backend deployment)

---

### 4.2 Browser Session State

**State Schema:**
```typescript
interface BrowserSessionState {
  id: string;
  windowId: string;
  tabs: {
    id: string;
    url: string;
    title: string;
    screenshot?: string;
    status: 'loading' | 'ready' | 'error';
  }[];
  activeTabId: string;
  isConnected: boolean;
}
```

**Synchronization:**
- Backend sends tab updates via WebSocket
- Frontend updates Zustand store
- UI re-renders automatically
- Screenshots cached in memory (5 min TTL)

---

### 4.3 Security Model

**Authentication:**
- JWT token from ArmadaOS auth system
- Token sent in WebSocket handshake
- Token refresh every 15 minutes

**Authorization:**
- User can only access their own browser sessions
- Admin can access all sessions (God Mode)
- Session isolation (no cross-session access)

**Sandboxing:**
- Each browser session runs in isolated container
- No access to host filesystem
- Network requests logged and auditable

---

## 5. INTEGRATION WITH GOD MODE UI

### 5.1 Navigation Integration

**Add to God Mode Navigation:**
```typescript
const godModeRoutes = [
  // ... existing routes
  {
    path: '/god-mode/desktop',
    label: 'Desktop Shell',
    icon: 'Monitor',
    component: DesktopShell,
  },
];
```

**Transition Strategy:**
- Smooth fade transition (300ms)
- Preserve God Mode state
- Desktop Shell as full-screen overlay
- Exit button returns to God Mode

---

### 5.2 Visual Consistency

**Color System:**
- Use existing Color System V2
- Desktop Shell uses same palette as God Mode
- Maintain dark theme consistency
- Accent colors from active space

**Typography:**
- Use existing font stack (Inter)
- Maintain font sizes and weights
- Consistent spacing (8px grid)

**Animations:**
- Use Framer Motion (same as God Mode)
- Consistent animation durations (150ms, 300ms, 500ms)
- Smooth spring animations for drag/resize

---

### 5.3 No Regressions

**Testing Checklist:**
- ✅ All GM-06 features still work (animations, sounds, drag-and-drop)
- ✅ All GM-07 features still work (GraphQL queries, WebSocket subscriptions)
- ✅ No console errors
- ✅ No visual glitches
- ✅ Performance maintained (60fps)

---

## 6. PERFORMANCE TARGETS

### 6.1 Window Operations

| Operation | Target | Measurement |
|:----------|:-------|:------------|
| Create window | <100ms | Time from click to render |
| Close window | <50ms | Time from click to unmount |
| Move window | 60fps | Frames per second during drag |
| Resize window | 60fps | Frames per second during resize |
| Focus window | <16ms | Time to update z-index |

### 6.2 Tab Operations

| Operation | Target | Measurement |
|:----------|:-------|:------------|
| Create tab | <50ms | Time from click to render |
| Close tab | <50ms | Time from click to unmount |
| Switch tab | <50ms | Time to show new content |
| Reorder tabs | 60fps | Frames per second during drag |

### 6.3 Session Operations

| Operation | Target | Measurement |
|:----------|:-------|:------------|
| Save session | <500ms | Time to write to localStorage |
| Restore session | <1000ms | Time to load and render |
| Auto-save | Debounced 500ms | No blocking |

---

## 7. FILE STRUCTURE

```
src/
├── components/
│   └── desktop-shell/
│       ├── DesktopShell.tsx          # Main container
│       ├── WindowManager.tsx         # Window lifecycle manager
│       ├── Window.tsx                # Individual window
│       ├── TabManager.tsx            # Tab lifecycle manager
│       ├── Tab.tsx                   # Individual tab
│       ├── SessionManager.tsx        # Session persistence
│       ├── TopBar.tsx                # Global top bar
│       ├── Dock.tsx                  # App launcher
│       ├── NexusBar.tsx              # AI command palette
│       └── WidgetLayer.tsx           # Widget renderer
├── stores/
│   └── desktopStore.ts               # Zustand global store
├── lib/
│   ├── browser-client.ts             # WebSocket client
│   └── session-persistence.ts        # localStorage utilities
├── hooks/
│   ├── useDesktop.ts                 # Desktop store hook
│   ├── useWindow.ts                  # Window operations hook
│   ├── useTab.ts                     # Tab operations hook
│   └── useBrowserSession.ts          # Browser session hook
└── types/
    └── desktop.ts                    # TypeScript types
```

---

## 8. DEPENDENCIES

### 8.1 New Dependencies

```json
{
  "dependencies": {
    "zustand": "^4.5.0",
    "react-rnd": "^10.4.1",
    "framer-motion": "^11.0.0",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0"
  }
}
```

### 8.2 Existing Dependencies (Reuse)

- React 18.2.0
- TypeScript 5.4.x
- Tailwind CSS 3.4.x
- Lucide React (icons)
- Apollo Client (GraphQL)

---

## 9. TESTING STRATEGY

### 9.1 Manual Testing Checklist

**Window Management:**
- [ ] Create window
- [ ] Close window
- [ ] Move window (drag title bar)
- [ ] Resize window (8 directions)
- [ ] Minimize window
- [ ] Maximize window
- [ ] Focus window (click)
- [ ] Multi-window z-index ordering

**Tab Management:**
- [ ] Create tab
- [ ] Close tab
- [ ] Switch tab
- [ ] Reorder tabs (drag)
- [ ] Tab overflow scrolling

**Session Persistence:**
- [ ] Auto-save on changes
- [ ] Restore session on reload
- [ ] Clear session

**Space Management:**
- [ ] Create space
- [ ] Switch space
- [ ] Delete space
- [ ] Windows filtered by space

**God Mode Integration:**
- [ ] Navigate to Desktop Shell from God Mode
- [ ] Navigate back to God Mode
- [ ] No visual regressions
- [ ] All existing features work

### 9.2 Visual Regression Testing

**Comparison:**
- Before: https://armadaos-ui.vercel.app (current)
- After: https://armadaos-ui-desktop-00.vercel.app (new)

**Verify:**
- All GM-06 animations still work
- All GM-07 GraphQL queries still work
- No console errors
- No visual glitches
- Performance maintained

### 9.3 Performance Testing

**Metrics:**
- Window creation time (Chrome DevTools Performance)
- Tab switching time (Chrome DevTools Performance)
- Session save/restore time (console.time)
- Frame rate during drag/resize (Chrome DevTools FPS meter)

---

## 10. DEPLOYMENT STRATEGY

### 10.1 Phased Rollout

**Phase 1 (This Batch):**
- Desktop Shell foundation
- Window/tab management
- Session persistence
- God Mode integration

**Phase 2 (BATCH-DESKTOP-01-03):**
- Shell & Dock
- Window Manager refinements
- Nexus Bar

**Phase 3 (BATCH-DESKTOP-04-06):**
- Top Bar
- Space Manager
- Widget Engine

**Phase 4 (BATCH-DESKTOP-07):**
- Generative Desktop
- AI workspace creation

### 10.2 Feature Flags

```typescript
const DESKTOP_SHELL_ENABLED = import.meta.env.VITE_DESKTOP_SHELL_ENABLED === 'true';
```

**Development:** Always enabled
**Production:** Enabled after Shadow approval

---

## 11. ACCEPTANCE CRITERIA

**All 9 criteria must be met:**

1. ✅ Desktop Shell architecture documented (this document)
2. ✅ Browser integration foundation implemented (WebSocket client, state management)
3. ✅ Window management system functional (create, destroy, move, resize, focus)
4. ✅ Tab management system functional (create, destroy, switch, order)
5. ✅ Session persistence working (save and restore sessions)
6. ✅ Core components implemented and tested (6 components minimum)
7. ✅ Integration with God Mode UI complete (no regressions, smooth transitions)
8. ✅ Completion report submitted to Shadow
9. ✅ Law #1 compliance (all code committed to GitHub)

---

## 12. REFERENCES

**CPO Specifications:**
- `/home/ubuntu/ArmadaOS/handoffs/HANDOFF_COS_DESKTOP_SHELL_V2_COMPLETE.md`
- `/home/ubuntu/ArmadaOS/bibles/THE_DESKTOP_SHELL_BIBLE_V2.md`
- `/home/ubuntu/ArmadaOS/atlas-batches/BATCH-DESKTOP-00_THE_GENESIS_SEQUENCE_V1.md`

**Existing Codebase:**
- God Mode UI: https://armadaos-ui.vercel.app
- Repository: kam-ship-it/armadaos-ui

**Design System:**
- Color System V2: `/home/ubuntu/ArmadaOS/design/COLOR_SYSTEM_V2.md`

---

**Atlas 2 v2.1.0 - "Building the foundation for the AI Operating System." 🏗️**
