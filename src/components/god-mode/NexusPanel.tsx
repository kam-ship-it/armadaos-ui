// import { Separator } from '@/components/ui/separator';
import { Bot } from 'lucide-react';

export function NexusPanel() {
  return (
    <div className="w-80 border-l border-[var(--gm-slate)] bg-[var(--gm-surface)] flex flex-col hidden xl:flex shadow-[0_0_20px_rgba(139,92,246,0.2)]">
      <div className="h-14 border-b border-[var(--gm-slate)] flex items-center px-4 gap-2">
        <Bot className="w-4 h-4 text-[var(--gm-violet)]" />
        <span className="text-sm font-bold text-[var(--gm-snow)]">NEXUS INTELLIGENCE</span>
      </div>
      
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-center opacity-50">
        <div className="w-16 h-16 rounded-full bg-[var(--gm-slate)] flex items-center justify-center mb-4">
          <Bot className="w-8 h-8 text-[var(--gm-silver)]" />
        </div>
        <p className="text-sm text-[var(--gm-silver)]">Awaiting Query...</p>
        <p className="text-xs text-[var(--gm-silver)] mt-2">Nexus v1.0 Online</p>
      </div>
    </div>
  );
}
