import { useQuery, useSubscription, useMutation } from '@apollo/client/react';
import { GET_BATCHES } from '@/graphql/queries';
import { BATCH_UPDATED } from '@/graphql/subscriptions';
import { UPDATE_BATCH_STATUS } from '@/graphql/mutations';

export interface Batch {
  id: string;
  batchId?: string;
  title: string;
  description?: string;
  status: 'proposed' | 'approved' | 'in-progress' | 'verifying' | 'complete';
  priority?: 'P0' | 'P1' | 'P2';
  phase?: string;
  progress?: number;
  agent?: string | {
    id: string;
    name: string;
    type: string;
    status: string;
  };
  acceptanceCriteria?: Array<{
    id: string;
    criterion: string;
    status: string;
  }>;
  blockers?: Array<{
    id: string;
    description: string;
    severity: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

interface BatchesData {
  batches: Batch[];
}

interface BatchUpdatedData {
  batchUpdated: Batch;
}

export const useBatches = (status?: string, phase?: string) => {
  const { data, loading, error, refetch } = useQuery<BatchesData>(GET_BATCHES, {
    variables: { status, phase },
  });

  return {
    batches: data?.batches || [],
    loading,
    error,
    refetch,
  };
};

export const useBatchUpdates = (batchId?: string) => {
  const { data } = useSubscription<BatchUpdatedData>(BATCH_UPDATED, {
    variables: { batchId },
  });

  return {
    updatedBatch: data?.batchUpdated,
  };
};

// Agents
interface Agent {
  id: string;
  name: string;
  version: string;
  status: 'working' | 'idle' | 'error' | 'offline';
  currentTask?: string;
  health: number;
  arcConsumption: number;
}

const mockAgents: Agent[] = [
  { id: 'atlas-2', name: 'Atlas 2', version: 'v2.1.0', status: 'working', currentTask: 'Executing BATCH-GM-04', health: 98, arcConsumption: 12.5 },
  { id: 'hephaestus', name: 'Hephaestus', version: 'v1.0.5', status: 'working', currentTask: 'Optimizing Vector Index', health: 100, arcConsumption: 8.2 },
  { id: 'shadow', name: 'Shadow', version: 'v3.0.1', status: 'idle', health: 100, arcConsumption: 0.5 },
  { id: 'nexus', name: 'Nexus', version: 'v0.9.0', status: 'working', currentTask: 'Analyzing Causal Chains', health: 95, arcConsumption: 45 },
  { id: 'drift-monitor', name: 'Drift Monitor', version: 'v1.2.0', status: 'working', currentTask: 'Scanning for drift', health: 100, arcConsumption: 2.1 },
];

export const useAgents = () => {
  // TODO: Replace with actual GraphQL query when available
  return {
    agents: mockAgents,
    loading: false,
    error: null,
  };
};

// Threats
interface Threat {
  id: string;
  type: 'security' | 'performance' | 'drift' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  timestamp: string;
  source: string;
}

const mockThreats: Threat[] = [
  { id: 'thr-1', type: 'drift', severity: 'medium', summary: 'Context drift detected in sector 7G', timestamp: '5:45:22 p.m.', source: 'Drift Monitor' },
  { id: 'thr-2', type: 'performance', severity: 'low', summary: 'API latency spike (150ms)', timestamp: '5:48:55 p.m.', source: 'Health Check' },
  { id: 'thr-3', type: 'security', severity: 'critical', summary: 'Unauthorized access attempt blocked', timestamp: '5:23:22 p.m.', source: 'Shadow' },
];

export const useThreats = () => {
  // TODO: Replace with actual GraphQL query when available
  return {
    threats: mockThreats,
    loading: false,
    error: null,
  };
};

// Update batch status mutation
export const useUpdateBatchStatus = () => {
  const [updateStatus] = useMutation(UPDATE_BATCH_STATUS);

  const updateBatchStatus = async (batchId: string, status: string) => {
    try {
      await updateStatus({
        variables: { batchId, status },
      });
    } catch (error) {
      console.error('Failed to update batch status:', error);
    }
  };

  return { updateBatchStatus };
};
