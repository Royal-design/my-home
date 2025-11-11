import { Request, Response, NextFunction } from "express";
import type { UserRole } from "../model/User";

export const verifyRole = (role: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
};
