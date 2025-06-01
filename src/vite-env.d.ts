interface ImportMetaEnv {
  readonly VITE_VISION_ENDPOINT: string;
  readonly VITE_VISION_KEY: string;
  // Add more custom env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}