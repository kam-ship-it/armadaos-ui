import { Agent } from './mockData';
import { cn } from '@/lib/utils';
import { Cpu, Activity, Zap } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const statusColors = {
  idle: 'text-[var(--gm-silver)] border-[var(--gm-graphite)]',
  working: 'text-green-500 border-green-500/30 bg-green-500/5',
  error: 'text-red-500 border-red-500/30 bg-red-500/5',
  offline: 'text-[var(--gm-graphite)] border-[var(--gm-graphite)] opacity-50',
};

export function AgentCard({ agent }: AgentCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Could trigger agent details modal in the future
    }
  };

  return (
    <div 
      className={cn(
        "p-3 rounded-lg border transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--gm-violet)] focus:ring-offset-2 focus:ring-offset-[var(--gm-onyx)]",
        statusColors[agent.status],
        agent.status === 'working' && "shadow-[0_0_15px_rgba(34,197,94,0.1)]"
      )}
      tabIndex={0}
      role="button"
      aria-label={`Agent ${agent.name}, status ${agent.status}, health ${agent.health}%${agent.currentTask ? `, working on ${agent.currentTask}` : ''}`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          <span className="font-bold text-sm">{agent.name}</span>
        </div>
        <span className="text-[10px] font-mono opacity-70">{agent.version}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="opacity-70">Status</span>
          <span className="font-bold uppercase">{agent.status}</span>
        </div>

        {agent.currentTask && (
          <div className="text-[10px] font-mono truncate opacity-80 border-t border-dashed border-current/20 pt-2">
            {agent.currentTask}
          </div>
        )}

        <div className="flex items-center gap-4 pt-1">
          <div className="flex items-center gap-1 text-[10px]">
            <Activity className="w-3 h-3" />
            <span>{agent.health}%</span>
          </div>
          <div className="flex items-center gap-1 text-[10px]">
            <Zap className="w-3 h-3" />
            <span>{agent.arcConsumption} ARC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
