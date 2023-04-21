import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  useTheme,
  IconButton,
  Box,
  InputBase,
  Typography,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../../../global/theme/Theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

export const HomeHeader = () => {
  const theme = useTheme();
  // Pass the color mode that is returned by useTheme to tokens to get color.
  //const colors = tokens(theme.palette.color);

  // To switch between modes.
  const colorMode = useContext(ColorModeContext);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
      {/* Search bar */}
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "3px",
        }}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"></InputBase>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Options on the right of navbar */}
      <Box sx={{ display: "flex" }}>
        <IconButton>
          <Link to="./logout">
            <Typography sx={{ color: "white" }}> Logout </Typography>
          </Link>
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
