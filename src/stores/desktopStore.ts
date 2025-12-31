// Desktop Shell Global Store (Zustand)
// BATCH-DESKTOP-00: Foundation Layer

import { create } from 'zustand';
import {
  WindowState,
  WidgetState,
  SpaceState,
  TabState,
  Position,
  Size,
  NexusState,
  BrowserSession,
} from '../types/desktop';

interface DesktopStore {
  // ===== STATE =====
  windows: WindowState[];
  widgets: WidgetState[];
  spaces: SpaceState[];
  activeSpaceId: string;
  focusedWindowId: string | null;
  nextZIndex: number;
  nexus: NexusState;
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

// Generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Default space
const DEFAULT_SPACE: SpaceState = {
  id: 'default-space',
  name: 'Command',
  icon: '⚡',
  color: '#3b82f6',
  background: {
    type: 'color',
    value: '#0f172a',
  },
};

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  // ===== INITIAL STATE =====
  windows: [],
  widgets: [],
  spaces: [DEFAULT_SPACE],
  activeSpaceId: DEFAULT_SPACE.id,
  focusedWindowId: null,
  nextZIndex: 100,
  nexus: {
    isOpen: false,
    query: '',
    context: null,
  },
  browserSessions: [],

  // ===== WINDOW ACTIONS =====
  openWindow: (appId: string, spaceId?: string) => {
    const id = generateId();
    const targetSpaceId = spaceId || get().activeSpaceId;
    const zIndex = get().nextZIndex;

    const newWindow: WindowState = {
      id,
      appId,
      title: appId,
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 },
      size: { width: 800, height: 600 },
      zIndex,
      isFocused: true,
      isMinimized: false,
      isMaximized: false,
      spaceId: targetSpaceId,
      tabs: [],
      activeTabId: null,
    };

    set((state) => ({
      windows: state.windows.map((w) => ({ ...w, isFocused: false })).concat(newWindow),
      focusedWindowId: id,
      nextZIndex: zIndex + 1,
    }));

    // Auto-save session
    setTimeout(() => get().saveSession(), 100);

    return id;
  },

  closeWindow: (id: string) => {
    set((state) => {
      const newWindows = state.windows.filter((w) => w.id !== id);
      const newFocusedId =
        state.focusedWindowId === id
          ? newWindows.length > 0
            ? newWindows[newWindows.length - 1].id
            : null
          : state.focusedWindowId;

      return {
        windows: newWindows,
        focusedWindowId: newFocusedId,
      };
    });

    setTimeout(() => get().saveSession(), 100);
  },

  focusWindow: (id: string) => {
    set((state) => {
      const zIndex = state.nextZIndex;
      return {
        windows: state.windows.map((w) =>
          w.id === id
            ? { ...w, isFocused: true, zIndex, isMinimized: false }
            : { ...w, isFocused: false }
        ),
        focusedWindowId: id,
        nextZIndex: zIndex + 1,
      };
    });
  },

  minimizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
      ),
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
    }));

    setTimeout(() => get().saveSession(), 100);
  },

  maximizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: true,
              position: { x: 0, y: 0 },
              size: { width: window.innerWidth, height: window.innerHeight - 60 },
            }
          : w
      ),
    }));

    setTimeout(() => get().saveSession(), 100);
  },

  restoreWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: false,
              position: { x: 100, y: 100 },
              size: { width: 800, height: 600 },
            }
          : w
      ),
    }));

    setTimeout(() => get().saveSession(), 100);
  },

  moveWindow: (id: string, position: Position) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    }));

    setTimeout(() => get().saveSession(), 500);
  },

  resizeWindow: (id: string, size: Size) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    }));

    setTimeout(() => get().saveSession(), 500);
  },

  // ===== TAB ACTIONS =====
  createTab: (windowId: string, url?: string) => {
    const tabId = generateId();
    const newTab: TabState = {
      id: tabId,
      title: url || 'New Tab',
      url,
      favicon: undefined,
      isActive: false,
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
    };

    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === windowId) {
          const tabs = w.tabs.map((t) => ({ ...t, isActive: false }));
          return {
            ...w,
            tabs: [...tabs, { ...newTab, isActive: true }],
            activeTabId: tabId,
          };
        }
        return w;
      }),
    }));

    setTimeout(() => get().saveSession(), 100);

    return tabId;
  },

  closeTab: (windowId: string, tabId: string) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === windowId) {
          const newTabs = w.tabs.filter((t) => t.id !== tabId);
          const newActiveTabId =
            w.activeTabId === tabId && newTabs.length > 0 ? newTabs[0].id : w.activeTabId;

          return {
            ...w,
            tabs: newTabs.map((t) => ({ ...t, isActive: t.id === newActiveTabId })),
            activeTabId: newActiveTabId,
          };
        }
        return w;
      }),
    }));

    setTimeout(() => get().saveSession(), 100);
  },

  switchTab: (windowId: string, tabId: string) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === windowId) {
          return {
            ...w,
            tabs: w.tabs.map((t) => ({ ...t, isActive: t.id === tabId })),
            activeTabId: tabId,
          };
        }
        return w;
      }),
    }));
  },

  updateTab: (windowId: string, tabId: string, updates: Partial<TabState>) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === windowId) {
          return {
            ...w,
            tabs: w.tabs.map((t) => (t.id === tabId ? { ...t, ...updates } : t)),
          };
        }
        return w;
      }),
    }));
  },

  reorderTabs: (windowId: string, fromIndex: number, toIndex: number) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id === windowId) {
          const tabs = [...w.tabs];
          const [removed] = tabs.splice(fromIndex, 1);
          tabs.splice(toIndex, 0, removed);
          return { ...w, tabs };
        }
        return w;
      }),
    }));

    setTimeout(() => get().saveSession(), 100);
  },

  // ===== SPACE ACTIONS =====
  createSpace: (name: string, template: 'blank' | 'mission' = 'blank') => {
    const id = generateId();
    const newSpace: SpaceState = {
      id,
      name,
      icon: template === 'mission' ? '🎯' : '📄',
      color: template === 'mission' ? '#10b981' : '#6366f1',
      background: {
        type: 'color',
        value: '#0f172a',
      },
    };

    set((state) => ({
      spaces: [...state.spaces, newSpace],
    }));

    setTimeout(() => get().saveSession(), 100);

    return id;
  },

  switchSpace: (id: string) => {
    set({ activeSpaceId: id });
    setTimeout(() => get().saveSession(), 100);
  },

  deleteSpace: (id: string) => {
    set((state) => {
      const newSpaces = state.spaces.filter((s) => s.id !== id);
      const newActiveSpaceId =
        state.activeSpaceId === id && newSpaces.length > 0 ? newSpaces[0].id : state.activeSpaceId;

      return {
        spaces: newSpaces,
        activeSpaceId: newActiveSpaceId,
        windows: state.windows.filter((w) => w.spaceId !== id),
        widgets: state.widgets.filter((w) => w.spaceId !== id),
      };
    });

    setTimeout(() => get().saveSession(), 100);
  },

  updateSpace: (id: string, updates: Partial<SpaceState>) => {
    set((state) => ({
      spaces: state.spaces.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));

    setTimeout(() => get().saveSession(), 100);
  },

  // ===== WIDGET ACTIONS =====
  addWidget: (widgetId: string, spaceId?: string) => {
    const id = generateId();
    const targetSpaceId = spaceId || get().activeSpaceId;

    const newWidget: WidgetState = {
      id,
      widgetId,
      position: { x: 50, y: 50 },
      size: { width: 300, height: 200 },
      props: {},
      spaceId: targetSpaceId,
    };

    set((state) => ({
      widgets: [...state.widgets, newWidget],
    }));

    setTimeout(() => get().saveSession(), 100);

    return id;
  },

  removeWidget: (id: string) => {
    set((state) => ({
      widgets: state.widgets.filter((w) => w.id !== id),
    }));

    setTimeout(() => get().saveSession(), 100);
  },

  moveWidget: (id: string, position: Position) => {
    set((state) => ({
      widgets: state.widgets.map((w) => (w.id === id ? { ...w, position } : w)),
    }));

    setTimeout(() => get().saveSession(), 500);
  },

  resizeWidget: (id: string, size: Size) => {
    set((state) => ({
      widgets: state.widgets.map((w) => (w.id === id ? { ...w, size } : w)),
    }));

    setTimeout(() => get().saveSession(), 500);
  },

  updateWidgetProps: (id: string, props: Record<string, any>) => {
    set((state) => ({
      widgets: state.widgets.map((w) => (w.id === id ? { ...w, props: { ...w.props, ...props } } : w)),
    }));

    setTimeout(() => get().saveSession(), 100);
  },

  // ===== NEXUS ACTIONS =====
  toggleNexus: () => {
    set((state) => ({
      nexus: { ...state.nexus, isOpen: !state.nexus.isOpen },
    }));
  },

  setNexusQuery: (query: string) => {
    set((state) => ({
      nexus: { ...state.nexus, query },
    }));
  },

  executeNexusCommand: async (command: string) => {
    // Mock implementation - will be replaced with real Nexus API
    console.log('Executing Nexus command:', command);

    // Example: "open browser" command
    if (command.toLowerCase().includes('open browser')) {
      get().openWindow('browser');
    }

    // Example: "create space" command
    if (command.toLowerCase().includes('create space')) {
      const name = command.replace(/create space/i, '').trim() || 'New Space';
      get().createSpace(name, 'mission');
    }

    set((state) => ({
      nexus: { ...state.nexus, isOpen: false, query: '' },
    }));
  },

  // ===== SESSION ACTIONS =====
  saveSession: () => {
    const state = get();
    const session = {
      version: '1.0',
      timestamp: Date.now(),
      windows: state.windows,
      widgets: state.widgets,
      spaces: state.spaces,
      activeSpaceId: state.activeSpaceId,
    };

    try {
      localStorage.setItem('armadaos-desktop-session', JSON.stringify(session));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  },

  restoreSession: () => {
    try {
      const saved = localStorage.getItem('armadaos-desktop-session');
      if (!saved) return;

      const session = JSON.parse(saved);

      // Version check
      if (session.version !== '1.0') {
        console.warn('Session version mismatch, skipping restore');
        return;
      }

      set({
        windows: session.windows || [],
        widgets: session.widgets || [],
        spaces: session.spaces || [DEFAULT_SPACE],
        activeSpaceId: session.activeSpaceId || DEFAULT_SPACE.id,
      });

      console.log('Session restored successfully');
    } catch (error) {
      console.error('Failed to restore session:', error);
    }
  },

  clearSession: () => {
    try {
      localStorage.removeItem('armadaos-desktop-session');
      set({
        windows: [],
        widgets: [],
        spaces: [DEFAULT_SPACE],
        activeSpaceId: DEFAULT_SPACE.id,
        focusedWindowId: null,
      });
      console.log('Session cleared');
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  },
}));
