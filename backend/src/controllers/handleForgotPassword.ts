import { Request, Response } from "express";
import crypto from "crypto";
import { User } from "../model/User";
import { sendEmail } from "../utils/mailer";
import { sendError, sendSuccess } from "../utils/response";
import { handleServerError } from "../middleware/errorHandler";
import { generateResetPasswordEmail } from "../utils/emailTemplates";

export const handleForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, 400, "Email is required.");

    const user = await User.findOne({ email });
    if (!user) return sendError(res, 404, "User not found.");

    // Generate a secure token
    const resetToken = crypto.randomBytes(64).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordTime = resetTokenExpiry;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password?id=${user.id}&token=${resetToken}`;
    const html = generateResetPasswordEmail(user.name, resetLink);

    await sendEmail(user.email, "Reset Your Password", html);

    return sendSuccess(
      res,
      200,
      {},
      "Password reset link sent! Check your email."
    );
  } catch (error) {
    return handleServerError(res, error as Error, "Forgot password failed");
  }
};
