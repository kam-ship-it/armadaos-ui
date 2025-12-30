import { Database, Layers, Cloud } from 'lucide-react';

export type ComponentStatus = 'healthy' | 'degraded' | 'unhealthy' | 'planned';

export interface ComponentMetric {
  label: string;
  value: string | number;
  unit?: string;
}

export interface Component {
  id: string;
  name: string;
  tier: 'core-substrate' | 'core-services' | 'infrastructure';
  status: ComponentStatus;
  health: number;
  metric: ComponentMetric;
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
  icon: any;
  components: Component[];
}

export const mockComponents: Record<string, Component[]> = {
  core_substrate: [
    { id: 'one-gateway', name: 'The One Gateway', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Req/s', value: 1234 } },
    { id: 'agent-runtime', name: 'Agent Runtime', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Active', value: 3 } },
    { id: 'constitution-enforcer', name: 'Constitution Enforcer', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Checks', value: 892 } },
    { id: 'event-store', name: 'Event Store', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Events', value: '12.4K' } },
    { id: 'validator', name: 'Validator', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Valid', value: '99.9%' } },
    { id: 'red-team', name: 'Red Team Agent', tier: 'core-substrate', status: 'degraded', health: 75, metric: { label: 'Tests', value: 45 } },
    { id: 'shadow', name: 'System-Level Shadow', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Watching', value: 42 } },
    { id: 'orchestrator', name: 'Orchestrator', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Active', value: 2 } },
    { id: 'action-queue', name: 'Action Queue', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Pending', value: 0 } },
    { id: 'agent-router', name: 'Agent Router', tier: 'core-substrate', status: 'healthy', health: 100, metric: { label: 'Routes', value: 156 } },
  ],
  core_services: [
    { id: 'context-engine', name: 'Context Engine', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Memories', value: '2.3K' } },
    { id: 'sandbox-bridge', name: 'Sandbox Bridge', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Active', value: 1 } },
    { id: 'master-architect', name: 'Master Architect', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Files', value: '1.2K' } },
    { id: 'treasury', name: 'Treasury', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Balance', value: '$12,450' } },
    { id: 'state-manager', name: 'State Manager', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'States', value: 89 } },
    { id: 'context-injector', name: 'Context Injector', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Injections', value: 450 } },
    { id: 'weaviate', name: 'Weaviate', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Vectors', value: '45K' } },
    { id: 'approval-engine', name: 'Approval Engine', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Pending', value: 0 } },
    { id: 'cost-model', name: 'Cost Model', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Est. Cost', value: '$0.05/hr' } },
    { id: 'memory-controller', name: 'Memory Controller', tier: 'core-services', status: 'healthy', health: 100, metric: { label: 'Usage', value: '45%' } },
  ],
  infrastructure: [
    { id: 'postgres', name: 'PostgreSQL', tier: 'infrastructure', status: 'healthy', health: 100, metric: { label: 'Conn', value: 12 } },
    { id: 'redis', name: 'Redis', tier: 'infrastructure', status: 'healthy', health: 100, metric: { label: 'Keys', value: '234K' } },
    { id: 'milvus', name: 'Milvus', tier: 'infrastructure', status: 'healthy', health: 100, metric: { label: 'Vectors', value: '1.2M' } },
    { id: 'kafka', name: 'Kafka', tier: 'infrastructure', status: 'healthy', health: 100, metric: { label: 'Topics', value: 8 } },
    { id: 'monitoring', name: 'Monitoring Stack', tier: 'infrastructure', status: 'healthy', health: 100, metric: { label: 'Alerts', value: 0 } },
    { id: 'logging', name: 'Logging Stack', tier: 'infrastructure', status: 'healthy', health: 100, metric: { label: 'Logs/s', value: 450 } },
    { id: 'cdn', name: 'CDN', tier: 'infrastructure', status: 'healthy', health: 100, metric: { label: 'Hit Rate', value: '98%' } },
    { id: 'load-balancer', name: 'Load Balancer', tier: 'infrastructure', status: 'healthy', health: 100, metric: { label: 'Uptime', value: '99.99%' } },
  ],
};

export const tiers: Tier[] = [
  {
    id: 'core-substrate',
    name: 'Core Substrate',
    description: 'The foundational layer that enforces the Constitution and enables agent operation',
    icon: Database,
    components: mockComponents.core_substrate,
  },
  {
    id: 'core-services',
    name: 'Core Services',
    description: 'Essential services that power agent intelligence and system capabilities',
    icon: Layers,
    components: mockComponents.core_services,
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'The underlying infrastructure that supports all system operations',
    icon: Cloud,
    components: mockComponents.infrastructure,
  },
];
