import React from 'react';
import { Wallpaper } from './Wallpaper';

interface ShellProps {
  children?: React.ReactNode;
}

/**
 * Shell - LEGACY root container for the ArmadaOS Desktop Environment
 * 
 * NOTE: This is the OLD Shell component, used only for legacy routes (e.g., /god-mode).
 * The NEW DesktopShell component (src/components/desktop-shell/) is used for /desktop route.
 * 
 * Provides:
 * - Full-screen background (#121214 - Tungsten)
 * - Geometric wallpaper overlay
 * - Container for windows and widgets
 * 
 * REMOVED: Old Dock component (now handled by DesktopShell for /desktop route)
 */
export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden" style={{ backgroundColor: '#121214' }}>
      {/* Background layer */}
      <div className="absolute top-0 left-0 w-full h-full z-0" style={{ backgroundColor: '#121214' }} />
      
      {/* Wallpaper layer */}
      <Wallpaper />
      
      {/* Content layer (windows, widgets) */}
      <div className="relative w-full h-full z-10">
        {children}
      </div>
      
      {/* NOTE: Dock removed - DesktopShell now handles Dock for /desktop route */}
    </div>
  );
};
