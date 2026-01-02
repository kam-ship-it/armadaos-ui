# MESSAGE TO ATLAS 2: GM-07 GraphQL Client - GOLD STANDARD DIRECTIVE

**This message contains EVERYTHING you need. 100% self-contained. Copy-paste execution.**

---

## MISSION

Integrate Apollo Client into God Mode UI to connect with GraphQL API. Replace all mock data with real GraphQL queries.

**Repository:** `kam-ship-it/armadaos-ui`  
**Working Directory:** `/home/ubuntu/armadaos-ui`

---

## STEP 0: VERIFY REPOSITORY

```bash
cd /home/ubuntu/armadaos-ui
git pull origin main
ls -la src/components/god-mode/
```

**Expected:** All lens components exist from GM-06

---

## STEP 1: INSTALL APOLLO CLIENT

```bash
cd /home/ubuntu/armadaos-ui
pnpm add @apollo/client graphql graphql-ws
```

---

## STEP 2: CREATE APOLLO CLIENT CONFIGURATION

```bash
mkdir -p src/lib

cat > src/lib/apollo-client.ts << 'APOLLO_EOF'
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP_URL || 'http://localhost:8200/graphql',
  headers: {
    authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_URL || 'ws://localhost:8200/graphql',
    connectionParams: {
      authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
APOLLO_EOF
```

---

## STEP 3: CREATE ENVIRONMENT VARIABLES

```bash
cd /home/ubuntu/armadaos-ui

cat > .env.local << 'ENV_EOF'
VITE_GRAPHQL_HTTP_URL=http://localhost:8200/graphql
VITE_GRAPHQL_WS_URL=ws://localhost:8200/graphql
ENV_EOF

cat > .env.local.example << 'ENV_EXAMPLE_EOF'
# GraphQL API Configuration
VITE_GRAPHQL_HTTP_URL=http://localhost:8200/graphql
VITE_GRAPHQL_WS_URL=ws://localhost:8200/graphql
ENV_EXAMPLE_EOF
```

---

## STEP 4: WRAP APP IN APOLLO PROVIDER

```bash
cd /home/ubuntu/armadaos-ui

# Backup existing main.tsx
cp src/main.tsx src/main.tsx.backup

cat > src/main.tsx << 'MAIN_EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './lib/apollo-client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
MAIN_EOF
```

---

## STEP 5: CREATE GRAPHQL OPERATIONS

```bash
mkdir -p src/graphql

cat > src/graphql/queries.ts << 'QUERIES_EOF'
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
QUERIES_EOF

cat > src/graphql/mutations.ts << 'MUTATIONS_EOF'
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
MUTATIONS_EOF

cat > src/graphql/subscriptions.ts << 'SUBSCRIPTIONS_EOF'
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
SUBSCRIPTIONS_EOF
```

---

## STEP 6: CREATE CUSTOM HOOKS

```bash
mkdir -p src/hooks

cat > src/hooks/useBattlefield.ts << 'BATTLEFIELD_HOOK_EOF'
import { useQuery, useSubscription } from '@apollo/client';
import { GET_BATCHES } from '@/graphql/queries';
import { BATCH_UPDATED } from '@/graphql/subscriptions';

export const useBatches = (status?: string, phase?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_BATCHES, {
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
  const { data } = useSubscription(BATCH_UPDATED, {
    variables: { batchId },
  });

  return {
    updatedBatch: data?.batchUpdated,
  };
};
BATTLEFIELD_HOOK_EOF

cat > src/hooks/useSystemStatus.ts << 'SYSTEM_HOOK_EOF'
import { useQuery, useSubscription } from '@apollo/client';
import { GET_SYSTEM_HEALTH, GET_SYSTEM_METRICS, GET_AGENTS } from '@/graphql/queries';
import { SYSTEM_METRICS_UPDATED } from '@/graphql/subscriptions';

export const useSystemHealth = () => {
  const { data, loading, error } = useQuery(GET_SYSTEM_HEALTH, {
    pollInterval: 30000,
  });

  return {
    health: data?.systemHealth,
    loading,
    error,
  };
};

export const useSystemMetrics = () => {
  const { data, loading, error } = useQuery(GET_SYSTEM_METRICS);

  return {
    metrics: data?.systemMetrics,
    loading,
    error,
  };
};

export const useAgents = () => {
  const { data, loading, error } = useQuery(GET_AGENTS);

  return {
    agents: data?.agents || [],
    loading,
    error,
  };
};

export const useSystemMetricsLive = () => {
  const { data } = useSubscription(SYSTEM_METRICS_UPDATED);

  return {
    liveMetrics: data?.systemMetricsUpdated,
  };
};
SYSTEM_HOOK_EOF

cat > src/hooks/useNexus.ts << 'NEXUS_HOOK_EOF'
import { useQuery, useMutation } from '@apollo/client';
import { GET_MESSAGES, SEND_MESSAGE } from '@/graphql/queries';

export const useMessages = (limit = 50, offset = 0) => {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { limit, offset },
  });

  return {
    messages: data?.messages || [],
    loading,
    error,
  };
};

export const useSendMessage = () => {
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE);

  return {
    sendMessage,
    loading,
    error,
  };
};
NEXUS_HOOK_EOF
```

---

## STEP 7: TEST LOCALLY

```bash
cd /home/ubuntu/armadaos-ui
pnpm dev
```

**Open browser to `http://localhost:5173`**

**Verify:**
- ✅ App loads without errors
- ✅ Apollo Client connects to GraphQL API
- ✅ Console shows no errors

---

## STEP 8: COMMIT TO GITHUB

```bash
cd /home/ubuntu/armadaos-ui

git add src/lib/apollo-client.ts
git add src/graphql/
git add src/hooks/
git add src/main.tsx
git add .env.local.example

git commit -m "GM-07 Phase 1-2: Apollo Client setup and GraphQL operations

- Installed Apollo Client with HTTP and WebSocket links
- Created GraphQL queries, mutations, subscriptions
- Created custom hooks for Battlefield, System Status, Nexus
- Wrapped app in ApolloProvider
- Environment variables configured

Status: Phases 1-2 complete"

git push origin main
```

---

## ACCEPTANCE CRITERIA

| ID | Criterion | Status |
|:---|:----------|:-------|
| AC-01 | Apollo Client configured | ✅ DONE |
| AC-02 | GraphQL operations defined | ✅ DONE |
| AC-03 | Custom hooks created | ✅ DONE |
| AC-04 | App wrapped in ApolloProvider | ✅ DONE |

---

## NEXT STEPS

**Phase 3:** Update components to use GraphQL hooks instead of mock data

**Phase 4:** Remove all mock data files

---

## PROGRESS REPORT

**Reply with:**
```
Atlas 2 → COS: GM-07 Phases 1-2 complete
- Apollo Client setup complete (HTTP + WebSocket)
- All GraphQL operations defined
- Custom hooks created for all lenses
- App wrapped in ApolloProvider
- Commit: [SHA]
- Next: Phase 3 (Update components to use hooks)
```

---

**This message is 100% self-contained. Execute with copy-paste. Report progress when Phases 1-2 complete.**
