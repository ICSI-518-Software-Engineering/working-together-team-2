import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
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
        <Button
          component={NavLink}
          to="/"
          variant="contained"
          color="secondary"
        >
          Customer
        </Button>
        <Button
          component={NavLink}
          to="/"
          variant="contained"
          color="secondary"
        >
          Vendor
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
