import { useState } from 'react';
import { useComponents, useTiers, Component as GraphQLComponent } from '@/hooks/useArchitecture';
import { TierCard } from './architecture/TierCard';
import { TierView } from './architecture/TierView';
import { ComponentDetail } from './architecture/ComponentDetail';

// Re-export Component type for compatibility
export type Component = GraphQLComponent;

type ViewState = 'overview' | 'tier' | 'component';

export function ArchitectureLens() {
  const [view, setView] = useState<ViewState>('overview');
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  // Use GraphQL hooks
  const { tiers, loading: tiersLoading, error: tiersError } = useTiers();
  const { components, loading: componentsLoading, error: componentsError } = useComponents();

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
  const totalComponents = components.length;
  const healthyComponents = components.filter(c => c.status === 'healthy').length;

  // Loading state
  if (tiersLoading || componentsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--gm-snow)]">THE ARCHITECTURE</h1>
          <div className="text-[var(--gm-silver)] font-mono text-sm">Loading...</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-[var(--gm-obsidian)] border border-[var(--gm-silver)]/20 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (tiersError || componentsError) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--gm-snow)]">THE ARCHITECTURE</h1>
        </div>
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
          <p className="text-red-400 font-mono">
            Failed to load architecture data. {tiersError?.message || componentsError?.message}
          </p>
          <p className="text-[var(--gm-silver)] text-sm mt-2">
            Check that the GraphQL API is running at {import.meta.env.VITE_GRAPHQL_HTTP_URL}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--gm-snow)]">
          {view === 'overview' ? 'THE ARCHITECTURE' : 
           view === 'tier' ? 'TIER DRILL-DOWN' : 'COMPONENT DETAIL'}
        </h1>
        <div className="text-[var(--gm-silver)] font-mono text-sm">
          SYSTEM HEALTH: {healthyComponents}/{totalComponents}
        </div>
      </div>

      {/* OVERVIEW - 3 Tier Cards */}
      {view === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              onClick={() => handleTierClick(tier.id)}
            />
          ))}
        </div>
      )}

      {/* TIER VIEW - Drill-down into a specific tier */}
      {view === 'tier' && activeTier && (
        <TierView
          tier={activeTier}
          onBack={handleBackToOverview}
          onSelectComponent={handleComponentClick}
        />
      )}

      {/* COMPONENT DETAIL VIEW */}
      {view === 'component' && selectedComponent && (
        <ComponentDetail
          component={selectedComponent}
          onBack={handleBackToTier}
        />
      )}
    </div>
  );
}
