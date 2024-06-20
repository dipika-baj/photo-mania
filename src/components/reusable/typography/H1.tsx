import { ReactNode } from "react";

const H1 = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-4xl font-semibold">{children}</h1>;
};
export default H1;
