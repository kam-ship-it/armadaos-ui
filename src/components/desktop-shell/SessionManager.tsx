// Desktop Shell Session Manager
// BATCH-DESKTOP-00: Foundation Layer

import React, { useEffect } from 'react';
import { useDesktopStore } from '../../stores/desktopStore';

export const SessionManager: React.FC = () => {
  const { restoreSession } = useDesktopStore();

  // Restore session on mount
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // Auto-save is handled in the store (debounced on state changes)
  // This component is just for session lifecycle management

  return null;
};
