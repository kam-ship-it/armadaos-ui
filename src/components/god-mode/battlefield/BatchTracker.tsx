import { useState, useRef, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { mockBatches, Batch } from './mockData';
import { KanbanColumn } from './KanbanColumn';
import { BatchCard } from './BatchCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BatchTracker() {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
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

          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--gm-onyx)]/90 hover:bg-[var(--gm-violet)] text-[var(--gm-violet)] hover:text-[var(--gm-snow)] border border-[var(--gm-violet)]/30 rounded-full p-2 transition-all shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--gm-onyx)]/90 hover:bg-[var(--gm-violet)] text-[var(--gm-violet)] hover:text-[var(--gm-snow)] border border-[var(--gm-violet)]/30 rounded-full p-2 transition-all shadow-lg animate-pulse"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
