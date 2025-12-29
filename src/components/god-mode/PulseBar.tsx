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
    <div className="h-12 bg-gm-surface border-b border-gm-border flex items-center px-4 shrink-0 justify-between shadow-sm">
      {/* Left: Brand */}
      <div className="flex items-center">
        <span className="text-gm-purple font-semibold tracking-wider">ARMADA</span>
        <span className="text-gm-green text-xs ml-2 px-1 bg-gm-green/20 rounded">✓ PIPELINE OK</span>
        <span className="text-gm-secondary ml-2 text-sm hidden sm:inline-block">GOD MODE</span>
      </div>

      {/* Center: Metrics (Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-6 text-sm font-mono">
        {/* Treasury */}
        <div className="flex items-center gap-2 text-gm-secondary">
          <span>ARC:</span>
          {treasuryLoading ? (
            <div className="h-4 w-16 bg-gm-muted/20 animate-pulse rounded" />
          ) : (
            <span className="text-gm-text">${treasury?.balance.toLocaleString()}</span>
          )}
        </div>

        {/* Open Loops */}
        <div className="flex items-center gap-2 text-gm-secondary">
          <span>LOOPS:</span>
          {loopsLoading ? (
            <div className="h-4 w-8 bg-gm-muted/20 animate-pulse rounded" />
          ) : (
            <span className="text-gm-text">{loops?.count}</span>
          )}
        </div>

        {/* Alerts */}
        <div className="flex items-center gap-2 text-gm-secondary">
          <span>ALERTS:</span>
          {alertsLoading ? (
            <div className="h-4 w-8 bg-gm-muted/20 animate-pulse rounded" />
          ) : (
            <span className={clsx(
              "px-1.5 rounded",
              alertCount > 0 ? "bg-gm-red/20 text-gm-red" : "text-gm-text"
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
            <div className="w-2 h-2 rounded-full bg-gm-muted/20 animate-pulse" />
            <div className="h-3 w-20 bg-gm-muted/10 animate-pulse rounded" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className={clsx(
                "w-2 h-2 rounded-full animate-pulse",
                isHealthy && "bg-gm-green",
                isDegraded && "bg-gm-yellow",
                isCritical && "bg-gm-red"
              )} />
              <span className={clsx(
                "text-xs font-mono uppercase",
                isHealthy && "text-gm-green",
                isDegraded && "text-gm-yellow",
                isCritical && "text-gm-red"
              )}>
                {status?.status === 'healthy' ? 'SYSTEM NOMINAL' : (status?.status || 'SYSTEM NOMINAL')}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-gm-border mx-1" />
            <span className="text-xs text-gm-secondary font-mono">
              v{status?.version || '1.0.0'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
