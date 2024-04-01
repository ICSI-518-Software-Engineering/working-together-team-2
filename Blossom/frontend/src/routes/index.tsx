import SignInPage from "@/pages/Auth/Sign-In";
import SignUpPage from "@/pages/Auth/Sign-Up";
import DashboardPage from "@/pages/Dashboard";
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

    // Auth Pages
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

    // Vendor Specific Pages
    {
      path: "/vendor",
      element: <VendorProtectedPagesWrapper />,
      children: [
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
      ],
    },

    // Global Not Found Page
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
const VendorProtectedPagesWrapper: React.FC = () => {
  const user = getSignedInUserDetails();
  if (!user || !user.isVendor) {
    return <Navigate to="/auth/vendor" replace />;
  }
  return <Outlet />;
};
