import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { useAuthContext } from "../context/authContext";
import { getToken } from "../utils/token";

const LogOut = () => {
  const { logOut } = useAuthContext();
  const [enabled, setEnabled] = useState(false);

  const token = getToken();

  const { isLoading, error } = useQuery({
    enabled: enabled,
    queryKey: ["logout"],
    queryFn: () =>
      fetch("http://localhost:3000/api/auth/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          logOut();
          toast.success("Logout Sucessful");
          setEnabled(false);
          return res.json();
        }
      }),
  });

  if (error) toast.error("Unsucessful");

  return (
    <button
      className="text-white"
      onClick={() => setEnabled(true)}
      disabled={isLoading}
    >
      Logout
    </button>
  );
};

export default LogOut;
