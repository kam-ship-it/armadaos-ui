import { gql } from '@apollo/client';

export const BATCH_UPDATED = gql`
  subscription BatchUpdated($batchId: String) {
    batchUpdated(batchId: $batchId) {
      id
      batchId
      status
      progress
      updatedAt
    }
  }
`;

export const SYSTEM_METRICS_UPDATED = gql`
  subscription SystemMetricsUpdated {
    systemMetricsUpdated {
      cpu
      memory
      disk
      timestamp
    }
  }
`;
