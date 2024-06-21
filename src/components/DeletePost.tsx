import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { getCookie } from "../utils/token";

const DeletePost = ({ postId }: { postId: number }) => {
  const token = getCookie("token");
  const { hideModal } = useModalContext();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: () =>
      fetch(`${import.meta.env.VITE_API}/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!res.ok) {
          throw Error("Post could not be deleted");
        }
        return res.json();
      }),

    onError: () => {
      hideModal();
      toast.error("Post could not be deleted");
    },

    onSuccess: () => {
      hideModal();
      toast.success("Post deleted");
      navigate("/");
    },
  });

  const deletePost = () => {
    mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="text-red-500">
        <Trash size={32} />
      </div>
      <p className="font-semibold">
        Are you sure you want to delete this post?
      </p>
      <div className="flex w-full gap-3">
        <button
          className="w-full rounded-md bg-light-gray px-6 py-3 text-black transition-colors duration-200 hover:bg-dark-gray"
          onClick={() => hideModal()}
        >
          Cancel
        </button>
        <button
          className="w-full rounded-md bg-red-500 px-6 py-3 text-white transition-colors duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-light-gray disabled:text-black"
          disabled={isPending}
          onClick={deletePost}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeletePost;
