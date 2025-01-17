import http from "http";
import express from "express";
import logger from "./config/logger";
import { Request, Response, NextFunction } from "express";
import { loggingHandler } from "./middleware/loggingHandler";
import { corsHandler } from "./middleware/corsHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { SERVER } from "./config/config";
import { AppDataSource } from "./database/data-source";
import routers from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
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

  application.use(routers);
  application.use(routeNotFound);
  application.use(errorHandler);

  httpServer = http.createServer();
  application.listen(SERVER.SERVER_PORT, () => {
    logger.info("-----------------------");
    logger.info(
      `Server started: ${SERVER.SERVER_HOSTNAME} : ${SERVER.SERVER_PORT}`
    );
    logger.info("-----------------------");
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

AppDataSource.initialize().then(async () => {
  logger.info("database connected!");
  Main();
});
