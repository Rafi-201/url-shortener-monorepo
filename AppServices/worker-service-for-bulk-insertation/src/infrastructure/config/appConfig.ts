// src/infrastructure/config/appConfig.ts
import dotenv from "dotenv";

dotenv.config();

const appConfig = {
  appName: process.env.APP_NAME || "WorkerService", // Name of the application
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8080, // Application's port
  environment: process.env.APP_ENV || "development", // Environment (development, production, etc.)
  logLevel: process.env.APP_LOG_LEVEL || "info", // Log level (info, debug, etc.)
};

export { appConfig };
