import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";
import { ModalContextProvider } from "./context/ModalContext";
import HomePage from "./pages/HomePage";
import SinglePost from "./pages/SinglePost";
import { queryClient } from "./utils/clientQuery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "post/:postId",
    element: <SinglePost />,
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </ModalContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
