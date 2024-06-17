import { Toaster } from "sonner";

import Explore from "../components/Explore";
import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Explore />
      <Toaster
        richColors
        position="bottom-left"
        duration={3000}
        closeButton={true}
      />
    </>
  );
};
export default HomePage;
