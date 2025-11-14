import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/response";
import { User } from "../model/User";
import { handleServerError } from "../middleware/errorHandler";

export const handleMailVerification = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.query;

    if (!id || !token) {
      return sendError(res, 400, "User ID or verification token is required.");
    }

    const user = await User.findById(id);

    if (!user) {
      return sendError(res, 404, "User not found.");
    }

    // Check if already verified
    if (user.isVerified) {
      return sendError(res, 400, "User already verified.");
    }

    // Check if token matches
    if (user.verificationToken !== token) {
      return sendError(res, 400, "Invalid or expired verification token.");
    }

    // Check token expiration
    if (user.verificationTime && user.verificationTime < new Date()) {
      return sendError(res, 400, "Verification link has expired.");
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = "";
    user.verificationTime = null;
    await user.save();

    return sendSuccess(res, 200, {}, "Email verified successfully!");
  } catch (error) {
    console.error("Verification Error:", error);
    return handleServerError(res, error as Error, "Verification failed");
  }
};
