import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../model/User";
import { sendError, sendSuccess } from "../utils/response";
import { handleServerError } from "../middleware/errorHandler";

export const handleResetPassword = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.query;
    const { password } = req.body;

    if (!id || !token) return sendError(res, 400, "Invalid reset link.");
    if (!password) return sendError(res, 400, "Password is required.");

    const user = await User.findById(id);
    if (!user) return sendError(res, 404, "User not found.");

    if (!user.resetPasswordToken || user.resetPasswordToken !== token)
      return sendError(res, 400, "Invalid or expired reset token.");

    if (user.resetPasswordTime && user.resetPasswordTime < new Date())
      return sendError(res, 400, "Reset token has expired.");

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = "";
    user.resetPasswordTime = null;
    await user.save();

    return sendSuccess(res, 200, {}, "Password has been reset successfully!");
  } catch (error) {
    return handleServerError(res, error as Error, "Reset password failed");
  }
};
