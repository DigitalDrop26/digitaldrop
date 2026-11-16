/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*?img" {
  const value: {
    src: string;
    srcSet: string;
    width: number;
    height: number;
  };
  export default value;
}
