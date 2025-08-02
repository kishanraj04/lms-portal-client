import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Admin from "./components/Admin.jsx";
import CreateCourse from "./components/CreateCourse.jsx";
import EditCourse from "./components/EditCourse.jsx";
import ManageCourse from "./components/ManageCourse.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UploadLecturePage from "./components/UploadVedio.jsx";
import "./index.css";
import Account from "./pages/Account.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import DahsBoard from "./pages/DahsBoard.jsx";
import Home from "./pages/Home.jsx";
import Learning from "./pages/Learning.jsx";
import Profile from "./pages/Profile.jsx";
import { store } from "./store/configureStore.js";
import EditLecturePage from "./components/EditeLecturePage.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import CourseProgress from "./pages/CourseProgress.jsx";
import EnrolledStudents from "./components/admin/EnrolledStudents.jsx";
import EnrolledStudentdetails from "./components/admin/EnrolledStudentdetails.jsx";
import UploadResources from "./components/UploadResources.jsx";
const route = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "learning",
        element: <Learning />,
      },
      {
        path: "course/detail/:courseId",
        element: <CourseDetail />,
      },
      {
        path: "course-progress/:courseId",
        element: <CourseProgress />,
      },
      {
        path: "dashboard",
        element: <DahsBoard />,
        children: [
          {
            path: "",
            element: <Admin />,
          },
          {
            path: "create-course",
            element: <CreateCourse />,
          },
          {
            path: "manage-courses",
            element: <ManageCourse />,
          },
          {
            path: "manage-courses/:id",
            element: <EditCourse />,
          },
          {
            path: "manage-courses/vedio/upload/:id",
            element: <UploadLecturePage />,
          },
          {
            path: "manage-courses/vedio/upload/:id/lecture/update",
            element: <EditLecturePage />,
          },
          {
            path: "manage-courses/vedio/upload/:id/lecture/upload-resources",
            element: <UploadResources />,
          },
          {
            path: "enrolled-student",
            element: <EnrolledStudents />,
          },
          {
            path: "enrolled-students-details/:courseId",
            element: <EnrolledStudentdetails />,
          },
        ],
      },
      {
        path: "account",
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
