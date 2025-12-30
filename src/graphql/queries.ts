import { gql } from '@apollo/client';

export const GET_TIERS = gql`
  query GetTiers {
    tiers {
      id
      name
      description
      level
      healthScore
      status
      components {
        id
        name
        type
        status
        healthScore
      }
    }
  }
`;

export const GET_BATCHES = gql`
  query GetBatches($status: BatchStatus, $phase: String) {
    batches(status: $status, phase: $phase) {
      id
      batchId
      title
      description
      status
      priority
      phase
      progress
      agent {
        id
        name
        type
        status
      }
      acceptanceCriteria {
        id
        criterion
        status
      }
      blockers {
        id
        description
        severity
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_SYSTEM_HEALTH = gql`
  query GetSystemHealth {
    systemHealth {
      status
      uptime
      timestamp
      services {
        name
        status
        uptime
        lastCheck
      }
    }
  }
`;

export const GET_SYSTEM_METRICS = gql`
  query GetSystemMetrics {
    systemMetrics {
      cpu
      memory
      disk
      network {
        bytesIn
        bytesOut
        requestsPerSecond
      }
      timestamp
    }
  }
`;

export const GET_AGENTS = gql`
  query GetAgents {
    agents {
      id
      name
      type
      status
      currentBatch {
        id
        batchId
        title
        status
        progress
      }
      completedBatches
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($limit: Int, $offset: Int) {
    messages(limit: $limit, offset: $offset) {
      id
      content
      role
      timestamp
      metadata {
        model
        tokens
        latency
      }
    }
  }
`;

export const GET_PRINCIPLES = gql`
  query GetPrinciples {
    principles {
      id
      title
      description
      category
      priority
      examples
      violations {
        id
        description
        severity
        detectedAt
      }
    }
  }
`;

export const GET_VALUES = gql`
  query GetValues {
    values {
      id
      name
      description
      principles {
        id
        title
        category
      }
    }
  }
`;

export const GET_COMPONENTS = gql`
  query GetComponents {
    components {
      id
      name
      tier
      status
      health
      description
      dependencies
      metrics {
        uptime
        latency
        error_rate
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents($cursor: String) {
    events(cursor: $cursor) {
      id
      type
      title
      description
      timestamp
      component
      agent
      metadata
    }
    next_cursor
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
      content
      category
      last_updated
      author
    }
  }
`;
