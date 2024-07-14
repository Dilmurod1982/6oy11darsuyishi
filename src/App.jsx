//rrd
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

//import pages
import {
  Home,
  About,
  Contact,
  Login,
  Register,
  ErrorPage,
  Todos,
} from "./pages";

//import layout
import MainLayout from "./layouts/MainLayout";

//action import
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { action as TodosActions } from "./pages/Todos";

//import protected
import ProtectedRoutes from "./components/ProtectedRoutes";

//import context
import { useGlobalContext } from "./hooks/useGlobalContext";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const { user, dispatch, isAuthReady } = useGlobalContext();

  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          errorElement: <ErrorPage />,
          element: <Home />,
        },
        {
          path: "/about",
          errorElement: <ErrorPage />,
          element: <About />,
        },
        {
          path: "/contact",
          errorElement: <ErrorPage />,
          element: <Contact />,
        },
        {
          path: "/todos",

          errorElement: <ErrorPage />,
          element: <Todos />,
          action: TodosActions,
        },
      ],
    },
    {
      path: "/login",
      errorElement: <ErrorPage />,
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      errorElement: <ErrorPage />,
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOG_IN", payload: user });
      dispatch({ type: "IS_AUTH_READY" });
    });
  }, []);

  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
