/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_API_MAX_RETRIES: string;
  readonly VITE_API_RETRY_DELAY: string;
  readonly VITE_ENABLE_MOCK_DATA: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
  readonly VITE_NEXUS_STREAM_ENABLED: string;
  readonly VITE_NEXUS_TYPING_DELAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
