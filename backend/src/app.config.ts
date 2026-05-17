import { LOG_LEVELS } from "@nestjs/common";

export default () => ({
  app: {
    name: "AWTP",
    port: process.env.port ?? 3000,
    logLevel: process.env.LOG_LEVEL ?? LOG_LEVELS[2], // todo: validate
    env: process.env.NODE_ENV ?? "production",
  },
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME
  }
});
