import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/HttpException";
import logger from "../config/logger";

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  logger.error(
    `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
  );

  res.status(status).json({ message });
};
