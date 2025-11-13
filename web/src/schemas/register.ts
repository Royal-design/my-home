import { z } from "zod";

export const registerSchema = z.strictObject({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: z.email("Invalid email address"),

  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),

  phoneNumber: z
    .string("Phone number is required")
    .regex(/^[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
