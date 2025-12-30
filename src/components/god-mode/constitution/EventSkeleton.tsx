export function EventSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-[var(--gm-graphite)] animate-pulse">
      <div className="flex-shrink-0 mt-1">
        <div className="w-5 h-5 bg-[var(--gm-graphite)] rounded-full" />
      </div>
      
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-[var(--gm-graphite)] rounded" />
          <div className="h-3 w-12 bg-[var(--gm-graphite)] rounded" />
          <div className="h-3 w-20 bg-[var(--gm-graphite)] rounded" />
        </div>
        
        <div className="h-4 w-3/4 bg-[var(--gm-graphite)] rounded" />
      </div>
    </div>
  );
}
