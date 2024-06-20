import { Smile } from "lucide-react";

import H1 from "./reusable/typography/H1";

const NotFound = () => {
  return (
    <>
      <div className="flex h-full items-center justify-center gap-4">
        <H1>Page Not Found</H1>
        <Smile size={48} />
      </div>
    </>
  );
};
export default NotFound;
