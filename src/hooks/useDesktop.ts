// Custom Hooks for Desktop Shell
// BATCH-DESKTOP-00: Foundation Layer

import { useDesktopStore } from '../stores/desktopStore';

// Re-export the store hook for convenience
export { useDesktopStore };

// Hook for window operations
export function useWindow(windowId: string) {
  const window = useDesktopStore((state) => state.windows.find((w) => w.id === windowId));
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const minimizeWindow = useDesktopStore((state) => state.minimizeWindow);
  const maximizeWindow = useDesktopStore((state) => state.maximizeWindow);
  const restoreWindow = useDesktopStore((state) => state.restoreWindow);
  const moveWindow = useDesktopStore((state) => state.moveWindow);
  const resizeWindow = useDesktopStore((state) => state.resizeWindow);

  return {
    window,
    focusWindow: () => focusWindow(windowId),
    closeWindow: () => closeWindow(windowId),
    minimizeWindow: () => minimizeWindow(windowId),
    maximizeWindow: () => maximizeWindow(windowId),
    restoreWindow: () => restoreWindow(windowId),
    moveWindow,
    resizeWindow,
  };
}

// Hook for tab operations
export function useTab(windowId: string, tabId: string) {
  const tab = useDesktopStore((state) => {
    const window = state.windows.find((w) => w.id === windowId);
    return window?.tabs.find((t) => t.id === tabId);
  });

  const switchTab = useDesktopStore((state) => state.switchTab);
  const closeTab = useDesktopStore((state) => state.closeTab);
  const updateTab = useDesktopStore((state) => state.updateTab);

  return {
    tab,
    switchTab: () => switchTab(windowId, tabId),
    closeTab: () => closeTab(windowId, tabId),
    updateTab,
  };
}

// Hook for space operations
export function useSpace(spaceId: string) {
  const space = useDesktopStore((state) => state.spaces.find((s) => s.id === spaceId));
  const switchSpace = useDesktopStore((state) => state.switchSpace);
  const deleteSpace = useDesktopStore((state) => state.deleteSpace);
  const updateSpace = useDesktopStore((state) => state.updateSpace);

  return {
    space,
    switchSpace: () => switchSpace(spaceId),
    deleteSpace: () => deleteSpace(spaceId),
    updateSpace,
  };
}

// Hook for active space
export function useActiveSpace() {
  const activeSpaceId = useDesktopStore((state) => state.activeSpaceId);
  const space = useDesktopStore((state) => state.spaces.find((s) => s.id === activeSpaceId));
  const windows = useDesktopStore((state) =>
    state.windows.filter((w) => w.spaceId === activeSpaceId)
  );
  const widgets = useDesktopStore((state) =>
    state.widgets.filter((w) => w.spaceId === activeSpaceId)
  );

  return {
    space,
    windows,
    widgets,
  };
}

// Hook for Nexus
export function useNexus() {
  const nexus = useDesktopStore((state) => state.nexus);
  const toggleNexus = useDesktopStore((state) => state.toggleNexus);
  const setNexusQuery = useDesktopStore((state) => state.setNexusQuery);
  const executeNexusCommand = useDesktopStore((state) => state.executeNexusCommand);

  return {
    nexus,
    toggleNexus,
    setNexusQuery,
    executeNexusCommand,
  };
}
