const Loading = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex aspect-square animate-pulsing items-center rounded-full bg-light-gray p-10">
        <img src="/photomania-logo.png" className="max-w-32" />
      </div>
    </div>
  );
};
export default Loading;
