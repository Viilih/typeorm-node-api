import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error("Not found");
  logger.warn(error);

  res.status(404).json({
    error: {
      message: error.message,
    },
  });
  return;
}
