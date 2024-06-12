import { useModalContext } from "../context/modalContext";
import LoginSignUp from "./LoginSignUp";
import Modal from "./reusable/Modal";

const NavBar = () => {
  const { showModal, viewModal } = useModalContext();

  return (
    <>
      <div className="bg-blue">
        <div className="md:max-w-1350 m-auto flex w-10/12 w-full items-center justify-between px-6 py-3">
          <img src="/photomania-logo-white.png" className="w-20" />
          <button
            onClick={() => viewModal()}
            className="rounded-md p-3 text-white transition-colors duration-200 hover:bg-pink"
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
