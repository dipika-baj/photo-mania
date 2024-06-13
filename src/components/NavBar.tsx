import { useState } from "react";

import { useAuthContext } from "../context/authContext";
import { useModalContext } from "../context/modalContext";
import Add from "../icons/Add";
import CreatePost from "./CreatePost";
import LoginSignUp from "./LoginSignUp";
import LogOut from "./LogOut";
import Modal from "./reusable/Modal";

const NavBar = () => {
  const { showModal, viewModal } = useModalContext();
  const [showFormModal, setShowFormModal] = useState(false);
  const { loggedIn } = useAuthContext();

  return (
    <>
      <div className="bg-blue">
        <div className="m-auto flex w-10/12 items-center justify-between py-3 md:max-w-1350">
          <img src="/photomania-logo-white.png" className="w-20" />
          {!loggedIn ? (
            <button
              onClick={() => {
                setShowFormModal(true);
                viewModal();
              }}
              className="rounded-md p-3 text-white transition-colors duration-200 hover:bg-pink"
            >
              Signup | Login
            </button>
          ) : (
            <div className="flex gap-2">
              <div
                className="rounded-full bg-white p-1 text-blue"
                onClick={() => {
                  setShowFormModal(false);
                  viewModal();
                }}
              >
                <Add />
              </div>
              <LogOut />
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal>{showFormModal ? <LoginSignUp /> : <CreatePost />}</Modal>
      )}
    </>
  );
};
export default NavBar;
