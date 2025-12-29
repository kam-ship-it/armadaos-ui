import { BatchTracker } from '../battlefield/BatchTracker';
import { AgentArmy } from '../battlefield/AgentArmy';
import { ThreatFeed } from '../battlefield/ThreatFeed';

export function BattlefieldLens() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      {/* Top Section: Batch Tracker (Full Width on Mobile, 8 cols on Desktop) */}
      <div className="lg:col-span-8 h-[calc(60vh-6rem)] lg:h-full flex flex-col">
        <BatchTracker />
      </div>

      {/* Right Section: Agent Army & Threat Feed (4 cols) */}
      <div className="lg:col-span-4 h-full flex flex-col gap-6">
        {/* Agent Army (Top Half) */}
        <div className="flex-1 min-h-0">
          <AgentArmy />
        </div>

        {/* Threat Feed (Bottom Half) */}
        <div className="flex-1 min-h-0 border-t border-[var(--gm-graphite)] pt-6">
          <ThreatFeed />
        </div>
      </div>
    </div>
  );
}
