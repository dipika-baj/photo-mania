import { useState } from "react";

import SignUpForm from "./SignUpForm";

const LoginSignUp = () => {
  const [tab, setTab] = useState<string>("register");

  const onTabChange = (tab: string) => {
    setTab(tab);
  };
  return (
    <div className="flex w-full flex-col gap-6">
      <img src="/photomania-logo.png" className="m-auto w-32" />
      {tab === "register" && <SignUpForm onTabChange={onTabChange} />}
    </div>
  );
};

export default LoginSignUp;
