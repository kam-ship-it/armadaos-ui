import { useDroppable } from '@dnd-kit/core';
import { Batch } from '@/hooks/useBattlefield';
import { BatchCard } from './BatchCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  id: string;
  title: string;
  batches: Batch[];
}

const statusColors: Record<string, string> = {
  proposed: 'border-l-[var(--gm-silver)]',
  approved: 'border-l-blue-500',
  'in-progress': 'border-l-amber-500',
  verifying: 'border-l-purple-500',
  complete: 'border-l-green-500',
};

export function KanbanColumn({ id, title, batches }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "flex flex-col h-full min-w-[280px] w-[280px] bg-[var(--gm-onyx)]/50 rounded-lg border transition-all",
        isOver 
          ? "border-[var(--gm-violet)] bg-[var(--gm-violet)]/10 shadow-lg shadow-[var(--gm-violet)]/20" 
          : "border-[var(--gm-graphite)]/50"
      )}
    >
      <div className={cn("p-3 border-b border-[var(--gm-graphite)] flex justify-between items-center border-l-4", statusColors[id] || 'border-l-[var(--gm-silver)]')}>
        <h3 className="text-xs font-bold text-[var(--gm-snow)] uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-[10px] font-mono text-[var(--gm-silver)] bg-[var(--gm-graphite)] px-1.5 py-0.5 rounded">
          {batches.length}
        </span>
      </div>
      
      <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar">
        {batches.map(batch => (
          <BatchCard key={batch.id} batch={batch} />
        ))}
        
        {batches.length === 0 && (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-[var(--gm-graphite)] rounded-lg">
            <span className="text-[10px] text-[var(--gm-graphite-light)] uppercase">
              {isOver ? 'Drop here' : 'Empty'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
