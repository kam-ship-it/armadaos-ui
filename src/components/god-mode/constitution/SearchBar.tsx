import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--gm-silver)]" />
      <input 
        type="text" 
        placeholder="Search Constitution..." 
        className="w-full bg-[var(--gm-graphite)] text-[var(--gm-snow)] text-sm rounded-lg pl-10 pr-4 py-2 border border-transparent focus:border-[var(--gm-violet)] focus:ring-0 placeholder-[var(--gm-graphite-light)]"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
