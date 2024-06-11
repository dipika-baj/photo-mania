import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  return createPortal(
    <div className="bg-black-25 absolute top-0 flex h-screen w-full justify-center">
      <div className="max-w-800 absolute top-20 m-auto w-1/2 rounded-br-xl rounded-tl-xl bg-white p-10">
        {children}
      </div>
    </div>,
    document.getElementById("root")!,
  );
};

export default Modal;
