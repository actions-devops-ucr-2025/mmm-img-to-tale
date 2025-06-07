interface ImportMetaEnv {
  readonly VITE_VISION_ENDPOINT: string;
  readonly VITE_VISION_KEY: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_OPENAI_ENDPOINT: string;
  readonly VITE_OPENAI_MODEL_NAME: string;
  // Add more custom env variables here as needed
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}