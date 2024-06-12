import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

import { ErrorResponse, SignUpFormData } from "../types";
import { NAME_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "../utils/constants";

interface Prop {
  onTabChange: (tab: string) => void;
}

const SignUpForm = ({ onTabChange }: Prop) => {
  const [responseError, setResponseError] = useState<ErrorResponse | null>();
  const schema: ZodType<SignUpFormData> = z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, { message: "First name cannot be empty." })
        .regex(NAME_REGEX, {
          message:
            "Name can have only aphabets and must be minimum 3 characters.",
        }),
      lastName: z
        .string()
        .trim()
        .min(1, { message: "Last name cannot be empty." })
        .regex(NAME_REGEX, {
          message:
            "Name can have only aphabets and must be minimum 3 characters.",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: (data: SignUpFormData) =>
      fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return res.json();
      }),
    onSuccess: (data) => {
      if (data.status === "error") {
        setResponseError(data);
      } else {
        setResponseError(null);
        onTabChange("login");
      }
    },

    onError: () => {
      return <p>An Error has occured</p>;
    },
  });

  const registerUser = (data: SignUpFormData) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data.status === "error") {
          setResponseError(data);
        } else {
          setResponseError(null);
        }
      },
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(registerUser)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/2">
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full rounded-md border-2 p-2"
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="w-full rounded-md border-2 p-2"
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
            )}
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-full">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full rounded-md border-2 p-2"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
            {responseError?.code === "email" && (
              <span className="text-red-600">{responseError.message}</span>
            )}
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-full">
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="w-full rounded-md border-2 p-2"
            />
            {errors.username && (
              <span className="text-red-600">{errors.username.message}</span>
            )}
            {responseError?.code === "username" && (
              <span className="text-red-600">{responseError.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/2">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full rounded-md border-2 p-2"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-md border-2 p-2"
            />
            {errors.confirmPassword && (
              <span className="text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <input
          type="submit"
          value={"Sign Up"}
          className="hover:bg-dark-pink w-full rounded-md bg-pink p-3 text-white transition-colors duration-200"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
