// BATCH-102: Window Component - GOLD STANDARD
// Implements Section 3.3 of Desktop Shell Specification V2

import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { WindowState } from '../../types/desktop';
import { useDesktopStore } from '../../stores/desktopStore';
import './Window.css';

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

  const [isTitleBarHovered, setIsTitleBarHovered] = useState(false);
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);

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
      minWidth={320}
      minHeight={240}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{
        zIndex: window.zIndex,
      }}
      disableDragging={window.isMaximized}
      enableResizing={!window.isMaximized}
    >
      <div
        data-testid="window-frame"
        data-focused={window.isFocused}
        data-maximized={window.isMaximized}
        className="window-frame"
        onClick={() => !window.isFocused && focusWindow(window.id)}
      >
        {/* Title Bar with macOS-style controls */}
        <div
          data-testid="window-titlebar"
          className="window-titlebar"
          onMouseEnter={() => setIsTitleBarHovered(true)}
          onMouseLeave={() => setIsTitleBarHovered(false)}
        >
          {/* Window Controls (Left Side - macOS style) */}
          <div data-testid="window-controls" className="window-controls">
            {/* Close Button - Red */}
            <button
              data-testid="window-control-close"
              aria-label="Close"
              className="window-control window-control-close"
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              onMouseEnter={() => setHoveredControl('close')}
              onMouseLeave={() => setHoveredControl(null)}
            >
              {(isTitleBarHovered || hoveredControl === 'close') && (
                <svg width="8" height="8" viewBox="0 0 8 8" style={{ opacity: hoveredControl === 'close' ? 1 : 0 }}>
                  <path d="M1 1L7 7M7 1L1 7" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {/* Minimize Button - Yellow */}
            <button
              data-testid="window-control-minimize"
              aria-label="Minimize"
              className="window-control window-control-minimize"
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(window.id);
              }}
              onMouseEnter={() => setHoveredControl('minimize')}
              onMouseLeave={() => setHoveredControl(null)}
            >
              {(isTitleBarHovered || hoveredControl === 'minimize') && (
                <svg width="8" height="8" viewBox="0 0 8 8" style={{ opacity: hoveredControl === 'minimize' ? 1 : 0 }}>
                  <path d="M1 4H7" stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {/* Maximize/Restore Button - Green */}
            <button
              data-testid="window-control-maximize"
              aria-label={window.isMaximized ? 'Restore' : 'Maximize'}
              className="window-control window-control-maximize"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              onMouseEnter={() => setHoveredControl('maximize')}
              onMouseLeave={() => setHoveredControl(null)}
            >
              {(isTitleBarHovered || hoveredControl === 'maximize') && (
                <svg width="8" height="8" viewBox="0 0 8 8" style={{ opacity: hoveredControl === 'maximize' ? 1 : 0 }}>
                  {window.isMaximized ? (
                    // Restore icon (two overlapping squares)
                    <>
                      <rect x="1" y="2" width="5" height="5" stroke="rgba(0,0,0,0.7)" strokeWidth="1" fill="none" />
                      <rect x="2" y="1" width="5" height="5" stroke="rgba(0,0,0,0.7)" strokeWidth="1" fill="none" />
                    </>
                  ) : (
                    // Maximize icon (diagonal arrows)
                    <>
                      <path d="M1 3L1 1L3 1M7 5L7 7L5 7" stroke="rgba(0,0,0,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 3L7 1L5 1M1 5L1 7L3 7" stroke="rgba(0,0,0,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                </svg>
              )}
            </button>
          </div>

          {/* Window Title (Center) */}
          <div data-testid="window-title" className="window-title">
            {window.title}
          </div>

          {/* Right Side Spacer (for balance) */}
          <div className="window-controls-spacer"></div>
        </div>

        {/* Window Body */}
        <div data-testid="window-body" className="window-body">
          <div className="window-content">
            <p>Window: {window.appId}</p>
            <p>ID: {window.id}</p>
            <p>Size: {window.size.width} × {window.size.height}</p>
            <p>Position: ({window.position.x}, {window.position.y})</p>
            <p>Focused: {window.isFocused ? 'Yes' : 'No'}</p>
            <p>Maximized: {window.isMaximized ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </Rnd>
  );
};
