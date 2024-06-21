import { z, ZodType } from "zod";

import { LoginFormData, SignUpFormData, UpdateUserFormData } from "../types";
import { NAME_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "./constants";

export const loginSchema: ZodType<LoginFormData> = z.object({
  emailUsername: z.string().min(1, { message: "Email/Username cannot empty." }),
  password: z.string().trim().min(1, { message: "Password cannot be empty." }),
});

export const signUpSchema: ZodType<SignUpFormData> = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "First name cannot be empty." })
      .regex(NAME_REGEX, {
        message:
          "Name can only start with an alphabet and must be minimum 3 characters.",
      }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name cannot be empty." })
      .regex(NAME_REGEX, {
        message:
          "Name can only start with an alphabet and must be minimum 3 characters.",
      }),
    email: z
      .string()
      .min(1, { message: "Email cannot empty." })
      .email("Email is invalid."),
    username: z
      .string()
      .trim()
      .min(1, { message: "Username cannot be empty." })
      .regex(USERNAME_REGEX, {
        message:
          "Username can only contain letters, digits, and underscores, must be minimum 7 character and start with letter or underscore.",
      }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password cannot be empty." })
      .regex(PASSWORD_REGEX, {
        message:
          "Password must contain minimum eight characters, at least one letter, one number and one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not Match.",
    path: ["confirmPassword"],
  });

export const userSchema: ZodType<UpdateUserFormData> = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name cannot be empty." })
    .regex(NAME_REGEX, {
      message: "Name can have only aphabets and must be minimum 3 characters.",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name cannot be empty." })
    .regex(NAME_REGEX, {
      message: "Name can have only aphabets and must be minimum 3 characters.",
    }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Username cannot be empty." })
    .regex(USERNAME_REGEX, {
      message:
        "Username can only contain letters, digits, and underscores, must be minimum 7 character and start with letter or underscore.",
    }),
});
