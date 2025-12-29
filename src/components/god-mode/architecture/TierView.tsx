import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tier, Component } from './ComponentMap';
import { ComponentCard } from './ComponentCard';

interface TierViewProps {
  tier: Tier;
  onBack: () => void;
  onSelectComponent: (component: Component) => void;
}

export function TierView({ tier, onBack, onSelectComponent }: TierViewProps) {
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
          <h2 className="text-2xl font-bold text-[var(--gm-snow)] flex items-center gap-3">
            <tier.icon className="h-6 w-6 text-[var(--gm-violet)]" />
            {tier.name}
          </h2>
          <p className="text-[var(--gm-silver)] text-sm mt-1">{tier.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tier.components.map((component) => (
          <ComponentCard 
            key={component.id} 
            component={component} 
            onClick={onSelectComponent} 
          />
        ))}
      </div>
    </div>
  );
}
