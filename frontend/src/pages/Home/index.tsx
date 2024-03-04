import { Box, Typography } from "@mui/material";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <Box position="relative">
      <img
        src="/home-bg.jpg"
        style={{ width: "91vw", maxHeight: "83vh", opacity: "0.8" }}
      />
      <Typography position="absolute" top={0}>
        A Glory of flowers
      </Typography>
    </Box>
  );
};

export default HomePage;
