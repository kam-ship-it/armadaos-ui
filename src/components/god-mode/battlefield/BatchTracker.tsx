import { useState, useEffect, useRef } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useBatches, useUpdateBatchStatus } from '@/hooks/useBattlefield';
import { KanbanColumn } from './KanbanColumn';
import { BatchCard } from './BatchCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BatchTracker() {
  const { batches, loading, error } = useBatches();
  const { updateBatchStatus } = useUpdateBatchStatus();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
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

  // Check scroll position and update button visibility
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const batchId = active.id as string;
    const newStatus = over.id as string;

    // Update batch status via GraphQL mutation
    updateBatchStatus(batchId, newStatus);
  };

  const activeBatch = activeId ? batches.find(b => b.id === activeId) : null;

  // Error state
  if (error) {
    return (
      <div className="flex flex-col h-full bg-[var(--gm-onyx)] border border-[var(--gm-graphite)] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">
            Batch Tracker
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 font-mono mb-2">Failed to load batches</p>
            <p className="text-[var(--gm-silver)] text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col h-full bg-[var(--gm-onyx)] border border-[var(--gm-graphite)] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">
            Batch Tracker
          </h2>
          <div className="text-[var(--gm-silver)] font-mono text-sm">Loading...</div>
        </div>
        <div className="flex-1 flex gap-4 overflow-hidden">
          {columns.map(col => (
            <div key={col.id} className="flex-1 min-w-[280px] h-full bg-[var(--gm-obsidian)] border border-[var(--gm-silver)]/20 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--gm-onyx)] border border-[var(--gm-graphite)] rounded-lg relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--gm-graphite)]">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">
          Batch Tracker
        </h2>
        <div className="text-[var(--gm-silver)] font-mono text-sm">
          Active Batches: {batches.filter(b => b.status !== 'complete').length}
        </div>
      </div>

      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[var(--gm-violet)]/20 hover:bg-[var(--gm-violet)]/40 border border-[var(--gm-violet)]/50 text-[var(--gm-violet)] transition-all shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[var(--gm-violet)]/20 hover:bg-[var(--gm-violet)]/40 border border-[var(--gm-violet)]/50 text-[var(--gm-violet)] transition-all shadow-lg animate-pulse"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Kanban Board */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar p-6 pt-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 h-full min-w-max">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                batches={batches.filter(b => b.status === column.id)}
              />
            ))}
          </div>

          <DragOverlay>
            {activeBatch && <BatchCard batch={activeBatch} isDragging />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
