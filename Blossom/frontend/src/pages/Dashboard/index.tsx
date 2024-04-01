import { Constants } from "@/lib/constants";
import { Box } from "@mui/material";
import React from "react";
import SideNav from "./SideNav";

const DashboardPage: React.FC = () => {
  return (
    <Box>
      {/* Drawer */}
      <SideNav />

      {/* Content */}
      <Box ml={Constants.DRAWER_WIDTH}>Manimon</Box>
    </Box>
  );
};

export default DashboardPage;
