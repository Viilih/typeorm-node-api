import http from "http";
import express from "express";
import logger from "./config/logger";
import { loggingHandler } from "./middleware/loggingHandler";
import { corsHandler } from "./middleware/corsHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { SERVER } from "./config/config";
import { AppDataSource } from "./database/data-source";
import routers from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const setupApplication = () => {
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());
  application.use(loggingHandler);
  application.use(corsHandler);
  application.use(routers);
  application.use(routeNotFound);
  application.use(errorHandler);
};

export const startServer = () => {
  return new Promise<void>((resolve) => {
    httpServer = application.listen(SERVER.SERVER_PORT, () => {
      logger.info("-----------------------");
      logger.info(
        `Server started: ${SERVER.SERVER_HOSTNAME} : ${SERVER.SERVER_PORT}`
      );
      logger.info("-----------------------");
      resolve();
    });
  });
};

export const connectDatabase = async () => {
  await AppDataSource.initialize();
  logger.info("Database connected!");
};

export const Main = async () => {
  logger.info("-----------------------");
  logger.info("Initializing API");
  logger.info("-----------------------");

  setupApplication();
  await startServer();
  await connectDatabase();
};

export const Shutdown = () => {
  return new Promise<void>((resolve) => {
    if (httpServer) {
      httpServer.close(() => {
        AppDataSource.destroy().then(() => {
          logger.info("Server and database connection closed");
          resolve();
        });
      });
    } else {
      resolve();
    }
  });
};

if (require.main === module) {
  Main();
}
