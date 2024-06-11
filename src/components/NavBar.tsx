import { useLoginContext } from "../context/loginContext";
import Modal from "./reusable/Modal";

const NavBar = () => {
  const { setShowLoginModal, showLoginModal } = useLoginContext();

  return (
    <>
      <div className="bg-blue">
        <div className="max-w-1200 m-auto flex w-full items-center justify-between px-6 py-3">
          <img src="/photomania-logo.png" className="w-20" />
          <button onClick={() => setShowLoginModal((prev) => !prev)}>
            Signup/Login
          </button>
        </div>
      </div>
      {showLoginModal && (
        <Modal>
          <></>
        </Modal>
      )}
    </>
  );
};
export default NavBar;
