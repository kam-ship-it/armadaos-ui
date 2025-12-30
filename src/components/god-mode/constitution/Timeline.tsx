import { useState } from 'react';
import { mockEvents, Event } from './mockData';
import { EventRow } from './EventRow';
import { TimelineFilters } from './TimelineFilters';
import { EventSkeleton } from './EventSkeleton';

export function Timeline() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (filters: any) => {
    // Mock filtering logic
    let filtered = [...mockEvents];
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(e => e.type === filters.type);
    }
    if (filters.component && filters.component !== 'all') {
      filtered = filtered.filter(e => e.component === filters.component);
    }
    if (filters.agent && filters.agent !== 'all') {
      filtered = filtered.filter(e => e.agent === filters.agent);
    }
    setEvents(filtered);
  };

  const handleEventClick = (event: Event) => {
    console.log('Event clicked:', event);
    // TODO: Trigger Nexus Causal Chain Analysis
  };

  return (
    <div className="flex flex-col h-full bg-[var(--gm-onyx)] border border-[var(--gm-graphite)] rounded-lg overflow-hidden">
      <div className="p-4 border-b border-[var(--gm-graphite)]">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">Event Timeline</h2>
      </div>
      
      <TimelineFilters onFilterChange={handleFilterChange} />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {events.map(event => (
          <EventRow 
            key={event.id} 
            event={event} 
            onClick={handleEventClick} 
          />
        ))}
        
        {isLoading && (
          <>
            <EventSkeleton />
            <EventSkeleton />
            <EventSkeleton />
          </>
        )}
        
        <div className="p-4 text-center">
          <button 
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1500);
            }}
            disabled={isLoading}
            className="text-xs text-[var(--gm-violet)] hover:text-[var(--gm-violet-light)] font-mono uppercase tracking-wider disabled:opacity-50"
          >
            {isLoading ? '[Loading...]' : '[Load More Events]'}
          </button>
        </div>
      </div>
    </div>
  );
}
