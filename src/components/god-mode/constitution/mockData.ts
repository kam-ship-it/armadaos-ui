export interface Event {
  id: string;
  type: 'success' | 'failure' | 'warning' | 'info';
  title: string;
  description?: string;
  timestamp: string;
  component: string;
  agent?: string;
  metadata?: Record<string, unknown>;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: 'principle' | 'value' | 'protocol';
  last_updated: string;
  author?: string;
}

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    type: 'success',
    title: 'Context injection completed',
    component: 'context-injector',
    agent: 'Atlas',
    description: 'Context injection completed for Atlas query',
    metadata: { duration: '45ms', context_size: '12kb' }
  },
  {
    id: 'evt-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: 'success',
    title: 'Batch approved',
    component: 'approval-engine',
    agent: 'Shadow',
    description: 'BATCH-GM-04 approved by Shadow',
    metadata: { batch_id: 'BATCH-GM-04', priority: 'P0' }
  },
  {
    id: 'evt-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: 'warning',
    title: 'High memory usage detected',
    component: 'memory-controller',
    description: 'Memory usage exceeded 80% threshold',
    metadata: { usage: '85%', threshold: '80%' }
  },
  {
    id: 'evt-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    type: 'info',
    title: 'Agent deployed',
    component: 'agent-runtime',
    agent: 'Hephaestus',
    description: 'Hephaestus v1.0.5 deployed successfully',
    metadata: { version: 'v1.0.5' }
  },
  {
    id: 'evt-5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    type: 'failure',
    title: 'API request failed',
    component: 'one-gateway',
    description: 'External API request failed with timeout',
    metadata: { endpoint: '/api/external', error: 'timeout', duration: '30s' }
  },
];

export const mockArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Article I: The Foundation',
    content: 'ArmadaOS is a self-governing, agent-driven operating system built on immutable principles...',
    category: 'principle',
    last_updated: new Date().toISOString(),
    author: 'System',
  },
  {
    id: 'art-2',
    title: 'Article II: Agent Autonomy',
    content: 'Every agent operates with bounded autonomy within the Constitution...',
    category: 'principle',
    last_updated: new Date().toISOString(),
    author: 'System',
  },
  {
    id: 'art-3',
    title: 'Article III: Transparency',
    content: 'All actions, decisions, and state changes must be logged and auditable...',
    category: 'value',
    last_updated: new Date().toISOString(),
    author: 'System',
  },
];
