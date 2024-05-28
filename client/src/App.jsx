import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { About, Home, NotFound, SignIn, SignUp } from "./pages";
import "./index.css";

function App() {
  const routing = useRoutes([
    {
      path: "/",
      element: <Home />,
      exact: true,
    },
    {
      path: "/about",
      element: <About />,
      exact: true,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
      exact: true,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
      exact: true,
    },
    {
      path: "*",
      element: <NotFound />,
      roles: [],
      exact: true,
    },
  ]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback="...loading">{routing}</Suspense>
    </div>
  );
}

export default App;
