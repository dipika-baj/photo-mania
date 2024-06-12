import { useState } from "react";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const LoginSignUp = () => {
  const [tab, setTab] = useState<string>("login");

  const onTabChange = (tab: string) => {
    setTab(tab);
  };
  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <img src="/photomania-logo.png" className="m-auto w-32" />
        <div className="mb-5 flex w-full flex-row flex-wrap border-b-0 ps-0">
          <div className="w-1/2 pr-3">
            <button
              onClick={() => onTabChange("login")}
              className={`w-full rounded-md p-3 transition-colors duration-200 ${tab === "login" ? "bg-blue p-3 text-white" : "bg-light-gray text-black hover:bg-blue hover:text-white"}`}
            >
              Login
            </button>
          </div>
          <div className="w-1/2 pl-3">
            <button
              onClick={() => onTabChange("register")}
              className={`w-full rounded-md p-3 transition-colors duration-200 ${tab === "register" ? "bg-blue p-3 text-white" : "bg-light-gray text-black hover:bg-blue hover:text-white"}`}
            >
              Sign Up
            </button>
          </div>
        </div>
        {tab === "login" ? (
          <LoginForm />
        ) : (
          <SignUpForm onTabChange={onTabChange} />
        )}
      </div>
    </>
  );
};

export default LoginSignUp;
