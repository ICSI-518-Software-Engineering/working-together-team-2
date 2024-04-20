import { getSignedInUserDetails } from "@/utils/authUtils";
import {
  AppBar,
  Button,
  ButtonGroup,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
type NavLinkItem = {
  url: string;
  label: string;
  icon?: React.ReactNode; // 'icon' is optional
};

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar sx={{ gap: "1.5rem", justifyContent: "space-between" }}>
        {/* Navbar Logo  */}
        <Typography
          letterSpacing={3}
          variant="h5"
          fontWeight="medium"
          component={Link}
          to="/"
          sx={(props) => ({
            textDecoration: "none",
            color: props.palette.secondary.main,
          })}
        >
          BLOSSOM
        </Typography>

        {/* Navbar Links */}
        <NavLinks />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/**
 * ============== DATA ============
 */

/**
 * ======= Custom Component =============
 */

const NavLinks: React.FC = () => {
  const { pathname } = useLocation();
  const user = getSignedInUserDetails();

  // If not signed in
  let navLinks: NavLinkItem[] = [
    {
      url: "/auth/customer",
      label: "Customer",
    },
    {
      url: "/auth/vendor",
      label: "Vendor",
    },
  ];

  // If Signed In & Is Vendor
  if (user && user.isVendor) {
    navLinks = [
      {
        url: "/vendor/overview",
        label: "Dashboard",
      },
    ];
  }

  // If Signed In & Is Customer
  if (user && !user.isVendor) {
    navLinks = [
      {
        url: "/customer/store",
        label: "Store",
        icon: null,
      },
      {
        url: "/customer/cart",
        label: "Cart",
        icon: <ShoppingCartIcon />, // Icon for the cart
      },
      {
        url: "/customer/orders",
        label: "Orders",
        icon: <ListAltIcon />, // Icon for the orders
      },

    ];
  }

  return (
    <Stack direction="row" gap="1rem" alignItems="center">
      <ButtonGroup variant="outlined">
        {navLinks.map((navlink) => (
          <Button
            key={navlink.url}
            component={NavLink}
            to={navlink.url}
            color="secondary"
            startIcon={navlink.icon} // Add the icon to the button
            variant={
              pathname?.startsWith(navlink.url) ? "contained" : "outlined"
            }
          >
            {navlink.label}
          </Button>
        ))}
      </ButtonGroup>


      {/* User Menu */}
      {user && <UserMenu user={user} />}
    </Stack>
  );
};
