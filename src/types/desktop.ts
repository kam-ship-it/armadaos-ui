// Desktop Shell Type Definitions
// BATCH-DESKTOP-00: Foundation Layer

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface TabState {
  id: string;
  title: string;
  url?: string;
  favicon?: string;
  isActive: boolean;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface WindowState {
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

export interface WidgetState {
  id: string;
  widgetId: string;
  position: Position;
  size: Size;
  props: Record<string, any>;
  spaceId: string;
}

export interface SpaceState {
  id: string;
  name: string;
  icon: string;
  color: string;
  background: {
    type: 'color' | 'image' | 'generative';
    value: string;
  };
}

export interface BrowserSession {
  id: string;
  windowId: string;
  tabs: TabState[];
  activeTabId: string | null;
  isConnected: boolean;
}

export interface NexusState {
  isOpen: boolean;
  query: string;
  context: any;
}

// Browser WebSocket Messages
export interface BrowserMessage {
  type: 'navigate' | 'click' | 'type' | 'scroll' | 'screenshot' | 'status';
  payload: any;
  sessionId: string;
  timestamp: number;
}

export interface BrowserResponse {
  success: boolean;
  data?: any;
  error?: string;
  sessionId: string;
}

// Session Persistence
export interface PersistedSession {
  version: string;
  timestamp: number;
  windows: WindowState[];
  widgets: WidgetState[];
  spaces: SpaceState[];
  activeSpaceId: string;
}
