import SignUpForm from "./SignUpForm";

const LoginSignUp = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <img src="/photomania-logo.png" className="m-auto w-32" />
      <SignUpForm />
    </div>
  );
};

export default LoginSignUp;
