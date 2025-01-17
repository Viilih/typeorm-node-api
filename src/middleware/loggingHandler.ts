import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export function loggingHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(
    `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logger.info(
      `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
}
