// Desktop Shell Tab Manager
// BATCH-DESKTOP-00: Foundation Layer

import React from 'react';
import { Plus } from 'lucide-react';
import { TabState } from '../../types/desktop';
import { useDesktopStore } from '../../stores/desktopStore';
import { Tab } from './Tab';

interface TabManagerProps {
  windowId: string;
  tabs: TabState[];
  activeTabId: string | null;
}

export const TabManager: React.FC<TabManagerProps> = ({ windowId, tabs, activeTabId }) => {
  const { createTab } = useDesktopStore();

  const handleNewTab = () => {
    createTab(windowId);
  };

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 border-b border-slate-700 overflow-x-auto">
      {/* Tabs */}
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {tabs.map((tab) => (
          <Tab key={tab.id} windowId={windowId} tab={tab} isActive={tab.id === activeTabId} />
        ))}
      </div>

      {/* New Tab Button */}
      <button
        onClick={handleNewTab}
        className="p-1.5 hover:bg-slate-700 rounded transition-colors flex-shrink-0"
        title="New Tab"
      >
        <Plus className="w-4 h-4 text-slate-400" />
      </button>
    </div>
  );
};
