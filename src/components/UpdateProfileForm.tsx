import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { UpdateUserFormData, UserResult } from "../types";
import { queryClient } from "../utils/clientQuery";
import { getCookie } from "../utils/token";
import { userSchema } from "../utils/zodSchemas";
import ErrorComponent from "./reusable/ErrorComponent";

interface Props {
  firstName: string;
  lastName: string;
  username: string;
}

const UpdateProfileForm = ({ firstName, lastName, username }: Props) => {
  const { setShowModal } = useModalContext();
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
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("username", username);
  }, [setValue, firstName, lastName, username]);

  const token = getCookie("token");

  const { mutate, error } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (data: UpdateUserFormData) =>
      fetch("http://localhost:3000/api/me/", {
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
      queryClient.invalidateQueries({ queryKey: ["loggedUser"] });
      toast.success("Profile Updated");
      setShowModal(null);
    },
  });

  if (error) return <ErrorComponent />;

  const registerUser = (data: UpdateUserFormData) => {
    mutate(data);
  };
  return (
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
        <button className="w-full rounded-md bg-pink p-3 text-white transition-colors duration-200 hover:bg-dark-pink">
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
