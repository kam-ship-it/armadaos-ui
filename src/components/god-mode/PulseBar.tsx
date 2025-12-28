import { useSystemStatus, useAlerts, useTreasuryBalance, useOpenLoops } from '@/api/pulse';
import { clsx } from 'clsx';

export function PulseBar() {
  const { data: status, isLoading: statusLoading } = useSystemStatus();
  const { data: alerts, isLoading: alertsLoading } = useAlerts();
  const { data: treasury, isLoading: treasuryLoading } = useTreasuryBalance();
  const { data: loops, isLoading: loopsLoading } = useOpenLoops();

  const alertCount = alerts?.length || 0;
  const isHealthy = status?.status === 'healthy';
  const isDegraded = status?.status === 'degraded';
  const isCritical = status?.status === 'critical';

  return (
    <div className="h-12 bg-armada-surface border-b border-armada-border flex items-center px-4 shrink-0 justify-between">
      {/* Left: Brand */}
      <div className="flex items-center">
        <span className="text-armada-purple font-semibold tracking-wider">ARMADA</span>
        <span className="text-armada-text-muted ml-2 text-sm hidden sm:inline-block">GOD MODE</span>
      </div>

      {/* Center: Metrics (Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-6 text-sm font-mono">
        {/* Treasury */}
        <div className="flex items-center gap-2 text-armada-text-muted">
          <span>ARC:</span>
          {treasuryLoading ? (
            <div className="h-4 w-16 bg-white/10 animate-pulse rounded" />
          ) : (
            <span className="text-armada-text">${treasury?.balance.toLocaleString()}</span>
          )}
        </div>

        {/* Open Loops */}
        <div className="flex items-center gap-2 text-armada-text-muted">
          <span>LOOPS:</span>
          {loopsLoading ? (
            <div className="h-4 w-8 bg-white/10 animate-pulse rounded" />
          ) : (
            <span className="text-armada-text">{loops?.count}</span>
          )}
        </div>

        {/* Alerts */}
        <div className="flex items-center gap-2 text-armada-text-muted">
          <span>ALERTS:</span>
          {alertsLoading ? (
            <div className="h-4 w-8 bg-white/10 animate-pulse rounded" />
          ) : (
            <span className={clsx(
              "px-1.5 rounded",
              alertCount > 0 ? "bg-armada-red/20 text-armada-red" : "text-armada-text"
            )}>
              {alertCount}
            </span>
          )}
        </div>
      </div>

      {/* Right: System Status */}
      <div className="flex items-center gap-3">
        {statusLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
            <div className="h-3 w-20 bg-white/10 animate-pulse rounded" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className={clsx(
                "w-2 h-2 rounded-full animate-pulse",
                isHealthy && "bg-armada-green",
                isDegraded && "bg-armada-yellow",
                isCritical && "bg-armada-red"
              )} />
              <span className={clsx(
                "text-xs font-mono uppercase",
                isHealthy && "text-armada-green",
                isDegraded && "text-armada-yellow",
                isCritical && "text-armada-red"
              )}>
                {status?.status || 'UNKNOWN'}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-armada-border mx-1" />
            <span className="text-xs text-armada-text-muted font-mono">
              v{status?.version || '1.0.0'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
