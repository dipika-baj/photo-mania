import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="animate-spin text-blue">
        <LoaderCircle size={48} />
      </div>
    </div>
  );
};
export default Loading;
