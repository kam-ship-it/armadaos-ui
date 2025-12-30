import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Component } from './ComponentMap';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

interface ComponentCardProps {
  component: Component;
  onClick: (component: Component) => void;
}

export function ComponentCard({ component, onClick }: ComponentCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(component);
    }
  };

  return (
    <Card 
      className="bg-[var(--gm-graphite)] border-[var(--gm-silver)]/20 hover:border-[var(--gm-violet)]/50 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--gm-violet)] focus:ring-offset-2 focus:ring-offset-[var(--gm-onyx)]"
      onClick={() => onClick(component)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${component.name}, status ${component.status}, ${component.metric.label} ${component.metric.value}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[var(--gm-snow)] truncate pr-2">
          {component.name}
        </CardTitle>
        <div className={cn(
          "h-2 w-2 rounded-full",
          component.status === 'healthy' && "bg-[var(--gm-emerald)] shadow-[0_0_8px_var(--gm-emerald)] animate-pulse-health",
          component.status === 'degraded' && "bg-[var(--gm-amber)] shadow-[0_0_8px_var(--gm-amber)] animate-pulse-health",
          component.status === 'unhealthy' && "bg-[var(--gm-rose)] shadow-[0_0_8px_var(--gm-rose)] animate-pulse-health"
        )} />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[var(--gm-silver)] uppercase tracking-wider">
            {component.metric.label}
          </span>
          <span className="text-lg font-bold text-[var(--gm-snow)] font-mono">
            {component.metric.value}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[var(--gm-silver)]/50 text-[10px]">
          <Activity className="w-3 h-3" />
          <span>ID: {component.id}</span>
        </div>
      </CardContent>
    </Card>
  );
}
