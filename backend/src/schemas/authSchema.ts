import { z } from "zod";

export const authSchema = z.strictObject({
  email: z.email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password is too long"),
});

export type AuthInput = z.infer<typeof authSchema>;
