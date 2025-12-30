import { useThreats } from '@/hooks/useBattlefield';
import { ThreatAlert } from './ThreatAlert';

export function ThreatFeed() {
  const { threats, loading, error } = useThreats();

  // Error state
  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            Threat Feed
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-400 font-mono text-sm">Failed to load threats</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--gm-silver)] rounded-full animate-pulse" />
            Threat Feed
          </h2>
          <div className="text-xs font-mono text-[var(--gm-silver)]">Loading...</div>
        </div>
        <div className="flex-1 space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-[var(--gm-obsidian)] border border-[var(--gm-silver)]/20 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Threat Feed
        </h2>
        <div className="text-xs font-mono text-[var(--gm-silver)]">
          Active: {threats.length}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
        {threats.map(threat => (
          <ThreatAlert key={threat.id} threat={threat} />
        ))}
        
        {threats.length === 0 && (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-[var(--gm-graphite)] rounded-lg">
            <span className="text-xs text-[var(--gm-silver)]">System Secure</span>
          </div>
        )}
      </div>
    </div>
  );
}
