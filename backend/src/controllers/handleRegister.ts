import { Request, Response } from "express";
import bcrypt from "bcrypt";
import type { RegisterInput } from "../schemas/registerSchema";
import { handleServerError } from "../middleware/errorHandler";
import { User } from "../model/User";
import { sendError, sendSuccess } from "../utils/response";
import crypto from "crypto";
import { generateVerificationEmail } from "../utils/emailTemplates";
import { sendEmail } from "../utils/mailer";

export const handleRegister = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return sendError(res, 409, "User already exist!");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const verificationToken = crypto.randomBytes(64).toString("hex");
    const verificationTime = new Date(Date.now() + 15 * 60 * 1000);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      verificationToken,
      verificationTime,
    });

    const verifyLink = `${process.env.CLIENT_URL}/verify-email?id=${user.id}&token=${verificationToken}`;
    const html = generateVerificationEmail(user.name, verifyLink);
    await sendEmail(user.email, "Verify your email", html);

    return sendSuccess(
      res,
      201,
      { email: user.email },
      "Registration successful! Check your email to verify your account."
    );
  } catch (error) {
    return handleServerError(res, error as Error, "Registration failed");
  }
};
