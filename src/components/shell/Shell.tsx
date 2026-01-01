import React from 'react';
import { Wallpaper } from './Wallpaper';
import { Dock } from './Dock';

interface ShellProps {
  children?: React.ReactNode;
}

/**
 * Shell - The root container for the ArmadaOS Desktop Environment
 * 
 * Provides:
 * - Full-screen background (#121214 - Tungsten)
 * - Geometric wallpaper overlay
 * - Dock at bottom-center
 * - Container for windows and widgets
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
      
      {/* Dock layer */}
      <Dock />
    </div>
  );
};
