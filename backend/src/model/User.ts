import { Schema, model, type Document } from "mongoose";

export type UserRole = "user" | "admin" | "moderator";

export interface IUser extends Document {
  googleId?: string;
  githubId?: string;
  name: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  refreshToken?: string;
  profileImage?: {
    url: string;
    publicId: string;
  };
  isVerified: boolean;
  verificationToken?: string;
  verificationTime?: Date | null;
  resetPasswordToken?: string;
  resetPasswordTime?: Date | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    googleId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, minlength: 6 },
    phoneNumber: { type: String },
    refreshToken: { type: String, default: "" },
    profileImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: "" },
    verificationTime: { type: Date },
    resetPasswordToken: { type: String, default: "" },
    resetPasswordTime: { type: Date },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
