import dotenv from "dotenv";

dotenv.config();

// Environment flags
export const ENV = {
  DEVELOPMENT: process.env.NODE_ENV === "development",
  TEST: process.env.NODE_ENV === "test",
};

// Server configuration
export const SERVER = {
  HOSTNAME: process.env.SERVER_HOSTNAME || "localhost",
  PORT: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337,
};

// Database configuration
export const DATABASE = {
  HOST: process.env.DB_HOST || "localhost",
  PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  USERNAME: process.env.DB_USERNAME || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "postgres",
  NAME: process.env.DB_DATABASE || "localdb",
};
