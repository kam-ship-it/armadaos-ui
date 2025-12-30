import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!) {
    sendMessage(content: $content) {
      id
      content
      role
      timestamp
    }
  }
`;

export const UPDATE_BATCH_STATUS = gql`
  mutation UpdateBatchStatus($id: ID!, $status: BatchStatus!) {
    updateBatchStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;
