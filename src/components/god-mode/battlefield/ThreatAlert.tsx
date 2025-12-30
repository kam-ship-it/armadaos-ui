import { useEffect } from 'react';
interface Threat {
  id: string;
  type: 'security' | 'performance' | 'drift' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  timestamp: string;
  source: string;
}
import { cn } from '@/lib/utils';
import { AlertTriangle, ShieldAlert, Activity, Lock } from 'lucide-react';
import { playSound } from '@/lib/sounds';

interface ThreatAlertProps {
  threat: Threat;
}

const typeIcons = {
  security: Lock,
  performance: Activity,
  drift: AlertTriangle,
  compliance: ShieldAlert,
};

const severityColors = {
  low: 'text-blue-500 border-blue-500/20 bg-blue-500/5',
  medium: 'text-amber-500 border-amber-500/20 bg-amber-500/5',
  high: 'text-orange-500 border-orange-500/20 bg-orange-500/5',
  critical: 'text-red-500 border-red-500/20 bg-red-500/10 animate-pulse-subtle',
};

export function ThreatAlert({ threat }: ThreatAlertProps) {
  const Icon = typeIcons[threat.type];

  useEffect(() => {
    // Play sound for high and critical threats
    if (threat.severity === 'high' || threat.severity === 'critical') {
      playSound('threatAlert', 0.2);
    }
  }, [threat.severity]);

  return (
    <div className={cn(
      "p-3 rounded-lg border flex items-start gap-3 transition-all duration-300 hover:bg-[var(--gm-onyx)]",
      severityColors[threat.severity]
    )}>
      <div className="mt-0.5">
        <Icon className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold uppercase tracking-wider opacity-90">
            {threat.type} Alert
          </span>
          <span className="text-[10px] font-mono opacity-70">
            {new Date(threat.timestamp).toLocaleTimeString()}
          </span>
        </div>
        
        <p className="text-xs font-medium leading-relaxed opacity-90">
          {threat.summary}
        </p>
        
        <div className="mt-2 flex items-center gap-2 text-[10px] font-mono opacity-60">
          <span>Source: {threat.source}</span>
          <span>•</span>
          <span className="uppercase">{threat.severity}</span>
        </div>
      </div>
    </div>
  );
}
