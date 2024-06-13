import { useAuthContext } from "../context/authContext";
import { useModalContext } from "../context/modalContext";
import LoginSignUp from "./LoginSignUp";
import LogOut from "./LogOut";
import Modal from "./reusable/Modal";

const NavBar = () => {
  const { showModal, viewModal } = useModalContext();
  const { loggedIn } = useAuthContext();

  return (
    <>
      <div className="bg-blue">
        <div className="m-auto flex w-10/12 items-center justify-between py-3 md:max-w-1350">
          <img src="/photomania-logo-white.png" className="w-20" />
          {!loggedIn ? (
            <button
              onClick={() => viewModal()}
              className="rounded-md p-3 text-white transition-colors duration-200 hover:bg-pink"
            >
              Signup | Login
            </button>
          ) : (
            <LogOut />
          )}
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
