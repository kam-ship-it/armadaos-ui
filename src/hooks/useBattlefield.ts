import { useQuery, useSubscription } from '@apollo/client/react';
import { GET_BATCHES } from '@/graphql/queries';
import { BATCH_UPDATED } from '@/graphql/subscriptions';

interface Batch {
  id: string;
  batchId: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  phase?: string;
  progress?: number;
  agent?: {
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
