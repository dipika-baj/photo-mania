import { useModalContext } from "../context/modalContext";
import LoginSignUp from "./LoginSignUp";
import Modal from "./reusable/Modal";

const NavBar = () => {
  const { setShowModal, showModal } = useModalContext();

  return (
    <>
      <div className="bg-blue">
        <div className="m-auto flex w-full max-w-1200 items-center justify-between px-6 py-3">
          <img src="/photomania-logo.png" className="w-20" />
          <button
            onClick={() => setShowModal((prev) => !prev)}
            className="rounded-md bg-pink p-3 text-white"
          >
            Signup | Login
          </button>
        </div>
      </div>
      {showModal && (
        <Modal>
          <LoginSignUp />
        </Modal>
      )}
    </>
  );
};
export default NavBar;
