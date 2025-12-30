/**
 * ArmadaOS God Mode API Types
 * 
 * Unified TypeScript type definitions for all God Mode API endpoints.
 * Generated from OpenAPI specifications.
 * 
 * @version 1.0.0
 * @generated 2025-12-29
 */

// Re-export all API types
export * from './architecture';
export * from './constitution';
export * from './battlefield';
export * from './nexus';
export * from './system';

// Common types used across all APIs
export type ApiStatus = 'optimal' | 'degraded' | 'critical';
export type ComponentStatus = 'healthy' | 'degraded' | 'down';
export type EventType = 'success' | 'failure' | 'warning' | 'info';
export type BatchStatus = 'proposed' | 'approved' | 'in_progress' | 'verifying' | 'complete';
export type BatchPriority = 'P0' | 'P1' | 'P2';
export type AgentStatus = 'working' | 'idle' | 'offline';
export type ThreatType = 'drift' | 'performance' | 'security';
export type ThreatSeverity = 'critical' | 'high' | 'medium' | 'low';
export type NexusResponseType = 'guide' | 'interpret' | 'challenge' | 'general';
export type LensType = 'architecture' | 'constitution' | 'battlefield';

// API Error type
export interface ApiError {
  error: string;
  message: string;
  details?: Record<string, unknown>;
}

// API Response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  next_cursor?: string | null;
  total?: number;
}

// Date range filter
export interface DateRangeFilter {
  from?: string;
  to?: string;
}

// Common filters
export interface ComponentFilter {
  component?: string;
  type?: EventType;
  agent?: string;
}

export interface BatchFilter {
  status?: BatchStatus;
  priority?: BatchPriority;
  agent?: string;
}

export interface AgentFilter {
  status?: AgentStatus;
}

export interface ThreatFilter {
  type?: ThreatType;
  severity?: ThreatSeverity;
  resolved?: boolean;
}
