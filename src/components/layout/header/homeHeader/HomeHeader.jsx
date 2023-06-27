import React from "react";
import { useContext } from "react";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useTheme,
  IconButton,
  Box,
  InputBase,
  Typography,
} from "@mui/material";

import { getItem } from "../../../../core/services/storage/Storage";

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
  const colors = tokens(theme.palette.color);

  // To switch between modes.
  const colorMode = useContext(ColorModeContext);

  let adminToken = getItem("token");

  const navigate = useNavigate();
  const goToPosts = () =>
    navigate({
      pathname: "http://localhost:5174/admin",
      search: "?adminToken=" + adminToken,
    });

  const [openUserMenu, setOpenUserMenu] = React.useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        flex: "1 1 100%",
      }}
    >
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
        <Button
          sx={{
            border: "2px solid",
            borderColor: colors.greenAccent[500],
            "&:hover": {
              borderColor: colors.greenAccent[500],
            },
          }}
          onClick={goToPosts}
          variant="outlined"
        >
          <Link
            href={`http://localhost:5173/admin?adminToken=" + ${adminToken}`}
            sx={{
              color: colors.greenAccent[500],
              fontWeight: "bold",
              "&:hover": {
                textDecoration: theme.palette.mode === "dark" ? "none" : "none",
              },
            }}
          >
            {" "}
            Go to Alpha Academy
          </Link>
        </Button>

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
        <IconButton sx={{ position: "relative" }}>
          <PersonOutlinedIcon onClick={() => setOpenUserMenu(!openUserMenu)} />
        </IconButton>
        {openUserMenu && (
          <Box
            sx={{
              zIndex: "20",
              position: "absolute",
              top: "63px",
              right: "18px",
              width: "140px",
              borderRadius: "8px",
              paddingY: "10px",
              background: "#1F2A40!important",
            }}
          >
            <Box
              sx={{
                paddingY: "9px",
                paddingX: "8px",
                borderBottom: "1px solid #ccc",
                borderTop: "1px solid #ccc",
                "&:hover": { borderColor: colors.greenAccent[500] },
              }}
            >
              <Link href="./logout">
                <Typography
                  sx={{
                    color: "white",
                    "&:hover": { color: colors.greenAccent[500] },
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  Logout{" "}
                </Typography>
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
