import SignInPage from "@/pages/Auth/Sign-In";
import SignUpPage from "@/pages/Auth/Sign-Up";
import HomePage from "@/pages/Home";
import React from "react";
import { Outlet, useRoutes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/customer",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SignInPage />,
        },
        {
          path: "sign-up",
          element: <SignUpPage />,
        },
      ],
    },
    {
      path: "/vendor",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <SignInPage vendor />,
        },
        // {
        //   path: "sign-up",
        //   element: <SignUpPage vendor />,
        // },
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
