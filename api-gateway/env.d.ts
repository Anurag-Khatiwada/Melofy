// env.d.ts (no imports!)
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    USER_SERVICE: string;
  }
}
