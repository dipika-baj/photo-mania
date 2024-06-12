import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { useModalContext } from "../../context/modalContext";
import Close from "../../icons/Close";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  const { hideModal } = useModalContext();
  return createPortal(
    <>
      <div
        onClick={() => hideModal()}
        className="absolute top-0 h-screen w-full bg-black-25"
      ></div>
      <div className="fixed left-1/2 top-20 w-11/12 max-w-650 -translate-x-1/2 justify-center rounded-br-xl rounded-tl-xl bg-white p-5 md:p-10">
        <div
          className="text-light-gray absolute right-5 top-4 cursor-pointer transition-colors duration-200 hover:text-black"
          onClick={() => hideModal()}
        >
          <Close />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("root")!,
  );
};

export default Modal;
