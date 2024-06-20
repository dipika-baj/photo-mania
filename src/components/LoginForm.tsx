import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAuthContext } from "../context/AuthContext";
import { useModalContext } from "../context/ModalContext";
import { ErrorResponse, LoginFormData } from "../types";
import { loginSchema } from "../utils/zodSchemas";

const LoginForm = () => {
  const [responseError, setResponseError] = useState<ErrorResponse | null>();
  const { hideModal } = useModalContext();
  const { logIn } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormData) =>
      fetch(`${import.meta.env.VITE_API}/auth/login`, {
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
        hideModal();
        logIn(data.data);
        toast.success("Login Successful");
      }
    },

    onError: () => {
      return <p>An Error has occured</p>;
    },
  });

  const registerUser = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(registerUser)}>
      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          <div className="w-full">
            <input
              {...register("emailUsername")}
              type="text"
              placeholder="Email or Username"
              className="w-full rounded-md border-2 p-2"
            />
            {errors.emailUsername && (
              <span className="text-red-600">
                {errors.emailUsername.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full rounded-md border-2 p-2"
            />
          </div>
        </div>
        {responseError?.code === "incorrect" && (
          <span className="text-red-600">{responseError.message}</span>
        )}
        <input
          type="submit"
          value={"Log In"}
          className="w-full cursor-pointer rounded-md bg-blue p-3 text-white transition-colors duration-200 hover:bg-dark-blue disabled:cursor-not-allowed disabled:bg-light-gray disabled:text-black"
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default LoginForm;
