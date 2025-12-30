import { useState, useRef, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { mockBatches, Batch } from './mockData';
import { KanbanColumn } from './KanbanColumn';
import { BatchCard } from './BatchCard';
import { ChevronRight } from 'lucide-react';

export function BatchTracker() {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Check if content is scrollable and hide hint after scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const checkScroll = () => {
      const isScrollable = container.scrollWidth > container.clientWidth;
      const isScrolled = container.scrollLeft > 10;
      setShowScrollHint(isScrollable && !isScrolled);
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

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

        <div className="flex-1 relative">
          <div 
            ref={scrollRef}
            className="h-full flex gap-4 overflow-x-auto pb-4 custom-scrollbar scroll-smooth"
          >
            {columns.map(col => (
              <KanbanColumn
                key={col.id}
                title={col.title}
                status={col.id}
                batches={batches.filter(b => b.status === col.id)}
              />
            ))}
          </div>

          {/* Scroll Hint */}
          {showScrollHint && (
            <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[var(--gm-onyx)] to-transparent pointer-events-none flex items-center justify-end pr-2">
              <div className="flex items-center gap-1 text-[var(--gm-violet)] animate-pulse">
                <span className="text-xs font-mono">Scroll</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          )}
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
