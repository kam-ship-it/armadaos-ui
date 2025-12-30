/**
 * API Client
 * 
 * Centralized HTTP client for all God Mode API requests.
 * Features:
 * - Automatic retry with exponential backoff
 * - Error handling and transformation
 * - Request/response interceptors
 * - TypeScript type safety
 */

import { config } from './config';
import type { ApiError } from '@/types/api/god-mode';

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

interface RequestOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

class ApiClient {
  private baseUrl: string;
  private timeout: number;
  private maxRetries: number;
  private retryDelay: number;

  constructor() {
    this.baseUrl = config.api.baseUrl;
    this.timeout = config.api.timeout;
    this.maxRetries = config.api.maxRetries;
    this.retryDelay = config.api.retryDelay;
  }

  /**
   * Sleep for exponential backoff
   */
  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(status?: number): boolean {
    if (!status) return true; // Network errors are retryable
    return status === 408 || status === 429 || status >= 500;
  }

  /**
   * Make HTTP request with retry logic
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      retries = this.maxRetries,
      retryDelay = this.retryDelay,
      ...fetchOptions
    } = options;

    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
          },
        });

        clearTimeout(timeoutId);

        // Handle non-OK responses
        if (!response.ok) {
          const errorData: ApiError = await response.json().catch(() => ({
            error: 'UnknownError',
            message: `HTTP ${response.status}: ${response.statusText}`,
          }));

          // Retry on retryable errors
          if (this.isRetryableError(response.status) && attempt < retries) {
            const delay = retryDelay * Math.pow(2, attempt);
            console.warn(`[API] Retrying request to ${endpoint} (attempt ${attempt + 1}/${retries}) after ${delay}ms`);
            await this.sleep(delay);
            continue;
          }

          throw new ApiClientError(
            errorData.message || 'API request failed',
            response.status,
            errorData.details
          );
        }

        // Parse successful response
        const data: T = await response.json();
        return data;

      } catch (error) {
        lastError = error as Error;

        // Don't retry on abort (timeout)
        if (error instanceof Error && error.name === 'AbortError') {
          throw new ApiClientError('Request timeout', 408);
        }

        // Don't retry on non-retryable errors
        if (error instanceof ApiClientError && !this.isRetryableError(error.status)) {
          throw error;
        }

        // Retry on network errors
        if (attempt < retries) {
          const delay = retryDelay * Math.pow(2, attempt);
          console.warn(`[API] Retrying request to ${endpoint} (attempt ${attempt + 1}/${retries}) after ${delay}ms`);
          await this.sleep(delay);
          continue;
        }
      }
    }

    // All retries exhausted
    clearTimeout(timeoutId);
    throw lastError || new ApiClientError('Request failed after all retries');
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export error class for error handling
export { ApiClientError as ApiError };
