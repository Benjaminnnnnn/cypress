import { z } from "zod";
export const LoginFormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
