/**
 * Simplified Type Exports
 * 
 * Re-exports OpenAPI schema types in a simpler format for easier consumption.
 */

import type { components as ArchitectureComponents } from './api/architecture';
import type { components as BattlefieldComponents } from './api/battlefield';
import type { components as ConstitutionComponents } from './api/constitution';
import type { components as NexusComponents } from './api/nexus';
import type { components as SystemComponents } from './api/system';

// Architecture types
export type Component = ArchitectureComponents['schemas']['Component'];
export type ComponentMetrics = ArchitectureComponents['schemas']['ComponentMetrics'];
export type ComponentDetail = ArchitectureComponents['schemas']['ComponentDetail'];
export type Event = ArchitectureComponents['schemas']['Event'];

// Battlefield types
export type Batch = BattlefieldComponents['schemas']['Batch'];
export type Agent = BattlefieldComponents['schemas']['Agent'];
export type Threat = BattlefieldComponents['schemas']['Threat'];
export type BatchesResponse = BattlefieldComponents['schemas']['BatchesResponse'];
export type AgentsResponse = BattlefieldComponents['schemas']['AgentsResponse'];
export type ThreatsResponse = BattlefieldComponents['schemas']['ThreatsResponse'];

// Constitution types
export type Article = ConstitutionComponents['schemas']['Article'];
export type ConstitutionEvent = ConstitutionComponents['schemas']['Event'];
export type ArticlesResponse = ConstitutionComponents['schemas']['ArticlesResponse'];
export type EventsResponse = ConstitutionComponents['schemas']['EventsResponse'];

// Nexus types
export type ChatMessage = NexusComponents['schemas']['ChatMessage'];
export type ChatRequest = NexusComponents['schemas']['ChatRequest'];
export type ChatResponse = NexusComponents['schemas']['ChatResponse'];
export type ChatContext = NexusComponents['schemas']['ChatContext'];
export type ChatHistoryResponse = NexusComponents['schemas']['ChatHistoryResponse'];
export type StreamChunk = NexusComponents['schemas']['StreamChunk'];

// System types
export type SystemStatus = SystemComponents['schemas']['SystemStatus'];
export type SystemHealth = SystemComponents['schemas']['SystemHealth'];
export type SystemMetrics = SystemComponents['schemas']['SystemMetrics'];

// Common types from god-mode.d.ts
export type {
  ApiStatus,
  ComponentStatus,
  EventType,
  BatchStatus,
  BatchPriority,
  AgentStatus,
  ThreatType,
  ThreatSeverity,
  NexusResponseType,
  LensType,
  ApiError,
  ApiResponse,
  PaginatedResponse,
} from './api/god-mode';
