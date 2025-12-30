import { useAgents, useBatches } from '@/hooks/useBattlefield';
import { AgentCard } from './AgentCard';

export function AgentArmy() {
  const { agents, loading, error } = useAgents();
  const { batches } = useBatches();

  // Check if any batch is in verifying status
  const hasVerifyingBatch = batches.some(b => b.status === 'verifying');

  // Error state
  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            Agent Army
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-400 font-mono text-sm">Failed to load agents</p>
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
            Agent Army
          </h2>
          <div className="text-xs font-mono text-[var(--gm-silver)]">Loading...</div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-[var(--gm-obsidian)] border border-[var(--gm-silver)]/20 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Agent Army
        </h2>
        <div className="text-xs font-mono text-[var(--gm-silver)]">
          Online: {agents.filter(a => a.status !== 'offline').length}/{agents.length}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 overflow-y-auto custom-scrollbar pr-2">
        {agents.map(agent => (
          <div 
            key={agent.id}
            className={agent.name === 'Shadow' && hasVerifyingBatch ? 'ring-2 ring-[var(--gm-violet)] rounded-lg animate-pulse-active' : ''}
          >
            <AgentCard agent={agent} />
          </div>
        ))}
      </div>
    </div>
  );
}
