import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

// Custom AppError class
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Centralized error handler middleware
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle operational errors (instances of AppError)
  if (err instanceof AppError) {
    logger.error("Operational error:", err.message);

    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Handle unexpected errors (bugs, DB errors, etc.)
  logger.error("Unexpected error:", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
