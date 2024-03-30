import { Constants, LabelValueType } from "@/lib/constants";
import {
  Checklist,
  Dashboard,
  ManageSearch,
  MenuBook,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideNav: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Drawer
      sx={({ mixins }) => ({
        width: Constants.DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: Constants.DRAWER_WIDTH,
          boxSizing: "border-box",
          top: mixins.toolbar.height,
          background: "transparent",
        },
      })}
      variant="permanent"
      anchor="left"
    >
      <List>
        {sidebarLinks.map((item) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton
              selected={pathname === item.value}
              component={Link}
              to={item.value}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;

const sidebarLinks: (LabelValueType & { icon: React.ReactNode })[] = [
  {
    label: "Overview",
    value: "/vendor/overview",
    icon: <Dashboard />,
  },
  {
    label: "Create Order",
    value: "/vendor/create-order",
    icon: <Checklist />,
  },
  {
    label: "Orders History",
    value: "/vendor/orders-history",
    icon: <ManageSearch />,
  },
  {
    label: "Catalog",
    value: "/vendor/catalog",
    icon: <MenuBook />,
  },
];
