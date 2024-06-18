import React, { createContext, ReactNode, useState } from "react";

import { ActiveModal } from "../types";

interface ModalContextValue {
  showModal: ActiveModal | null;
  setShowModal: React.Dispatch<React.SetStateAction<ActiveModal | null>>;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalContextProviderProps {
  children: ReactNode;
}

function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [showModal, setShowModal] = useState<ActiveModal | null>(null);
  const hideModal = () => setShowModal(null);

  const value = { showModal, setShowModal, hideModal };
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
