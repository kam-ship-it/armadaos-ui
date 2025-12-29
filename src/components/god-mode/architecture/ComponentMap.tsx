import { Server, Network, Layers, Monitor } from 'lucide-react';

export type ComponentStatus = 'healthy' | 'degraded' | 'unhealthy' | 'planned';

export interface ComponentMetric {
  label: string;
  value: string | number;
  unit?: string;
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
    { id: 'context-injector', name: 'Context Injector', status: 'healthy', metric: { label: 'Injections', value: 450 } },
    { id: 'weaviate', name: 'Weaviate', status: 'healthy', metric: { label: 'Vectors', value: '45K' } },
    { id: 'approval-engine', name: 'Approval Engine', status: 'healthy', metric: { label: 'Pending', value: 0 } },
    { id: 'cost-model', name: 'Cost Model', status: 'healthy', metric: { label: 'Est. Cost', value: '$0.05/hr' } },
    { id: 'memory-controller', name: 'Memory Controller', status: 'healthy', metric: { label: 'Usage', value: '45%' } },
    { id: 'ram-agent', name: 'RAM Agent', status: 'healthy', metric: { label: 'Cache Hit', value: '98%' } },
    { id: 'god-mode-api', name: 'God Mode API', status: 'healthy', metric: { label: 'Uptime', value: '99.99%' } },
    { id: 'god-mode-console', name: 'God Mode Console', status: 'healthy', metric: { label: 'Users', value: 1 } },
    { id: 'service-adapters', name: 'Service Adapters', status: 'healthy', metric: { label: 'Active', value: 5 } },
    { id: 'backup-service', name: 'Backup Service', status: 'healthy', metric: { label: 'Last Backup', value: '1h ago' } },
  ],
  infrastructure: [
    { id: 'linkerd', name: 'Linkerd', status: 'healthy', metric: { label: 'mTLS', value: '100%' } },
    { id: 'opentelemetry', name: 'OpenTelemetry', status: 'healthy', metric: { label: 'Traces/s', value: 500 } },
    { id: 'aws-secrets', name: 'AWS Secrets Manager', status: 'healthy', metric: { label: 'Secrets', value: 12 } },
    { id: 'aws-alb', name: 'AWS ALB/NLB', status: 'healthy', metric: { label: 'Req/s', value: 1234 } },
    { id: 'ecs-k8s', name: 'ECS/Kubernetes', status: 'healthy', metric: { label: 'Pods', value: 24 } },
    { id: 'health-monitor', name: 'Health Monitor', status: 'healthy', metric: { label: 'Checks', value: 42 } },
    { id: 'health-aggregator', name: 'Health Aggregator', status: 'healthy', metric: { label: 'Score', value: 98 } },
    { id: 'rollback', name: 'Rollback Mechanism', status: 'healthy', metric: { label: 'Ready', value: 'Yes' } },
    { id: 'dead-mans-switch', name: 'Dead Man\'s Switch', status: 'healthy', metric: { label: 'Armed', value: 'Yes' } },
    { id: 'dependency-graph', name: 'Dependency Graph', status: 'healthy', metric: { label: 'Nodes', value: 150 } },
    { id: 'config-mgmt', name: 'Configuration Management', status: 'healthy', metric: { label: 'Synced', value: 'Yes' } },
    { id: 'service-discovery', name: 'Service Discovery', status: 'healthy', metric: { label: 'Services', value: 42 } },
    { id: 'disaster-recovery', name: 'Disaster Recovery', status: 'healthy', metric: { label: 'RPO', value: '5m' } },
    { id: 'shadow-of-shadow', name: 'Shadow of Shadow', status: 'healthy', metric: { label: 'Watching', value: 'Yes' } },
    { id: 'ci-cd', name: 'CI/CD Pipelines', status: 'healthy', metric: { label: 'Builds', value: 12 } },
    { id: 'canary', name: 'Canary Deployment', status: 'planned', metric: { label: 'Status', value: 'Pending' } },
  ],
  ui_generative: [
    { id: 'generative-ui', name: 'Generative UI', status: 'healthy', metric: { label: 'Render Time', value: '50ms' } },
  ]
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
  {
    id: 'ui_generative',
    name: 'UI & GENERATIVE',
    description: 'AI-powered interface layer.',
    icon: Monitor,
    components: mockComponents.ui_generative,
  }
];
