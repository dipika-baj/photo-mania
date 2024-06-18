import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";

import { useAuthContext } from "../context/AuthContext";
import { useModalContext } from "../context/ModalContext";
import { ActiveModal } from "../types";
import CreatePost from "./CreatePost";
import LoginSignUp from "./LoginSignUp";
import LogOut from "./LogOut";
import Modal from "./reusable/Modal";

const NavBar = () => {
  const { showModal, setShowModal } = useModalContext();
  const { loggedIn } = useAuthContext();

  return (
    <>
      <div className="sticky top-0 bg-blue">
        <div className="m-auto flex w-10/12 items-center justify-between py-3 md:max-w-1350">
          <Link to="/">
            <img src="/photomania-logo-white.png" className="w-20" />
          </Link>
          {!loggedIn ? (
            <button
              onClick={() => {
                setShowModal(ActiveModal.login);
              }}
              className="rounded-md p-3 text-white transition-colors duration-200 hover:bg-pink"
            >
              Signup | Login
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="rounded-full bg-white p-1 text-blue"
                onClick={() => {
                  setShowModal(ActiveModal.createPost);
                }}
              >
                <Plus strokeWidth={3} />
              </button>
              <LogOut />
            </div>
          )}
        </div>
      </div>

      {showModal === ActiveModal.login && (
        <Modal>
          <LoginSignUp />
        </Modal>
      )}

      {showModal === ActiveModal.createPost && (
        <Modal>
          <CreatePost />
        </Modal>
      )}
      <Toaster
        richColors
        position="bottom-left"
        duration={3000}
        closeButton={true}
      />
    </>
  );
};
export default NavBar;
