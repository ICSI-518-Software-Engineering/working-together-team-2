import DashboardCatalogPage from "@/pages/(Dashboard)/Catalog";
import DashboardCreateOrderPage from "@/pages/(Dashboard)/CreateOrder";
import DashboardOrdersHistoryPage from "@/pages/(Dashboard)/OrdersHistory";
import DashboardOverviewPage from "@/pages/(Dashboard)/Overview";
import SignInPage from "@/pages/Auth/Sign-In";
import SignUpPage from "@/pages/Auth/Sign-Up";
import StorePage from "@/pages/Store";
import CatalogPage from "@/pages/Catalog";
import CartPage from "@/pages/Cart";
import CustomizePage from "@/pages/Customize";
import OrdersPage from "@/pages/Orders"
import SuggestPage from "@/pages/Suggest";
import PlanPage from "@/pages/Event";


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
          path: "overview",
          element: <DashboardOverviewPage />,
        },
        {
          path: "create-order",
          element: <DashboardCreateOrderPage />,
        },
        {
          path: "orders-history",
          element: <DashboardOrdersHistoryPage />,
        },
        {
          path: "catalog",
          element: <DashboardCatalogPage />,
        },
      ],
    },

    // Customer Specific Pages
    {
      path: "/customer",
      element: <CustomerProtectedPagesWrapper />,
      children: [
        {
          path: "store",
          element: <StorePage />,
        },
        {
          path: "catalog",
          element: <CatalogPage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "checkout",
          element: <CartPage />,
        },
        {
          path: "orders",
          element: <OrdersPage />,
        },
        {
          path: "customize",
          element: <CustomizePage />,
        },
        {
          path: "suggest",
          element: <SuggestPage />,
        },
        {
          path: "plan",
          element: <PlanPage />,
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

const CustomerProtectedPagesWrapper: React.FC = () => {
  const user = getSignedInUserDetails();
  if (!user || user.isVendor) {
    return <Navigate to="/auth/customer" replace />;
  }
  return <Outlet />;
};
