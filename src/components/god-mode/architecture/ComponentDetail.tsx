import { Button } from '@/components/ui/button';
import { ArrowLeft, Activity, Clock, Zap } from 'lucide-react';
import { Component } from './ComponentMap';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ComponentDetailProps {
  component: Component;
  onBack: () => void;
}

export function ComponentDetail({ component, onBack }: ComponentDetailProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="text-[var(--gm-silver)] hover:text-[var(--gm-snow)] hover:bg-[var(--gm-slate)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-[var(--gm-snow)]">
              {component.name}
            </h2>
            <div className={cn(
              "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider",
              component.status === 'healthy' && "bg-[var(--gm-emerald)]/20 text-[var(--gm-emerald)]",
              component.status === 'degraded' && "bg-[var(--gm-amber)]/20 text-[var(--gm-amber)]",
              component.status === 'unhealthy' && "bg-[var(--gm-rose)]/20 text-[var(--gm-rose)]"
            )}>
              {component.status}
            </div>
          </div>
          <p className="text-[var(--gm-silver)] text-sm mt-1 font-mono">ID: {component.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MAIN METRIC */}
        <Card className="bg-[var(--gm-graphite)] border-[var(--gm-silver)]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--gm-silver)] uppercase tracking-wider">
              Primary Metric
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[var(--gm-snow)] font-mono">
              {component.metric.value}
            </div>
            <p className="text-xs text-[var(--gm-silver)] mt-1">{component.metric.label}</p>
          </CardContent>
        </Card>

        {/* HEALTH CHECK */}
        <Card className="bg-[var(--gm-graphite)] border-[var(--gm-silver)]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--gm-silver)] uppercase tracking-wider">
              Health Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-[var(--gm-emerald)]">
              <Activity className="h-5 w-5" />
              <span className="text-lg font-bold">Passing</span>
            </div>
            <p className="text-xs text-[var(--gm-silver)] mt-1">Last check: 2s ago</p>
          </CardContent>
        </Card>

        {/* UPTIME */}
        <Card className="bg-[var(--gm-graphite)] border-[var(--gm-silver)]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--gm-silver)] uppercase tracking-wider">
              Uptime (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-[var(--gm-snow)]">
              <Clock className="h-5 w-5 text-[var(--gm-violet)]" />
              <span className="text-lg font-bold">99.99%</span>
            </div>
            <p className="text-xs text-[var(--gm-silver)] mt-1">No outages detected</p>
          </CardContent>
        </Card>
      </div>

      {/* LOGS / EVENTS PLACEHOLDER */}
      <Card className="bg-[var(--gm-graphite)] border-[var(--gm-silver)]/20 h-64">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-[var(--gm-silver)] uppercase tracking-wider flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Recent Events
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40">
          <p className="text-[var(--gm-silver)]/50 text-sm italic">
            Connecting to Event Store...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
