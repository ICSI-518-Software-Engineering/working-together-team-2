import SignInPage from "@/pages/Auth/Sign-In";
import SignUpPage from "@/pages/Auth/Sign-Up";
import HomePage from "@/pages/Home";
import { getSignedInUserDetails } from "@/utils/authUtils";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/auth",
      element: <AuthRoutesWrapper />,
      children: [
        {
          path: "customer",
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
          path: "vendor",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <SignInPage vendor />,
            },
            {
              path: "sign-up",
              element: <SignUpPage vendor />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: (
        <Box
          height="70vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h2"
            textAlign="center"
            color="white"
            fontWeight={600}
          >
            404 Page Not Found
          </Typography>
        </Box>
      ),
    },
  ]);

  return routes;
};

export default AppRoutes;

/**
 * Authentication pages HOC
 */
const AuthRoutesWrapper: React.FC = () => {
  const user = getSignedInUserDetails();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

/**
 * Protected pages HOC
 */
const ProtectedPagesWrapper: React.FC = () => {
  const user = getSignedInUserDetails();
  if (!user) {
    return <Navigate to="/auth/customer" replace />;
  }
  return <Outlet />;
};
