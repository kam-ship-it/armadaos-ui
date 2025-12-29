import { Filter } from 'lucide-react';

interface TimelineFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function TimelineFilters({ onFilterChange }: TimelineFiltersProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-[var(--gm-graphite)] bg-[var(--gm-onyx)] sticky top-0 z-10">
      <div className="flex items-center gap-2 text-[var(--gm-silver)]">
        <Filter className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Filters</span>
      </div>
      
      <select 
        className="bg-[var(--gm-graphite)] text-[var(--gm-snow)] text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-[var(--gm-violet)]"
        onChange={(e) => onFilterChange({ component: e.target.value })}
      >
        <option value="all">Component: All</option>
        <option value="context-injector">context-injector</option>
        <option value="the-one-gateway">the-one-gateway</option>
        <option value="master-architect">master-architect</option>
      </select>

      <select 
        className="bg-[var(--gm-graphite)] text-[var(--gm-snow)] text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-[var(--gm-violet)]"
        onChange={(e) => onFilterChange({ type: e.target.value })}
      >
        <option value="all">Type: All</option>
        <option value="success">Success</option>
        <option value="failure">Failure</option>
        <option value="warning">Warning</option>
        <option value="violation">Violation</option>
      </select>

      <select 
        className="bg-[var(--gm-graphite)] text-[var(--gm-snow)] text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-[var(--gm-violet)]"
        onChange={(e) => onFilterChange({ agent: e.target.value })}
      >
        <option value="all">Agent: All</option>
        <option value="Atlas">Atlas</option>
        <option value="COS">COS</option>
        <option value="Shadow">Shadow</option>
      </select>

      <select 
        className="bg-[var(--gm-graphite)] text-[var(--gm-snow)] text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-[var(--gm-violet)]"
        onChange={(e) => onFilterChange({ date: e.target.value })}
      >
        <option value="today">Date: Today</option>
        <option value="7days">Last 7 Days</option>
        <option value="30days">Last 30 Days</option>
      </select>
    </div>
  );
}
