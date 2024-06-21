import H2 from "./typography/H2";

const ErrorComponent = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-10/12 max-w-1350 text-center text-red-500">
        <H2>Something went wrong</H2>
      </div>
    </div>
  );
};
export default ErrorComponent;
