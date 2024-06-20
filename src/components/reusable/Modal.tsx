import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { useModalContext } from "../../context/ModalContext";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  const { hideModal } = useModalContext();
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return createPortal(
    <>
      <div
        onClick={() => hideModal()}
        className="absolute top-0 z-[9998] h-screen w-full bg-black/80"
      ></div>
      <div className="absolute left-1/2 top-16 z-[9999] w-11/12 max-w-650 -translate-x-1/2 justify-center rounded-br-xl rounded-tl-xl bg-white p-5 md:p-10">
        <div
          className="absolute right-4 top-4 cursor-pointer text-light-gray transition-colors duration-200 hover:text-black"
          onClick={() => hideModal()}
        >
          <X size={32} />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("modal")!,
  );
};

export default Modal;
