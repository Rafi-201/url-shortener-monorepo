// src/infrastructure/config/dbConfig.ts
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost", // Database host (e.g., localhost, remote database server)
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, // Database port (default 5432 for PostgreSQL)
  username: process.env.DB_USER || "postgres", // Database username
  password: process.env.DB_PASS || "password", // Database password
  database: process.env.DB_NAME || "myDatabase", // Database name
  dialect: process.env.DB_DIALECT || "postgres", // Database dialect (e.g., postgres, mysql, sqlite)
  pool: {
    min: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN) : 0, // Minimum connections in pool
    max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX) : 5, // Maximum connections in pool
    acquire: process.env.DB_POOL_ACQUIRE
      ? parseInt(process.env.DB_POOL_ACQUIRE)
      : 30000, // Max time in ms to acquire connection
    idle: process.env.DB_POOL_IDLE ? parseInt(process.env.DB_POOL_IDLE) : 10000, // Max time in ms for idle connection
  },
};

export { dbConfig };
