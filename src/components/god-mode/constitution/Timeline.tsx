import { useState } from 'react';
import { useEvents, Event } from '@/hooks/useConstitution';
import { EventRow } from './EventRow';
import { TimelineFilters } from './TimelineFilters';
import { EventSkeleton } from './EventSkeleton';

export function Timeline() {
  const [filters, setFilters] = useState<any>({});
  const { events, loading, error, loadMore, nextCursor } = useEvents();

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // TODO: Apply filters via GraphQL variables
  };

  const handleEventClick = (event: Event) => {
    console.log('Event clicked:', event);
    // TODO: Trigger Nexus Causal Chain Analysis
  };

  // Apply client-side filtering for now (until backend supports it)
  const filteredEvents = events.filter(e => {
    if (filters.type && filters.type !== 'all' && e.type !== filters.type) return false;
    if (filters.component && filters.component !== 'all' && e.component !== filters.component) return false;
    if (filters.agent && filters.agent !== 'all' && e.agent !== filters.agent) return false;
    return true;
  });

  // Error state
  if (error) {
    return (
      <div className="flex flex-col h-full bg-[var(--gm-onyx)] border border-[var(--gm-graphite)] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[var(--gm-graphite)]">
          <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">Event Timeline</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-red-400 font-mono mb-2">Failed to load events</p>
            <p className="text-[var(--gm-silver)] text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--gm-onyx)] border border-[var(--gm-graphite)] rounded-lg overflow-hidden">
      <div className="p-4 border-b border-[var(--gm-graphite)]">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">Event Timeline</h2>
      </div>
      
      <TimelineFilters onFilterChange={handleFilterChange} />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredEvents.map(event => (
          <EventRow 
            key={event.id} 
            event={event} 
            onClick={handleEventClick} 
          />
        ))}
        
        {loading && (
          <>
            <EventSkeleton />
            <EventSkeleton />
            <EventSkeleton />
          </>
        )}
        
        {!loading && filteredEvents.length === 0 && (
          <div className="p-8 text-center text-[var(--gm-silver)]">
            No events found
          </div>
        )}
        
        {nextCursor && !loading && (
          <div className="p-4 text-center">
            <button 
              onClick={() => loadMore()}
              className="text-[var(--gm-violet)] hover:text-[var(--gm-snow)] font-mono text-sm transition-colors"
            >
              Load More →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
