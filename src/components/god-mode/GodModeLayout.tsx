import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { LeftNav } from './LeftNav';
import { PulseBar } from './PulseBar';
import { NexusPanel } from './NexusPanel';

interface GodModeLayoutProps {
  children?: ReactNode;
}

export function GodModeLayout({ children }: GodModeLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-[var(--gm-onyx)] text-[var(--gm-snow)] overflow-hidden font-sans">
      {/* LEFT NAVIGATION */}
      <LeftNav />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <PulseBar />

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          <div className="max-w-7xl mx-auto w-full">
            {children || <Outlet />}
          </div>
        </main>
      </div>

      {/* RIGHT PANEL (NEXUS) */}
      <NexusPanel />
    </div>
  );
}
