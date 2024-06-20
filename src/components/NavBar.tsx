import { Link } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { useModalContext } from "../context/ModalContext";
import { ActiveModal } from "../types";
import CreatePost from "./CreatePost";
import LoggedButton from "./LoggedButton";
import LoginSignUp from "./LoginSignUp";
import Modal from "./reusable/Modal";

const NavBar = () => {
  const { showModal, setShowModal } = useModalContext();
  const { loggedIn } = useAuthContext();

  return (
    <>
      <div className="sticky top-0 z-[100] bg-blue">
        <div className="m-auto flex w-10/12 items-center justify-between py-4 md:max-w-1350">
          <Link to="/">
            <img src="/photomania-logo-white.png" className="w-16" />
          </Link>
          {!loggedIn ? (
            <button
              onClick={() => {
                setShowModal(ActiveModal.login);
              }}
              className="rounded-md p-3 text-white transition-colors duration-200 hover:bg-dark-blue"
            >
              Signup | Login
            </button>
          ) : (
            <LoggedButton />
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
    </>
  );
};
export default NavBar;
