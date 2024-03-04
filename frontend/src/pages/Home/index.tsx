import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <Box
      textAlign="center"
      component={Paper}
      bgcolor="transparent"
      height="calc(100vh - 10rem)"
      elevation={24}
      borderRadius="1rem"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="2rem"
        color={({ palette }) => palette.background.default}
        alignItems="center"
        mt="-4rem"
        pt="4rem"
      >
        <TitleTypography>Unleash Your Floral Fantasies</TitleTypography>
        <Typography fontSize="2rem" fontWeight={600}>
          Have no idea what flowers to give your loved ones? <br /> Explore our
          blossom store
        </Typography>
        <Stack direction="row" gap="1rem">
          <Button variant="contained" color="secondary">
            Explore our store
          </Button>
          <Button color="inherit" variant="outlined">
            About Us &rarr;
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;

/**
 * ============ CUSTOM TYPOGRAPHY ==========
 */

export const TitleTypography: React.FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="h3"
      fontSize="7rem"
      fontWeight={600}
      sx={({ palette }) => ({
        WebkitTextFillColor: palette.background.paper,
        WebkitTextStroke: "0.5px",
      })}
      color={({ palette }) => palette.secondary.main}
      {...props}
    >
      {props.children}
    </Typography>
  );
};
