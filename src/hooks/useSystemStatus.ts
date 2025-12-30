import { useQuery, useSubscription } from '@apollo/client/react';
import { GET_SYSTEM_HEALTH, GET_SYSTEM_METRICS, GET_AGENTS } from '@/graphql/queries';
import { SYSTEM_METRICS_UPDATED } from '@/graphql/subscriptions';

interface SystemHealth {
  status: string;
  uptime: number;
  timestamp: string;
  services: Array<{
    name: string;
    status: string;
    uptime: number;
    lastCheck: string;
  }>;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    bytesIn: number;
    bytesOut: number;
    requestsPerSecond: number;
  };
  timestamp: string;
}

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  currentBatch?: {
    id: string;
    batchId: string;
    title: string;
    status: string;
    progress: number;
  };
  completedBatches: number;
}

interface SystemHealthData {
  systemHealth: SystemHealth;
}

interface SystemMetricsData {
  systemMetrics: SystemMetrics;
}

interface AgentsData {
  agents: Agent[];
}

interface SystemMetricsUpdatedData {
  systemMetricsUpdated: SystemMetrics;
}

export const useSystemHealth = () => {
  const { data, loading, error } = useQuery<SystemHealthData>(GET_SYSTEM_HEALTH, {
    pollInterval: 30000,
  });

  return {
    health: data?.systemHealth,
    loading,
    error,
  };
};

export const useSystemMetrics = () => {
  const { data, loading, error } = useQuery<SystemMetricsData>(GET_SYSTEM_METRICS);

  return {
    metrics: data?.systemMetrics,
    loading,
    error,
  };
};

export const useAgents = () => {
  const { data, loading, error } = useQuery<AgentsData>(GET_AGENTS);

  return {
    agents: data?.agents || [],
    loading,
    error,
  };
};

export const useSystemMetricsLive = () => {
  const { data } = useSubscription<SystemMetricsUpdatedData>(SYSTEM_METRICS_UPDATED);

  return {
    liveMetrics: data?.systemMetricsUpdated,
  };
};
