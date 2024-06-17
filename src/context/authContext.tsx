import React, { createContext, ReactNode, useState } from "react";

import { LoginData } from "../types";
import { getCookie } from "../utils/token";

interface AuthContextValue {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: number | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<number | null>>;
  logIn: (user: LoginData) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const isLoggedIn = getCookie("token");
  const userId = Number(getCookie("userId"));
  const [loggedIn, setLoggedIn] = useState<boolean>(!!isLoggedIn);
  const [loggedUser, setLoggedUser] = useState<number | null>(userId);

  const logIn = (user: LoginData) => {
    setLoggedIn(true);
    document.cookie = `token=${user.token}; path=/;`;
    setLoggedUser(user.id);
    document.cookie = `userId=${user.id}; path=/;`;
  };

  const logOut = () => {
    setLoggedIn(false);
    document.cookie = "token=; path=/; expires=01 Jan 1970 00:00:00 UTC;;";
    setLoggedUser(null);
    document.cookie = "userId=;path=/; expires=01 Jan 1970 00:00:00 UTC;;";
  };

  const value = {
    loggedIn,
    setLoggedIn,
    logIn,
    logOut,
    loggedUser,
    setLoggedUser,
  };
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
