import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

type ErrorWithMessage = {
  message?: string;
  [key: string]: any;
};

export const handleServerError = (
  res: Response,
  error: ErrorWithMessage,
  message: string = "Internal server error"
) => {
  console.error(message + ":", error);
  return res.status(500).json({ success: false, message });
};
