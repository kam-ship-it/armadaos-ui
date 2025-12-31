// Desktop Shell Window Manager
// BATCH-DESKTOP-00: Foundation Layer

import React from 'react';
import { useDesktopStore } from '../../stores/desktopStore';
import { Window } from './Window';

export const WindowManager: React.FC = () => {
  const { windows, activeSpaceId } = useDesktopStore();

  // Filter windows by active space
  const visibleWindows = windows.filter((w) => w.spaceId === activeSpaceId);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        {visibleWindows.map((window) => (
          <Window key={window.id} window={window} />
        ))}
      </div>
    </div>
  );
};
