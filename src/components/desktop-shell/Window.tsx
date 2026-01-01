// Desktop Shell Window Component
// BATCH-DESKTOP-00: Foundation Layer

import React from 'react';
import { Rnd } from 'react-rnd';
import { Minus, Maximize2, Minimize2, X } from 'lucide-react';
import { WindowState } from '../../types/desktop';
import { useDesktopStore } from '../../stores/desktopStore';
import { TabManager } from './TabManager';

interface WindowProps {
  window: WindowState;
}

export const Window: React.FC<WindowProps> = ({ window }) => {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    moveWindow,
    resizeWindow,
  } = useDesktopStore();

  // Don't render minimized windows
  if (window.isMinimized) {
    return null;
  }

  const handleDragStop = (_e: any, d: any) => {
    moveWindow(window.id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (
    _e: any,
    _direction: any,
    ref: any,
    _delta: any,
    position: any
  ) => {
    resizeWindow(window.id, {
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
    moveWindow(window.id, position);
  };

  const handleMaximize = () => {
    if (window.isMaximized) {
      restoreWindow(window.id);
    } else {
      maximizeWindow(window.id);
    }
  };

  return (
    <Rnd
      size={{ width: window.size.width, height: window.size.height }}
      position={{ x: window.position.x, y: window.position.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{
        zIndex: window.zIndex,
      }}
      disableDragging={window.isMaximized}
      enableResizing={!window.isMaximized}
    >
      <div
        className="flex flex-col h-full overflow-hidden"
        style={{
          background: 'rgba(28, 28, 31, 0.7)',
          backdropFilter: 'blur(12px)',
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
        onClick={() => !window.isFocused && focusWindow(window.id)}
      >
        {/* Title Bar */}
        <div className="window-drag-handle flex items-center justify-between px-4 py-2 cursor-move" style={{ background: 'rgba(18, 18, 20, 0.5)', borderBottom: 'none' }}>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm font-medium truncate" style={{ color: '#F5F5F7' }}>
              {window.title}
            </span>
          </div>

          {/* Window Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(window.id);
              }}
              className="p-1.5 hover:bg-slate-700 rounded transition-colors"
              title="Minimize"
            >
              <Minus className="w-4 h-4" style={{ color: '#F5F5F7' }} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              className="p-1.5 hover:bg-slate-700 rounded transition-colors"
              title={window.isMaximized ? 'Restore' : 'Maximize'}
            >
              {window.isMaximized ? (
                <Minimize2 className="w-4 h-4" style={{ color: '#F5F5F7' }} />
              ) : (
                <Maximize2 className="w-4 h-4" style={{ color: '#F5F5F7' }} />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              className="p-1.5 hover:bg-red-600 rounded transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" style={{ color: '#F5F5F7' }} />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        {window.tabs.length > 0 && (
          <TabManager windowId={window.id} tabs={window.tabs} activeTabId={window.activeTabId} />
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-auto" style={{ background: '#121214' }}>
          <div className="p-4">
            <div className="text-sm" style={{ color: '#F5F5F7' }}>
              <p>Window: {window.appId}</p>
              <p>ID: {window.id}</p>
              <p>Tabs: {window.tabs.length}</p>
              {window.activeTabId && (
                <p>Active Tab: {window.tabs.find((t) => t.id === window.activeTabId)?.title}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Rnd>
  );
};
