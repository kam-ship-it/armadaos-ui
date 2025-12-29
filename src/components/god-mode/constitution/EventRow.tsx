import { Event } from './mockData';
import { CheckCircle, XCircle, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventRowProps {
  event: Event;
  onClick: (event: Event) => void;
}

const typeIcons = {
  success: CheckCircle,
  failure: XCircle,
  warning: AlertTriangle,
  info: Info,
  violation: ShieldAlert
};

const typeColors = {
  success: 'text-green-500',
  failure: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
  violation: 'text-red-700'
};

export function EventRow({ event, onClick }: EventRowProps) {
  const Icon = typeIcons[event.type];
  const colorClass = typeColors[event.type];

  return (
    <div 
      onClick={() => onClick(event)}
      className="flex items-start gap-4 p-4 border-b border-[var(--gm-graphite)] hover:bg-[var(--gm-onyx-light)] cursor-pointer transition-colors group"
    >
      <div className="flex-shrink-0 mt-1">
        <Icon className={cn("w-5 h-5", colorClass)} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-[var(--gm-silver)]">
            {new Date(event.timestamp).toLocaleTimeString()}
          </span>
          <span className={cn("text-xs font-bold uppercase px-1.5 py-0.5 rounded bg-opacity-10", colorClass.replace('text-', 'bg-'))}>
            {event.type}
          </span>
          <span className="font-mono text-xs text-[var(--gm-violet)]">
            {event.component}
          </span>
          {event.agent && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--gm-graphite)] text-[var(--gm-snow)]">
              {event.agent}
            </span>
          )}
        </div>
        
        <p className="text-sm text-[var(--gm-snow)] group-hover:text-white transition-colors">
          {event.description}
        </p>
        
        {event.details && (
          <div className="mt-2 text-xs font-mono text-[var(--gm-silver)] opacity-0 group-hover:opacity-100 transition-opacity">
            {JSON.stringify(event.details)}
          </div>
        )}
      </div>
    </div>
  );
}
