import React, { createContext, ReactNode, useState } from "react";

interface ModalContextValue {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewModal: () => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalContextProviderProps {
  children: ReactNode;
}

function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const viewModal = () => setShowModal(true);
  const hideModal = () => setShowModal(false);

  const value = { showModal, setShowModal, viewModal, hideModal };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function useModalContext() {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { ModalContextProvider, useModalContext };
