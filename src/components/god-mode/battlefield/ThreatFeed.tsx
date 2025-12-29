import { mockThreats } from './mockData';
import { ThreatAlert } from './ThreatAlert';

export function ThreatFeed() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Threat Feed
        </h2>
        <div className="text-xs font-mono text-[var(--gm-silver)]">
          Active: {mockThreats.length}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
        {mockThreats.map(threat => (
          <ThreatAlert key={threat.id} threat={threat} />
        ))}
        
        {mockThreats.length === 0 && (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-[var(--gm-graphite)] rounded-lg">
            <span className="text-xs text-[var(--gm-silver)]">System Secure</span>
          </div>
        )}
      </div>
    </div>
  );
}
