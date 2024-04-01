import { Constants } from "@/lib/constants";
import { Box } from "@mui/material";
import React from "react";
import SideNav from "./SideNav";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box>
      {/* Drawer */}
      <SideNav />

      {/* Content */}
      <Box ml={Constants.DRAWER_WIDTH}>{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
