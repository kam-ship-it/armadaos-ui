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

export const DesktopShell: React.FC<DesktopShellProps> = ({ mode: _mode = 'standalone' }) => {
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
    <div className="relative w-full h-screen overflow-hidden">
      {/* Session Manager (invisible, handles restore/save) */}
      <SessionManager />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#121214]/95 backdrop-blur-sm border-b border-[#1C1C1F] z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/assets/triprism_logo.png" 
              alt="ArmadaOS" 
              className="h-8 animate-[glow-pulse_1.5s_ease-in-out_infinite]"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))'
              }}
            />
            <span className="text-sm font-semibold text-[#E8E8E8]">ArmadaOS</span>
          </div>

          {/* Center: Space Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#121214] rounded-lg">
              <span className="text-lg">{activeSpace?.icon}</span>
              <span className="text-sm font-medium text-[#E8E8E8]">{activeSpace?.name}</span>
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
                        ? 'bg-[#8B5CF6] text-white'
                        : 'bg-[#121214] text-[#A8A8A8] hover:bg-[#1A1A1C]'
                    }
                  `}
                  title={space.name}
                >
                  {space.icon}
                </button>
              ))}
              <button
                onClick={() => createSpace('New Space', 'blank')}
                className="px-2 py-1 rounded text-xs bg-[#121214] text-[#A8A8A8] hover:bg-[#1A1A1C] transition-colors"
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
              className="px-3 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm rounded-lg transition-colors"
            >
              New Window
            </button>
            <button
              onClick={toggleNexus}
              className="px-3 py-1.5 bg-[#121214] hover:bg-[#1A1A1C] text-[#E8E8E8] text-sm rounded-lg transition-colors"
              title="⌘K"
            >
              ⌘K
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Canvas */}
      <div className="absolute inset-0 pt-12">
        {/* Window Manager */}
        <WindowManager />

        {/* Empty State */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-[#6E6E6E]">
            <Monitor className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-sm">Press ⌘N to open a new window</p>
            <p className="text-xs mt-2">Press ⌘K to open Nexus</p>
          </div>
        </div>
      </div>

      {/* Dock is rendered by Shell component */}
    </div>
  );
};
