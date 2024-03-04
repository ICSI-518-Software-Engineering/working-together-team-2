import SignInPage from "@/pages/Auth/Sign-In";
import HomePage from "@/pages/Home";
import React from "react";
import { useRoutes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/customer",
      element: <SignInPage />,
    },
    {
      path: "/vendor",
      element: <SignInPage />,
    },
  ]);

  return routes;
};

export default AppRoutes;
