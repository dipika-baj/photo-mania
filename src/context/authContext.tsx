import React, { createContext, ReactNode, useState } from "react";

import { getToken } from "../utils/token";

interface AuthContextValue {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logIn: (token: string) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const isLoggedIn = getToken();
  const [loggedIn, setLoggedIn] = useState<boolean>(!!isLoggedIn);

  const logIn = (token: string) => {
    setLoggedIn(true);
    document.cookie = `token=${token}; path=/;`;
  };

  const logOut = () => {
    setLoggedIn(false);
    document.cookie = "token=; expires=01 Jan 1970 00:00:00 UTC;;";
  };

  const value = { loggedIn, setLoggedIn, logIn, logOut: logOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { AuthContextProvider, useAuthContext };
