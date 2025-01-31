// server.ts
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
export let httpServer: http.Server;

export const Main = async () => {
  logger.info("-----------------------");
  logger.info("Initializing API");
  logger.info("-----------------------");

  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  logger.info("-----------------------");
  logger.info("Logging and configuration");
  logger.info("-----------------------");

  application.use(loggingHandler);
  application.use(corsHandler);

  logger.info("-----------------------");
  logger.info("Controller routing");
  logger.info("-----------------------");

  application.get("/main/healthcheck", (req, res) => {
    res.status(200).json({ hello: "world!" });
  });

  application.use(routers);
  application.use(routeNotFound);
  application.use(errorHandler);

  httpServer = http.createServer(application);

  httpServer.listen(SERVER.PORT, SERVER.HOSTNAME, () => {
    logger.info(`Server running at http://${SERVER.HOSTNAME}:${SERVER.PORT}`);
  });

  await AppDataSource.initialize();
  logger.info("Database connected!");
};

export const Shutdown = async () => {
  if (httpServer) {
    return new Promise<void>((resolve) => {
      httpServer.close(async () => {
        if (AppDataSource.isInitialized) {
          await AppDataSource.destroy();
        }
        resolve();
      });
    });
  }
};

if (require.main === module) {
  Main().catch((error) => {
    logger.error("Failed to start server:", error);
  });
}
