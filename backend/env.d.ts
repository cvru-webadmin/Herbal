declare global {
  namespace Bun {
    interface ProcessEnv {
      AWS_S3_END_POINT: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    userSession: any;
  }
}

export {};
