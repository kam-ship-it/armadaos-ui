import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { mockBatches, Batch } from './mockData';
import { KanbanColumn } from './KanbanColumn';
import { BatchCard } from './BatchCard';

export function BatchTracker() {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: 'proposed', title: 'Proposed' },
    { id: 'approved', title: 'Approved' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'verifying', title: 'Verifying' },
    { id: 'complete', title: 'Complete' },
  ] as const;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const batchId = active.id as string;
    const newStatus = over.id as Batch['status'];

    // Update batch status
    setBatches(prev => 
      prev.map(batch => 
        batch.id === batchId 
          ? { ...batch, status: newStatus }
          : batch
      )
    );

    setActiveId(null);
  };

  const activeBatch = batches.find(b => b.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--gm-violet)] rounded-full animate-pulse" />
            Batch Tracker
          </h2>
          <div className="text-xs font-mono text-[var(--gm-silver)]">
            Active Batches: {batches.filter(b => b.status !== 'complete').length}
          </div>
        </div>

        <div className="flex-1 flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {columns.map(col => (
            <KanbanColumn
              key={col.id}
              title={col.title}
              status={col.id}
              batches={batches.filter(b => b.status === col.id)}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeBatch ? (
          <div className="opacity-90 rotate-2 scale-105">
            <BatchCard batch={activeBatch} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
