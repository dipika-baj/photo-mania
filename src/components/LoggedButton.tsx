import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useModalContext } from "../context/ModalContext";
import { ActiveModal, UserResult } from "../types";
import { getImageURL } from "../utils/imageUrl";
import { getInitials } from "../utils/profile";
import { getCookie } from "../utils/token";
import LogOut from "./LogOut";

const LoggedButton = () => {
  const [dropdown, setDropDown] = useState(false);
  const { setShowModal } = useModalContext();
  const token = getCookie("token");

  const { data } = useQuery<UserResult>({
    queryKey: ["loggedUser"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/me/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  if (!data) {
    return;
  }
  const user = data.data;

  return (
    <>
      <div className="relative flex items-center gap-2">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue"
          onClick={() => {
            setShowModal(ActiveModal.createPost);
          }}
        >
          <Plus strokeWidth={3} />
        </button>

        <div className="flex items-center gap-1 text-white">
          <Link to="/profile">
            <div className="h-8 w-8">
              {user.imageUrl ? (
                <img
                  src={getImageURL(user.imageUrl)}
                  className="h-full w-full rounded-full"
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-full bg-light-gray uppercase text-white">
                  {getInitials(user.firstName, user.lastName)}
                </div>
              )}
            </div>
          </Link>
          <Link to="/profile">
            <p className="text-sm">Hi, {user.username}</p>
          </Link>
          <button
            onClick={() => {
              setDropDown((prev) => !prev);
            }}
          >
            <ChevronDown size={18} />
          </button>
        </div>
        {dropdown && (
          <div className="absolute right-0 top-full z-10 flex w-9/12 flex-col rounded-md bg-white shadow-2xl">
            <Link to="/profile">
              <button
                onClick={() => setDropDown(false)}
                className="border-b border-light-gray px-6 py-2 hover:bg-light-gray"
              >
                View Profile
              </button>
            </Link>
            <button
              onClick={() => {
                setShowModal(ActiveModal.createPost);
                setDropDown(false);
              }}
              className="border-b border-light-gray px-6 py-2 hover:bg-light-gray"
            >
              Create Post
            </button>
            <LogOut />
          </div>
        )}
      </div>
    </>
  );
};
export default LoggedButton;
