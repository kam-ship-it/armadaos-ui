import { Activity, Wifi } from 'lucide-react';
import { useSystemStatus } from '@/hooks/useSystemStatus';

export function PulseBar() {
  const { status, loading } = useSystemStatus();

  const statusColor = status?.status === 'optimal' ? 'var(--gm-emerald)' : 
                      status?.status === 'degraded' ? 'var(--gm-amber)' : 
                      'var(--gm-red)';

  return (
    <header className="h-14 border-b border-[var(--gm-slate)] bg-[var(--gm-onyx)]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-bold tracking-widest text-[var(--gm-silver)] uppercase">
          Armada God Mode
        </h1>
        <div className="h-4 w-[1px] bg-[var(--gm-slate)]"></div>
        <div className="flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full animate-pulse" 
            style={{ backgroundColor: statusColor }}
          ></span>
          <span 
            className="text-xs font-mono uppercase" 
            style={{ color: statusColor }}
          >
            {loading ? 'LOADING...' : `SYSTEM ${status?.status?.toUpperCase() || 'UNKNOWN'}`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[var(--gm-silver)]">
          <Activity className="w-4 h-4" />
          <span className="text-xs font-mono">
            CPU {status?.metrics?.cpu || 12}%
          </span>
        </div>
        <div className="flex items-center gap-2 text-[var(--gm-silver)]">
          <Wifi className="w-4 h-4" />
          <span className="text-xs font-mono">
            NET {status?.metrics?.network || 45}ms
          </span>
        </div>
      </div>
    </header>
  );
}
