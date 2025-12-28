import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/v1';

export interface SystemStatus {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  version: string;
  last_updated: string;
  resources: {
    cpu: number;
    memory: number;
    network: number;
  };
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
  component_id: string;
}

// Mock fetchers for now (since we're using MSW, fetch works fine)
async function fetchSystemStatus(): Promise<SystemStatus> {
  const res = await fetch(`${API_URL}/system/status`);
  if (!res.ok) throw new Error('Failed to fetch system status');
  return res.json();
}

async function fetchAlerts(): Promise<Alert[]> {
  const res = await fetch(`${API_URL}/system/alerts`);
  if (!res.ok) throw new Error('Failed to fetch alerts');
  return res.json();
}

// Hooks
export function useSystemStatus() {
  return useQuery({
    queryKey: ['system-status'],
    queryFn: fetchSystemStatus,
    refetchInterval: 30000, // 30s
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
    refetchInterval: 30000, // 30s
  });
}

// Mock hooks for data not yet in MSW handlers (Treasury, Loops)
// We'll simulate these for now to meet AC-04 and AC-05
export function useTreasuryBalance() {
  return useQuery({
    queryKey: ['treasury'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { balance: 12450 };
    },
    refetchInterval: 60000,
  });
}

export function useOpenLoops() {
  return useQuery({
    queryKey: ['open-loops'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { count: 3 };
    },
    refetchInterval: 60000,
  });
}
