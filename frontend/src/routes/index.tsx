import HomePage from "@/pages/Home";
import React from "react";
import { useRoutes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return routes;
};

export default AppRoutes;
