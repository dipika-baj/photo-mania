import React, { createContext, ReactNode, useState } from "react";

interface LoginContextValue {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextValue | undefined>(undefined);

interface LoginContextProviderProps {
  children: ReactNode;
}

function LoginContextProvider({ children }: LoginContextProviderProps) {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const value = { showLoginModal, setShowLoginModal };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}

function useLoginContext() {
  const context = React.useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { LoginContextProvider, useLoginContext };
