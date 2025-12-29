import { Server, Network, Layers } from 'lucide-react';

export type ComponentStatus = 'healthy' | 'degraded' | 'unhealthy';

export interface ComponentMetric {
  label: string;
  value: string | number;
}

export interface Component {
  id: string;
  name: string;
  status: ComponentStatus;
  metric: ComponentMetric;
  description?: string;
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
    { id: 'one-gateway', name: 'The One Gateway', status: 'healthy', metric: { label: 'Req/s', value: 1234 } },
    { id: 'agent-runtime', name: 'Agent Runtime', status: 'healthy', metric: { label: 'Active', value: 3 } },
    { id: 'constitution-enforcer', name: 'Constitution Enforcer', status: 'healthy', metric: { label: 'Checks', value: 892 } },
    { id: 'event-store', name: 'Event Store', status: 'healthy', metric: { label: 'Events', value: '12.4K' } },
    { id: 'validator', name: 'Validator', status: 'healthy', metric: { label: 'Valid', value: '99.9%' } },
    { id: 'red-team', name: 'Red Team Agent', status: 'degraded', metric: { label: 'Tests', value: 45 } },
    { id: 'shadow', name: 'System-Level Shadow', status: 'healthy', metric: { label: 'Watching', value: 42 } },
    { id: 'orchestrator', name: 'Orchestrator', status: 'healthy', metric: { label: 'Active', value: 2 } },
    { id: 'action-queue', name: 'Action Queue', status: 'healthy', metric: { label: 'Pending', value: 0 } },
    { id: 'agent-router', name: 'Agent Router', status: 'healthy', metric: { label: 'Routes', value: 156 } },
  ],
  core_services: [
    { id: 'context-engine', name: 'Context Engine', status: 'healthy', metric: { label: 'Memories', value: '2.3K' } },
    { id: 'sandbox-bridge', name: 'Sandbox Bridge', status: 'healthy', metric: { label: 'Active', value: 1 } },
    { id: 'master-architect', name: 'Master Architect', status: 'healthy', metric: { label: 'Files', value: '1.2K' } },
    { id: 'treasury', name: 'Treasury', status: 'healthy', metric: { label: 'Balance', value: '$12,450' } },
    { id: 'state-manager', name: 'State Manager', status: 'healthy', metric: { label: 'States', value: 89 } },
    { id: 'weaviate', name: 'Weaviate', status: 'healthy', metric: { label: 'Vectors', value: '45K' } },
    { id: 'approval-engine', name: 'Approval Engine', status: 'healthy', metric: { label: 'Pending', value: 0 } },
    { id: 'nats', name: 'NATS', status: 'healthy', metric: { label: 'Msgs/s', value: 234 } },
  ],
  infrastructure: [
    { id: 'linkerd', name: 'Linkerd', status: 'healthy', metric: { label: 'mTLS', value: '100%' } },
    { id: 'eks', name: 'EKS Cluster', status: 'healthy', metric: { label: 'Pods', value: 24 } },
    { id: 'alb', name: 'AWS ALB', status: 'healthy', metric: { label: 'Req/s', value: 1234 } },
    { id: 'health-monitor', name: 'Health Monitor', status: 'healthy', metric: { label: 'Checks', value: 42 } },
  ],
};

export const tiers: Tier[] = [
  {
    id: 'core_substrate',
    name: 'CORE SUBSTRATE',
    description: 'The foundational layer of ArmadaOS.',
    icon: Layers,
    components: mockComponents.core_substrate,
  },
  {
    id: 'core_services',
    name: 'CORE SERVICES',
    description: 'Essential services powering agent operations.',
    icon: Server,
    components: mockComponents.core_services,
  },
  {
    id: 'infrastructure',
    name: 'INFRASTRUCTURE',
    description: 'Underlying cloud and network infrastructure.',
    icon: Network,
    components: mockComponents.infrastructure,
  },
];
