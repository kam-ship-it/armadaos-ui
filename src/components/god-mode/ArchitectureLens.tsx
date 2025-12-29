import { useState } from 'react';
import { tiers, mockComponents, Component } from './architecture/ComponentMap';
import { TierCard } from './architecture/TierCard';
import { TierView } from './architecture/TierView';
import { ComponentDetail } from './architecture/ComponentDetail';

type ViewState = 'overview' | 'tier' | 'component';

export function ArchitectureLens() {
  const [view, setView] = useState<ViewState>('overview');
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const handleTierClick = (tierId: string) => {
    setSelectedTierId(tierId);
    setView('tier');
  };

  const handleComponentClick = (component: Component) => {
    setSelectedComponent(component);
    setView('component');
  };

  const handleBackToOverview = () => {
    setView('overview');
    setSelectedTierId(null);
  };

  const handleBackToTier = () => {
    setView('tier');
    setSelectedComponent(null);
  };

  // Derived state
  const activeTier = selectedTierId ? tiers.find(t => t.id === selectedTierId) : null;
  const totalComponents = Object.values(mockComponents).flat().length;
  const healthyComponents = Object.values(mockComponents).flat().filter(c => c.status === 'healthy').length;

  return (
    <div className="space-y-6">
      {/* HEADER - Only show in Overview or Tier view (modified for Detail view) */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--gm-snow)]">
          {view === 'overview' ? 'THE ARCHITECTURE' : 
           view === 'tier' ? 'TIER DRILL-DOWN' : 'COMPONENT DETAIL'}
        </h1>
        <div className="text-[var(--gm-silver)] font-mono text-sm">
          SYSTEM HEALTH: {healthyComponents}/{totalComponents}
        </div>
      </div>
      
      {/* VIEW SWITCHER */}
      {view === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-500">
          {tiers.map((tier) => (
            <TierCard 
              key={tier.id} 
              tier={tier} 
              onClick={handleTierClick} 
            />
          ))}
        </div>
      )}

      {view === 'tier' && activeTier && (
        <TierView 
          tier={activeTier} 
          onBack={handleBackToOverview}
          onSelectComponent={handleComponentClick}
        />
      )}

      {view === 'component' && selectedComponent && (
        <ComponentDetail 
          component={selectedComponent} 
          onBack={handleBackToTier}
        />
      )}
    </div>
  );
}
