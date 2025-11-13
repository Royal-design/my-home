import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot exceed 50 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
