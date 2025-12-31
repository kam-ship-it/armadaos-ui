// Browser Automation WebSocket Client
// BATCH-DESKTOP-00: Foundation Layer

import { BrowserMessage, BrowserResponse } from '../types/desktop';

export class BrowserClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private messageQueue: BrowserMessage[] = [];
  private listeners: Map<string, (response: BrowserResponse) => void> = new Map();

  constructor(private url: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log('Browser WebSocket connected');
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
          this.startHeartbeat();
          this.flushMessageQueue();
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const response: BrowserResponse = JSON.parse(event.data);
            const listener = this.listeners.get(response.sessionId);
            if (listener) {
              listener(response);
              this.listeners.delete(response.sessionId);
            }
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('Browser WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('Browser WebSocket closed');
          this.stopHeartbeat();
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      this.connect().catch((error) => {
        console.error('Reconnect failed:', error);
      });
    }, delay);
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // 30 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendMessage(message);
      }
    }
  }

  sendMessage(message: BrowserMessage): Promise<BrowserResponse> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        // Queue message for later
        this.messageQueue.push(message);
        reject(new Error('WebSocket not connected'));
        return;
      }

      // Register listener for response
      this.listeners.set(message.sessionId, resolve);

      // Send message
      try {
        this.ws.send(JSON.stringify(message));
      } catch (error) {
        this.listeners.delete(message.sessionId);
        reject(error);
      }

      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.listeners.has(message.sessionId)) {
          this.listeners.delete(message.sessionId);
          reject(new Error('Request timeout'));
        }
      }, 30000);
    });
  }

  disconnect() {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Singleton instance
let browserClient: BrowserClient | null = null;

export function getBrowserClient(): BrowserClient {
  if (!browserClient) {
    const url =
      import.meta.env.VITE_BROWSER_WS_URL || 'ws://localhost:8300/browser';
    browserClient = new BrowserClient(url);
  }
  return browserClient;
}

export function connectBrowserClient(): Promise<void> {
  return getBrowserClient().connect();
}

export function disconnectBrowserClient() {
  if (browserClient) {
    browserClient.disconnect();
    browserClient = null;
  }
}
