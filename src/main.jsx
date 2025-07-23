import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";
import "./App.css";
import { AuthPage } from "./pages/AuthPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/configureStore.js";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Learning from "./pages/Learning.jsx";
import { Dashboard } from "@mui/icons-material";
import DahsBoard from "./pages/DahsBoard.jsx";
import Account from "./pages/Account.jsx";
import Admin from "./components/Admin.jsx";
import CreateCourse from "./components/CreateCourse.jsx";
import ManageCourse from "./components/ManageCourse.jsx";
const route = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/learning",
        element: <Learning />,
      },
      {
        path: "/dashboard",
        element: <DahsBoard />,
        children: [
          {
            path: "",
            element: <Admin />,
          },
          {
            path:"create-course",
            element:<CreateCourse/>
          },
          {
            path:"manage-courses",
            element:<ManageCourse/>
          }
        ],
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
    <ToastContainer position="top-right" autoClose={1000} />
  </Provider>
);
