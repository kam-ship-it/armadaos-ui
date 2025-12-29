import { mockBatches } from './mockData';
import { KanbanColumn } from './KanbanColumn';

export function BatchTracker() {
  const columns = [
    { id: 'proposed', title: 'Proposed' },
    { id: 'approved', title: 'Approved' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'verifying', title: 'Verifying' },
    { id: 'complete', title: 'Complete' },
  ] as const;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--gm-violet)] rounded-full animate-pulse" />
          Batch Tracker
        </h2>
        <div className="text-xs font-mono text-[var(--gm-silver)]">
          Active Batches: {mockBatches.filter(b => b.status !== 'complete').length}
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {columns.map(col => (
          <KanbanColumn
            key={col.id}
            title={col.title}
            status={col.id}
            batches={mockBatches.filter(b => b.status === col.id)}
          />
        ))}
      </div>
    </div>
  );
}
