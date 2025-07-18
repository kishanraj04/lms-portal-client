import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";
import "./App.css"
import { AuthPage } from "./pages/AuthPage.jsx";
import { Provider } from 'react-redux';
import { store } from "./store/configureStore.js";
const route = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element:<ProtectedRoute></ProtectedRoute>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={route}>
    <Provider store={store}></Provider>
  </RouterProvider>
);
