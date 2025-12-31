// Desktop Shell Tab Component
// BATCH-DESKTOP-00: Foundation Layer

import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { TabState } from '../../types/desktop';
import { useDesktopStore } from '../../stores/desktopStore';

interface TabProps {
  windowId: string;
  tab: TabState;
  isActive: boolean;
}

export const Tab: React.FC<TabProps> = ({ windowId, tab, isActive }) => {
  const { switchTab, closeTab } = useDesktopStore();

  const handleClick = () => {
    if (!isActive) {
      switchTab(windowId, tab.id);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeTab(windowId, tab.id);
  };

  // Truncate title to max 20 characters
  const displayTitle = tab.title.length > 20 ? `${tab.title.substring(0, 20)}...` : tab.title;

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-t
        cursor-pointer transition-colors min-w-[120px] max-w-[200px]
        ${
          isActive
            ? 'bg-slate-900 text-slate-200'
            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
        }
      `}
    >
      {/* Favicon or Loading Spinner */}
      <div className="flex-shrink-0">
        {tab.isLoading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : tab.favicon ? (
          <img src={tab.favicon} alt="" className="w-4 h-4" />
        ) : (
          <div className="w-4 h-4 bg-slate-700 rounded" />
        )}
      </div>

      {/* Title */}
      <span className="text-xs truncate flex-1">{displayTitle}</span>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-0.5 hover:bg-slate-700 rounded transition-colors opacity-0 group-hover:opacity-100"
        title="Close Tab"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
