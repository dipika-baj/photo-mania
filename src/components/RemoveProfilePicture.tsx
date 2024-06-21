import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { queryClient } from "../utils/clientQuery";
import { getCookie } from "../utils/token";

const RemoveProfilePicture = () => {
  const { hideModal } = useModalContext();
  const token = getCookie("token");

  const { mutate } = useMutation({
    mutationKey: ["updateProfilePic"],
    mutationFn: () =>
      fetch(`${import.meta.env.VITE_API}/user/removeProfileImage`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        return res.json();
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile Picture Removed");
      hideModal();
    },
  });

  const removeImage = () => {
    mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-red-500">
        <Trash size={32} />
      </div>
      <p className="font-semibold">
        Are you sure you want to remove the image??
      </p>
      <div className="flex w-full gap-3">
        <button
          className="w-full rounded-md bg-light-gray px-6 py-3 text-black transition-colors duration-200 hover:bg-blue hover:text-white"
          onClick={() => hideModal()}
        >
          Cancel
        </button>
        <button
          onClick={removeImage}
          className="w-full rounded-md bg-red-500 px-6 py-3 text-white transition-colors duration-200 hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default RemoveProfilePicture;
