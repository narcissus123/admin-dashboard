import React from "react";
import { useContext } from "react";
import { useTheme, IconButton, Box, Typography } from "@mui/material";
import { ColorModeContext, tokens } from "../../../../global/theme/Theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export const Header = () => {
  // Pass the color mode that is returned by useTheme to tokens to get color.
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // To switch between modes.
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        background: `${colors.primary[400]} !important`,
        borderBottom: "2px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        p: 1,
        flex: "1 1 100%",
      }}
    >
      <IconButton
        color={colors.grey[100]}
        sx={{ ml: 2, border: 1 }}
        type="button"
      >
        <RocketLaunchIcon sx={{ fontSize: "30px" }} />
      </IconButton>

      {/* Welcome Message */}
      <Typography
        color={colors.grey[100]}
        sx={{
          flex: 1,
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Welcome to Alpha Academy
      </Typography>

      {/* Options on the right of navbar */}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};
