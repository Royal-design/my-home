import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";
import jwt from "jsonwebtoken";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) return sendError(res, 401, "Unauthorized user");
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return sendError(res, 403, "Forbidden access");
    }
    if (typeof decoded === "object" && decoded !== null) {
      req.user = {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
      };
    }

    next();
  });
};
