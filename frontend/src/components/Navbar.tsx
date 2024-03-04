import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <AppBar position="sticky" color="default">
      <Toolbar sx={{ gap: "1.5rem" }}>
        {/* Navbar Logo  */}
        <Typography
          letterSpacing={2}
          variant="h5"
          fontWeight="bolder"
          flexGrow={1}
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
        <ButtonGroup variant="outlined">
          {navLinks.map((navlink) => (
            <Button
              component={NavLink}
              to={navlink.url}
              color="secondary"
              variant={navlink.url === pathname ? "contained" : "outlined"}
            >
              {navlink.label}
            </Button>
          ))}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/**
 * ============== DATA ============
 */
const navLinks = [
  {
    url: "/customer",
    label: "Customer",
  },
  {
    url: "/vendor",
    label: "Vendor",
  },
];
