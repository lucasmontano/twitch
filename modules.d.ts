declare namespace NodeJS {
  /**
   * Declaration of custom ENV variables
   */
  export interface ProcessEnv {
    APP_URL: string;
    APP_PORT: number;
  }
}
