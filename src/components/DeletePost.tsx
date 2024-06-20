import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { getCookie } from "../utils/token";
import Loading from "./reusable/Loading";

const DeletePost = ({ postId }: { postId: number }) => {
  const [enabled, setEnabled] = useState(false);
  const token = getCookie("token");
  const { hideModal } = useModalContext();
  const navigate = useNavigate();

  const { isLoading, error } = useQuery({
    enabled: enabled,
    queryKey: ["logout"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/me/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          setEnabled(false);
          hideModal();
          toast.success("Post Deleted");
          navigate("/");
          return res.json();
        }
      }),
  });

  if (error) {
    hideModal();
    toast.error("Unsucessful");
  }

  if (isLoading) {
    return <Loading />;
  }

  /**
   * TODO
   * Cancel button color on hover
   */
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
          className="w-full rounded-md bg-light-gray px-6 py-3 text-black transition-colors duration-200 hover:bg-blue hover:text-white"
          onClick={() => hideModal()}
        >
          Cancel
        </button>
        <button
          className="w-full rounded-md bg-red-500 px-6 py-3 text-white transition-colors duration-200 hover:bg-red-600"
          onClick={() => setEnabled(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeletePost;
