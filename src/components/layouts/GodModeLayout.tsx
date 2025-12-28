import { Outlet } from 'react-router-dom';

export function GodModeLayout() {
  return (
    <div className="h-screen w-screen flex flex-col bg-armada-bg text-armada-text">
      {/* Pulse Bar - Placeholder for GM-01 */}
      <div className="h-12 bg-armada-surface border-b border-armada-border flex items-center px-4 shrink-0">
        <span className="text-armada-purple font-semibold tracking-wider">ARMADA</span>
        <span className="text-armada-text-muted ml-2 text-sm">GOD MODE</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-armada-green animate-pulse" />
          <span className="text-xs text-armada-text-muted font-mono">SYSTEM HEALTHY</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <Outlet />
      </div>

      {/* Nexus Bar - Placeholder for GM-05 */}
      <div className="h-14 bg-armada-surface border-t border-armada-border flex items-center px-4 shrink-0">
        <span className="text-armada-text-muted font-mono text-sm">Nexus AI Standing By...</span>
      </div>
    </div>
  );
}
