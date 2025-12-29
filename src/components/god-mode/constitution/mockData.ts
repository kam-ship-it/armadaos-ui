export interface Event {
  id: string;
  timestamp: string;
  type: 'success' | 'failure' | 'warning' | 'info' | 'violation';
  component: string;
  agent?: string;
  description: string;
  details?: Record<string, any>;
}

export interface Article {
  id: string;
  title: string;
  content: string;
}

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    type: 'success',
    component: 'context-injector',
    agent: 'Atlas',
    description: 'Context injection completed for Atlas query',
    details: { duration: '45ms', context_size: '12kb' }
  },
  {
    id: 'evt-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: 'success',
    component: 'the-one-gateway',
    description: 'BATCH-136 deployed successfully',
    details: { version: 'v1.2.3', deployer: 'COS' }
  },
  {
    id: 'evt-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    type: 'info',
    component: 'master-architect',
    agent: 'Atlas',
    description: 'Atlas committed bf23a6d to armadaos-genesis',
    details: { commit_hash: 'bf23a6d', branch: 'main' }
  },
  {
    id: 'evt-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    type: 'warning',
    component: 'health-monitor',
    description: 'validator latency increased to 150ms',
    details: { threshold: '100ms', current: '150ms' }
  },
  {
    id: 'evt-5',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    type: 'failure',
    component: 'context-injector',
    description: 'Context injection failed: timeout',
    details: { error: 'TimeoutError', timeout: '15s' }
  },
  {
    id: 'evt-6',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    type: 'violation',
    component: 'constitution-enforcer',
    agent: 'Shadow',
    description: 'Attempted unauthorized access to Treasury',
    details: { rule: 'ARTICLE_4_SECTION_2', action: 'blocked' }
  }
];

export const mockArticles: Article[] = [
  {
    id: 'art-1',
    title: 'ARTICLE 1: THE CHAIRMAN\'S AUTHORITY',
    content: 'The Chairman holds supreme authority over all aspects of ArmadaOS. All agents, systems, and processes exist to serve the Chairman\'s vision and objectives.'
  },
  {
    id: 'art-2',
    title: 'ARTICLE 2: THE IMMUTABLE COMPUTER',
    content: 'The system shall maintain an immutable record of all actions and decisions. Nothing is deleted. Everything is auditable.'
  },
  {
    id: 'art-3',
    title: 'ARTICLE 3: AGENT AUTONOMY & ALIGNMENT',
    content: 'Agents are granted autonomy to execute their directives but must remain strictly aligned with the Chairman\'s intent and the Constitution.'
  },
  {
    id: 'art-4',
    title: 'ARTICLE 4: RESOURCE MANAGEMENT',
    content: 'System resources (compute, storage, capital) are finite and must be managed efficiently. Waste is a violation of the Constitution.'
  },
  {
    id: 'art-5',
    title: 'ARTICLE 5: SECURITY & PRIVACY',
    content: 'The security of the system and the privacy of the Chairman\'s data are paramount. No unauthorized access or data leakage is tolerated.'
  }
];
