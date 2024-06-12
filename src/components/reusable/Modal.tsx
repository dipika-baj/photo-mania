import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { useModalContext } from "../../context/modalContext";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  const { setShowModal } = useModalContext();
  return createPortal(
    <>
      <div
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
        className="absolute top-0 h-screen w-full bg-black-25"
      ></div>
      <div className="fixed left-1/2 top-20 w-11/12 max-w-650 -translate-x-1/2 justify-center rounded-br-xl rounded-tl-xl bg-white p-5 md:p-10">
        {children}
      </div>
    </>,
    document.getElementById("root")!,
  );
};

export default Modal;
