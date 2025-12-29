export interface Batch {
  id: string;
  title: string;
  agent: string;
  status: 'proposed' | 'approved' | 'in-progress' | 'verifying' | 'complete';
  progress: number;
  priority: 'P0' | 'P1' | 'P2';
}

export interface Agent {
  id: string;
  name: string;
  version: string;
  status: 'idle' | 'working' | 'error' | 'offline';
  currentTask?: string;
  health: number;
  arcConsumption: number;
}

export interface Threat {
  id: string;
  type: 'security' | 'performance' | 'drift' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  timestamp: string;
  source: string;
}

export const mockBatches: Batch[] = [
  { id: 'BATCH-GM-01', title: 'God Mode UI Shell', agent: 'Atlas 2', status: 'complete', progress: 100, priority: 'P0' },
  { id: 'BATCH-GM-02', title: 'Architecture Lens', agent: 'Atlas 2', status: 'complete', progress: 100, priority: 'P0' },
  { id: 'BATCH-GM-03', title: 'Constitution Lens', agent: 'Atlas 2', status: 'complete', progress: 100, priority: 'P0' },
  { id: 'BATCH-GM-04', title: 'Battlefield Lens', agent: 'Atlas 2', status: 'in-progress', progress: 45, priority: 'P0' },
  { id: 'BATCH-GM-05', title: 'Nexus Integration', agent: 'Atlas 2', status: 'approved', progress: 0, priority: 'P0' },
  { id: 'BATCH-INF-01', title: 'Vector DB Setup', agent: 'Hephaestus', status: 'verifying', progress: 90, priority: 'P1' },
  { id: 'BATCH-SEC-01', title: 'Auth0 Integration', agent: 'Shadow', status: 'proposed', progress: 0, priority: 'P1' },
];

export const mockAgents: Agent[] = [
  { id: 'ag-1', name: 'Atlas 2', version: 'v2.1.0', status: 'working', currentTask: 'Executing BATCH-GM-04', health: 98, arcConsumption: 12.5 },
  { id: 'ag-2', name: 'Hephaestus', version: 'v1.0.5', status: 'working', currentTask: 'Optimizing Vector Index', health: 100, arcConsumption: 8.2 },
  { id: 'ag-3', name: 'Shadow', version: 'v3.0.1', status: 'idle', health: 100, arcConsumption: 0.5 },
  { id: 'ag-4', name: 'Nexus', version: 'v0.9.0', status: 'working', currentTask: 'Analyzing Causal Chains', health: 95, arcConsumption: 45.0 },
  { id: 'ag-5', name: 'Drift Monitor', version: 'v1.2.0', status: 'working', currentTask: 'Scanning for drift', health: 100, arcConsumption: 2.1 },
];

export const mockThreats: Threat[] = [
  { id: 'th-1', type: 'drift', severity: 'medium', summary: 'Context drift detected in sector 7G', timestamp: new Date().toISOString(), source: 'Drift Monitor' },
  { id: 'th-2', type: 'performance', severity: 'low', summary: 'API latency spike (150ms)', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), source: 'Health Check' },
  { id: 'th-3', type: 'security', severity: 'critical', summary: 'Unauthorized access attempt blocked', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), source: 'Shadow' },
];
