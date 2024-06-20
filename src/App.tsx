import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import NavBar from "./components/NavBar";
import { AuthContextProvider } from "./context/AuthContext";
import { ModalContextProvider } from "./context/ModalContext";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import User from "./pages/User";
import { queryClient } from "./utils/clientQuery";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "post/:postId",
        element: <SinglePost />,
      },
      {
        path: "user/:username",
        element: <User />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
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
