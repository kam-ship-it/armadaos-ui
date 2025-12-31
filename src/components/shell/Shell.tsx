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
 * - Full-screen background (#0A0A0B - ArmadaOS onyx)
 * - Geometric wallpaper overlay
 * - Dock at bottom-center
 * - Container for windows and widgets
 */
export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-[#0A0A0B]">
      {/* Background layer */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#0A0A0B] z-0" />
      
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
