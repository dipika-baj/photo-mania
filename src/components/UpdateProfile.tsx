import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { UpdateUserFormData, User, UserResult } from "../types";
import { queryClient } from "../utils/clientQuery";
import { getCookie } from "../utils/token";
import { userSchema } from "../utils/zodSchemas";
import H3 from "./reusable/typography/H3";

interface Props {
  user: User;
}

const UpdateProfile = ({ user }: Props) => {
  const { hideModal } = useModalContext();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("username", user.username);
  }, [setValue, user.firstName, user.lastName, user.username]);

  const token = getCookie("token");

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (data: UpdateUserFormData) =>
      fetch(`${import.meta.env.VITE_API}/user`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    onSuccess: (data: UserResult) => {
      if (data.code === "username") {
        setError("username", { type: "manual", message: data.message });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated");
      hideModal();
    },

    onError: () => {
      toast.error("Profile could not be updated");
      hideModal();
    },
  });

  const registerUser = (data: UpdateUserFormData) => {
    mutate(data);
  };
  return (
    <div className="flex flex-col gap-4">
      <H3>Update Profile</H3>
      <form className="w-full" onSubmit={handleSubmit(registerUser)}>
        <div className="md:flex-cpl flex flex-col gap-6">
          <div className="w-full">
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full rounded-md border-2 p-2 capitalize"
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>

          <div className="w-full">
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="w-full rounded-md border-2 p-2 capitalize"
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
            )}
          </div>
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
          </div>
          <button
            className="w-full rounded-md bg-blue p-3 text-white transition-colors duration-200 hover:bg-dark-blue disabled:cursor-not-allowed disabled:bg-light-gray disabled:text-black"
            disabled={isPending}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
