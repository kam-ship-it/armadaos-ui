/**
 * Environment Configuration
 * 
 * Centralized configuration for API endpoints and feature flags.
 * Uses Vite environment variables.
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
    maxRetries: parseInt(import.meta.env.VITE_API_MAX_RETRIES || '3', 10),
    retryDelay: parseInt(import.meta.env.VITE_API_RETRY_DELAY || '1000', 10),
  },
  features: {
    enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
    enableErrorReporting: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
  },
  nexus: {
    streamEnabled: import.meta.env.VITE_NEXUS_STREAM_ENABLED !== 'false',
    typingDelay: parseInt(import.meta.env.VITE_NEXUS_TYPING_DELAY || '20', 10),
  },
} as const;

// Validate configuration
if (!config.api.baseUrl) {
  console.warn('[Config] API base URL not configured. Using default: http://localhost:8000/api/v1');
}

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('[Config] Environment:', {
    apiBaseUrl: config.api.baseUrl,
    mockDataEnabled: config.features.enableMockData,
  });
}
