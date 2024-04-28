import { Box, Paper, Stack, Typography, TypographyProps } from "@mui/material";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <Box textAlign="center">
      <Box
        display="flex"
        flexDirection="column"
        gap="2rem"
        alignItems="center"
        mt="-4rem"
        pt="4rem"
        justifyContent="center"
        height="80vh"
      >
        <Box
          component={Paper}
          elevation={5}
          bgcolor="transparent"
          borderRadius="1rem"
          padding="5rem"
        >
          <TitleTypography>Unleash Your Floral Fantasies</TitleTypography>
          <Typography fontSize="2rem" fontWeight={400}>
            Have no idea what flowers to give your loved ones? Explore our
            blossom store
          </Typography>
        </Box>
        <Stack direction="row" gap="1rem">
          {/* <Button variant="contained" color="secondary">
            Explore our store
          </Button> */}
          {/* <Button color="inherit" variant="outlined">
            About Us &rarr;
          </Button> */}
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
        // WebkitTextFillColor: palette.background.default,
        WebkitTextStroke: "1px",
        WebkitTextStrokeColor: palette.secondary.main,
      })}
      {...props}
    >
      {props.children}
    </Typography>
  );
};
