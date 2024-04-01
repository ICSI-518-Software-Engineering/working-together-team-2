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
      <Box
        ml={Constants.DRAWER_WIDTH}
        p="0.6rem 1rem"
        maxHeight={({ mixins }) => `calc(100vh - ${mixins.toolbar.height})`}
        overflow="auto"
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
