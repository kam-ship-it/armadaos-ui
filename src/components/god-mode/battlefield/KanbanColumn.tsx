import { Batch } from './mockData';
import { BatchCard } from './BatchCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  status: Batch['status'];
  batches: Batch[];
}

const statusColors = {
  proposed: 'border-l-[var(--gm-silver)]',
  approved: 'border-l-blue-500',
  'in-progress': 'border-l-amber-500',
  verifying: 'border-l-purple-500',
  complete: 'border-l-green-500',
};

export function KanbanColumn({ title, status, batches }: KanbanColumnProps) {
  return (
    <div className="flex flex-col h-full min-w-[280px] w-[280px] bg-[var(--gm-onyx)]/50 rounded-lg border border-[var(--gm-graphite)]/50">
      <div className={cn("p-3 border-b border-[var(--gm-graphite)] flex justify-between items-center border-l-4", statusColors[status])}>
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
            <span className="text-[10px] text-[var(--gm-graphite-light)] uppercase">Empty</span>
          </div>
        )}
      </div>
    </div>
  );
}
