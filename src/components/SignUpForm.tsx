import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { ErrorResponse, SignUpFormData } from "../types";
import { signUpSchema } from "../utils/zodSchemas";

interface Prop {
  onTabChange: (tab: string) => void;
}

const SignUpForm = ({ onTabChange }: Prop) => {
  const [responseError, setResponseError] = useState<ErrorResponse | null>();

  const { hideModal } = useModalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: SignUpFormData) =>
      fetch(`${import.meta.env.VITE_API}/auth/register`, {
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
        toast.success("Register successful");
      }
    },

    onError: () => {
      toast.error("Register unsuccessful");
      hideModal();
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
    <form
      className="w-full"
      onSubmit={handleSubmit(registerUser)}
      autoComplete="off"
    >
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
              type="text"
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
          className="w-full cursor-pointer rounded-md bg-blue p-3 text-white transition-colors duration-200 hover:bg-dark-blue disabled:cursor-not-allowed disabled:bg-light-gray disabled:text-black"
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default SignUpForm;
