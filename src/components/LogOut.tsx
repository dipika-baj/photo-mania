import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuthContext } from "../context/AuthContext";
import { getCookie } from "../utils/token";

const LogOut = () => {
  const { logOut } = useAuthContext();

  const token = getCookie("token");

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () =>
      fetch(`${import.meta.env.VITE_API}/auth/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!res.ok) {
          throw Error("Logout unsuccesful");
        }
        return res.json();
      }),

    onSuccess: () => {
      logOut();
      toast.success("Logout sucessful");
      navigate("/");
    },

    onError: () => {
      toast.error("Logout unsucessful");
    },
  });

  return (
    <button
      className="px-4 py-2 text-left hover:bg-light-gray"
      onClick={() => mutate()}
      disabled={isPending}
    >
      Logout
    </button>
  );
};

export default LogOut;
