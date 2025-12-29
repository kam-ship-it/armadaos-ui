import { mockAgents } from './mockData';
import { AgentCard } from './AgentCard';

export function AgentArmy() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Agent Army
        </h2>
        <div className="text-xs font-mono text-[var(--gm-silver)]">
          Online: {mockAgents.filter(a => a.status !== 'offline').length}/{mockAgents.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto custom-scrollbar pr-2">
        {mockAgents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
