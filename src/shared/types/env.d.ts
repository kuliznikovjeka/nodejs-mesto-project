declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    SERVER_PORT: string;
    JWT_SECRET: string;
  }
}
