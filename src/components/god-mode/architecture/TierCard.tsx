import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tier } from './ComponentMap';
import { cn } from '@/lib/utils';

interface TierCardProps {
  tier: Tier;
  onClick: (tierId: string) => void;
}

export function TierCard({ tier, onClick }: TierCardProps) {
  const healthyCount = tier.components.filter(c => c.status === 'healthy').length;
  const totalCount = tier.components.length;
  const isAllHealthy = healthyCount === totalCount;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(tier.id);
    }
  };

  return (
    <Card 
      className="bg-[var(--gm-graphite)] border-[var(--gm-silver)]/20 hover:border-[var(--gm-violet)]/50 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--gm-violet)] focus:ring-offset-2 focus:ring-offset-[var(--gm-onyx)]"
      onClick={() => onClick(tier.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${tier.name} tier, ${healthyCount} of ${totalCount} components healthy`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[var(--gm-snow)] group-hover:text-[var(--gm-violet)] transition-colors">
          {tier.name}
        </CardTitle>
        <tier.icon className="h-4 w-4 text-[var(--gm-silver)] group-hover:text-[var(--gm-violet)] transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[var(--gm-snow)]">{totalCount}</div>
        <p className="text-xs text-[var(--gm-silver)] mt-1">
          {healthyCount} / {totalCount} Healthy
        </p>
        <div className={cn(
          "mt-4 h-1 w-full rounded-full overflow-hidden bg-[var(--gm-slate)]",
        )}>
          <div 
            className={cn(
              "h-full transition-all duration-500",
              isAllHealthy ? "bg-[var(--gm-emerald)]" : "bg-[var(--gm-amber)]"
            )}
            style={{ width: `${(healthyCount / totalCount) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
