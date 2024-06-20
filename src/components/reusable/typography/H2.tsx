import { ReactNode } from "react";

const H2 = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-3xl font-semibold">{children}</h1>;
};
export default H2;
