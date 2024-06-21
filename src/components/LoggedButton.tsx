import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useModalContext } from "../context/ModalContext";
import { useClickOutside } from "../hooks/useOutsideClick";
import { ActiveModal, UserResult } from "../types";
import { getImageURL } from "../utils/imageUrl";
import { getInitials } from "../utils/profile";
import { getCookie } from "../utils/token";
import LogOut from "./LogOut";
import Seperator from "./reusable/Seperator";

const LoggedButton = () => {
  const [dropdown, setDropDown] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useClickOutside(dropDownRef, () => {
    setDropDown(false);
  });

  const { setShowModal } = useModalContext();
  const token = getCookie("token");

  const { data } = useQuery<UserResult>({
    queryKey: ["profile"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API}/me`, {
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
    <div className="relative flex items-center gap-4">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue"
        onClick={() => {
          setShowModal(ActiveModal.createPost);
        }}
      >
        <Plus strokeWidth={3} />
      </button>

      <div className="flex items-center gap-4 text-white">
        <Link to="/profile">
          <div className="h-9 w-9">
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
        <button
          onClick={() => {
            setDropDown((prev) => !prev);
          }}
          className="flex items-center gap-1"
        >
          <span className="text-sm">Hi, {user.username}</span>
          <ChevronDown size={18} />
        </button>
      </div>
      {dropdown && (
        <div
          ref={dropDownRef}
          className="absolute right-0 top-10 z-50 flex w-9/12 flex-col rounded-md border border-light-gray bg-white shadow-2xl"
        >
          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="px-4 py-2 text-left hover:bg-light-gray"
          >
            View Profile
          </button>
          <Seperator />
          <button
            onClick={() => {
              setShowModal(ActiveModal.createPost);
              setDropDown(false);
            }}
            className="px-4 py-2 text-left hover:bg-light-gray"
          >
            Create Post
          </button>
          <Seperator />
          <LogOut />
        </div>
      )}
    </div>
  );
};
export default LoggedButton;
