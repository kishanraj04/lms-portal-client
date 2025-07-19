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
const route = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute></ProtectedRoute>,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
    <ToastContainer position="top-right" autoClose={1000} />
  </Provider>
);
