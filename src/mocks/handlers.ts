import { http, HttpResponse } from 'msw';

const API_URL = 'http://localhost:8080/v1';

export const handlers = [
  // --- GLOBAL (PULSE) ---
  http.get(`${API_URL}/system/status`, () => {
    return HttpResponse.json({
      status: 'healthy',
      uptime: 123456,
      version: '1.0.0',
      last_updated: new Date().toISOString(),
      resources: {
        cpu: 34,
        memory: 56,
        network: 21
      }
    });
  }),

  http.get(`${API_URL}/system/alerts`, () => {
    return HttpResponse.json([
      {
        id: 'alert-1',
        severity: 'warning',
        message: 'High memory usage in Codex-7',
        timestamp: new Date().toISOString(),
        component_id: 'codex-7'
      }
    ]);
  }),

  http.post(`${API_URL}/system/kill-switch`, () => {
    return HttpResponse.json({
      status: 'shutdown_initiated',
      timestamp: new Date().toISOString()
    });
  }),

  // --- ARCHITECTURE ---
  http.get(`${API_URL}/components`, () => {
    return HttpResponse.json([
      {
        id: 'comp-1',
        name: 'Core API',
        type: 'service',
        status: 'healthy',
        tier: 'core',
        metrics: { cpu: 12, memory: 45 }
      },
      {
        id: 'comp-2',
        name: 'Auth Service',
        type: 'service',
        status: 'degraded',
        tier: 'core',
        metrics: { cpu: 89, memory: 78 }
      }
    ]);
  }),

  http.get(`${API_URL}/components/:id`, ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Core API',
      type: 'service',
      status: 'healthy',
      tier: 'core',
      metrics: { cpu: 12, memory: 45 },
      logs: ['Log entry 1', 'Log entry 2']
    });
  }),

  http.get(`${API_URL}/components/:id/metrics`, () => {
    return HttpResponse.json({
      cpu: [10, 12, 15, 12, 11],
      memory: [40, 42, 45, 44, 45],
      requests: [100, 120, 150, 130, 140]
    });
  }),

  http.get(`${API_URL}/components/:id/logs`, () => {
    return HttpResponse.json([
      { timestamp: new Date().toISOString(), level: 'info', message: 'Service started' },
      { timestamp: new Date().toISOString(), level: 'warn', message: 'High latency detected' }
    ]);
  }),

  // --- CONSTITUTION ---
  http.get(`${API_URL}/constitution/events`, () => {
    return HttpResponse.json([
      {
        id: 'evt-1',
        type: 'deployment',
        description: 'Deployed version 1.2.0',
        timestamp: new Date().toISOString(),
        actor: 'Atlas 2'
      }
    ]);
  }),

  http.get(`${API_URL}/constitution/rules`, () => {
    return HttpResponse.json([
      { id: 'rule-1', name: 'The First Law', description: 'Nothing is real until it is in GitHub', active: true }
    ]);
  }),

  http.post(`${API_URL}/constitution/approve/:id`, () => {
    return HttpResponse.json({
      status: 'approved',
      timestamp: new Date().toISOString()
    });
  }),

  // --- BATTLEFIELD ---
  http.get(`${API_URL}/batches`, () => {
    return HttpResponse.json([
      {
        id: 'batch-gm-00',
        title: 'Project Foundation',
        status: 'in_progress',
        assignee: 'Atlas 2',
        priority: 'P0'
      },
      {
        id: 'batch-gm-01',
        title: 'UI Shell',
        status: 'pending',
        assignee: 'Atlas 2',
        priority: 'P1'
      }
    ]);
  }),

  http.get(`${API_URL}/agents`, () => {
    return HttpResponse.json([
      { id: 'agent-1', name: 'Atlas 2', role: 'UI/UX', status: 'active' },
      { id: 'agent-2', name: 'Nexus', role: 'Orchestrator', status: 'active' }
    ]);
  }),

  http.get(`${API_URL}/threats`, () => {
    return HttpResponse.json([
      { id: 'threat-1', type: 'security', severity: 'low', description: 'Unusual login attempt' }
    ]);
  }),

  // --- NEXUS ---
  http.post(`${API_URL}/nexus/query`, async ({ request }) => {
    const body = await request.json() as { query: string };
    return HttpResponse.json({
      response: `Nexus heard: "${body.query}". I am standing by.`,
      timestamp: new Date().toISOString(),
      intent: 'general_query'
    });
  })
];
