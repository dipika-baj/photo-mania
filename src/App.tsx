import { Toaster } from "sonner";

import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Toaster
        richColors
        position="bottom-left"
        duration={3000}
        closeButton={true}
      />
    </>
  );
}

export default App;
