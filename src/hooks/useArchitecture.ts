import { useQuery } from '@apollo/client/react';
import { GET_COMPONENTS, GET_TIERS } from '../graphql/queries';

export interface Component {
  id: string;
  name: string;
  tier: 'core-substrate' | 'core-services' | 'infrastructure';
  status: 'healthy' | 'degraded' | 'down';
  health: number;
  description?: string;
  dependencies?: string[];
  metrics?: {
    uptime: number;
    latency: number;
    error_rate: number;
  };
}

export interface Tier {
  id: string;
  name: string;
  description: string;
  components: Component[];
}

export function useComponents() {
  const { data, loading, error } = useQuery<{ components: Component[] }>(GET_COMPONENTS, {
    pollInterval: 5000, // Poll every 5 seconds
  });

  return {
    components: data?.components || [],
    loading,
    error,
  };
}

export function useTiers() {
  const { data, loading, error } = useQuery<{ tiers: Tier[] }>(GET_TIERS, {
    pollInterval: 5000,
  });

  return {
    tiers: data?.tiers || [],
    loading,
    error,
  };
}
