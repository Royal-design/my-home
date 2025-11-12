import { handleServerError } from "../middleware/errorHandler";
import { Request, Response } from "express";
import type { AuthInput } from "../schemas/authSchema";
import { User, type IUser } from "../model/User";
import { sendError, sendSuccess } from "../utils/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer";
import { generateWelcomeEmail } from "../utils/emailTemplates";

export const handleLogin = async (
  req: Request<{}, {}, AuthInput>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) return sendError(res, 404, "user not found");
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password!);
    if (!isPasswordMatch) return sendError(res, 400, "invalid credentials");

    const accessToken = jwt.sign(
      { id: foundUser.id, role: foundUser.role, name: foundUser.name },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: foundUser.id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    const returnUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      accessToken,
    };

    return sendSuccess(res, 200, returnUser, "Login successfully!");
  } catch (error) {
    return handleServerError(res, error as Error, "Login failed");
  }
};

export const handleSocialLogin = async (req: Request, res: Response) => {
  try {
    const userProfile = req.user as IUser;
    if (!userProfile)
      return res.status(400).json({ message: "User not found" });

    const accessToken = jwt.sign(
      { id: userProfile.id, role: userProfile.role, name: userProfile.name },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: userProfile.id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    await User.findByIdAndUpdate(userProfile.id, { refreshToken });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.CLIENT_URL}/profile?token=${accessToken}`);
  } catch (error) {
    return handleServerError(res, error as Error, "Social login failed");
  }
};
