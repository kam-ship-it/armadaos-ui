// Desktop Shell V2 - Main Container
// BATCH-DESKTOP-00: Foundation Layer

import React, { useEffect } from 'react';
import { useDesktopStore } from '../../stores/desktopStore';
import { WindowManager } from './WindowManager';
import { SessionManager } from './SessionManager';
import { Monitor, Plus } from 'lucide-react';

interface DesktopShellProps {
  mode?: 'standalone' | 'god-mode-embedded';
}

export const DesktopShell: React.FC<DesktopShellProps> = ({ mode = 'standalone' }) => {
  const { spaces, activeSpaceId, switchSpace, createSpace, openWindow, toggleNexus } =
    useDesktopStore();

  const activeSpace = spaces.find((s) => s.id === activeSpaceId);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K - Open Nexus Bar
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleNexus();
      }

      // ⌘N or Ctrl+N - New Window
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        openWindow('browser');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleNexus, openWindow]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Session Manager (invisible, handles restore/save) */}
      <SessionManager />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Monitor className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-semibold text-slate-200">ArmadaOS</span>
          </div>

          {/* Center: Space Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
              <span className="text-lg">{activeSpace?.icon}</span>
              <span className="text-sm font-medium text-slate-200">{activeSpace?.name}</span>
            </div>

            {/* Space Switcher (simple for now) */}
            <div className="flex items-center gap-1">
              {spaces.map((space) => (
                <button
                  key={space.id}
                  onClick={() => switchSpace(space.id)}
                  className={`
                    px-2 py-1 rounded text-xs transition-colors
                    ${
                      space.id === activeSpaceId
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }
                  `}
                  title={space.name}
                >
                  {space.icon}
                </button>
              ))}
              <button
                onClick={() => createSpace('New Space', 'blank')}
                className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
                title="New Space"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => openWindow('browser')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
            >
              New Window
            </button>
            <button
              onClick={toggleNexus}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-lg transition-colors"
              title="⌘K"
            >
              ⌘K
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Canvas */}
      <div
        className="absolute inset-0 pt-12"
        style={{
          background:
            activeSpace?.background.type === 'color'
              ? activeSpace.background.value
              : '#0f172a',
        }}
      >
        {/* Window Manager */}
        <WindowManager />

        {/* Empty State */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-slate-600">
            <Monitor className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-sm">Press ⌘N to open a new window</p>
            <p className="text-xs mt-2">Press ⌘K to open Nexus</p>
          </div>
        </div>
      </div>

      {/* Dock (placeholder) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl">
          <button
            onClick={() => openWindow('browser')}
            className="p-3 hover:bg-slate-800 rounded-xl transition-colors"
            title="Browser"
          >
            <Monitor className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
