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
        className={`
          flex flex-col h-full
          bg-slate-900 border border-slate-700 rounded-lg overflow-hidden
          shadow-2xl
          ${window.isFocused ? 'ring-2 ring-blue-500/50' : ''}
        `}
        onClick={() => !window.isFocused && focusWindow(window.id)}
      >
        {/* Title Bar */}
        <div className="window-drag-handle flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 cursor-move">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm font-medium text-slate-200 truncate">
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
              <Minus className="w-4 h-4 text-slate-400" />
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
                <Minimize2 className="w-4 h-4 text-slate-400" />
              ) : (
                <Maximize2 className="w-4 h-4 text-slate-400" />
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
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        {window.tabs.length > 0 && (
          <TabManager windowId={window.id} tabs={window.tabs} activeTabId={window.activeTabId} />
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-slate-950">
          <div className="p-4">
            <div className="text-slate-400 text-sm">
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
