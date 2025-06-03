import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import ResumeList from "./screens/ResumeList.jsx";
import PageNotFound from "./screens/PageNotFound.jsx";
import ResumeDetails from "./screens/ResumeDetails.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import UserProfile from "./screens/UserProfile.jsx";
import ResumeTemplate_1 from "./ResumeTemplates/ResumeTemplate_1.jsx";
import ResumeTemplate_2 from "./ResumeTemplates/ResumeTemplate_2.jsx";
import ResumeTemplate_3 from "./ResumeTemplates/ResumeTemplate_3.jsx";
import ResumeTemplate_4 from "./ResumeTemplates/ResumeTemplate_4.jsx";
import ResumeTemplate_5 from "./ResumeTemplates/ResumeTemplate_5.jsx";
import ResumeTemplate_6 from "./ResumeTemplates/ResumeTemplate_6.jsx";
import ResumeTemplate_7 from "./ResumeTemplates/ResumeTemplate_7.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/Register",
    element: <Register />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/Profile",
    element: <UserProfile />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/Templates",
    element: <ResumeList />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/ResumeDetails",
    element: <ResumeDetails />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/template1",
    element: <ResumeTemplate_1 />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/template2",
    element: <ResumeTemplate_2 />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/template3",
    element: <ResumeTemplate_3 />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/template4",
    element: <ResumeTemplate_4 />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/template5",
    element: <ResumeTemplate_5 />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/template6",
    element: <ResumeTemplate_6 />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "/template7",
    element: <ResumeTemplate_7 />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
  {
    path: "*",
    element: <PageNotFound />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />{" "}
      </AnimatePresence>
    </Provider>
    <ToastContainer  position="top-center"/>
  </StrictMode>
);
