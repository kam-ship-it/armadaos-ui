import { useQuery } from '@apollo/client/react';
import { GET_COMPONENTS, GET_TIERS } from '../graphql/queries';
import { Database, Layers, Cloud } from 'lucide-react';

export interface ComponentMetric {
  label: string;
  value: string | number;
  unit?: string;
}

export interface Component {
  id: string;
  name: string;
  tier: 'core-substrate' | 'core-services' | 'infrastructure';
  status: 'healthy' | 'degraded' | 'unhealthy' | 'planned';
  health: number;
  description?: string;
  dependencies?: string[];
  metrics?: {
    uptime: number;
    latency: number;
    error_rate: number;
  };
  // Add UI-specific fields
  metric: ComponentMetric;
}

export interface Tier {
  id: string;
  name: string;
  description: string;
  components: Component[];
  // Add UI-specific fields
  icon: any;
}

const tierIcons: Record<string, any> = {
  'core-substrate': Database,
  'core-services': Layers,
  'infrastructure': Cloud,
};

export function useComponents() {
  const { data, loading, error } = useQuery<{ components: any[] }>(GET_COMPONENTS, {
    pollInterval: 5000, // Poll every 5 seconds
  });

  // Transform GraphQL data to match UI expectations
  const components: Component[] = (data?.components || []).map(c => ({
    ...c,
    metric: {
      label: 'Health',
      value: `${c.health}%`,
    },
  }));

  return {
    components,
    loading,
    error,
  };
}

export function useTiers() {
  const { data, loading, error } = useQuery<{ tiers: any[] }>(GET_TIERS, {
    pollInterval: 5000,
  });

  // Transform GraphQL data to match UI expectations
  const tiers: Tier[] = (data?.tiers || []).map(t => ({
    ...t,
    icon: tierIcons[t.id] || Database,
    components: (t.components || []).map((c: any) => ({
      ...c,
      metric: {
        label: 'Health',
        value: `${c.health || c.healthScore || 0}%`,
      },
    })),
  }));

  return {
    tiers,
    loading,
    error,
  };
}
