import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { tokens } from "../../../global/theme/Theme";
import { getItem } from "../../../core/services/storage/Storage";

import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import EventIcon from "@mui/icons-material/Event";

import "react-pro-sidebar/dist/css/styles.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export const SidebarSection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  let user = JSON.parse(getItem("employee"));

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 15px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed && <MenuOutlinedIcon />}
            style={{
              margin: "10px 0 10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    ml: "28px",
                    color: colors.grey[100],
                  }}
                >
                  {user.role === "admin" ? "ADMINIS" : "INSTRUCTORS"}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box sx={{ mb: "25px" }}>
              <IconButton
                sx={{
                  display: "flex",
                  mx: "auto",
                  border: 1,
                  width: "90px",
                  height: "90px",
                  cursor: "pointer",
                }}
              >
                <AdminPanelSettingsRoundedIcon
                  sx={{ width: "80%", height: "80%" }}
                />
              </IconButton>

              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ textAlign: "center" }}
              >
                {user.fullName.split(" ")[user.fullName.split.length - 1]}
              </Typography>
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ textAlign: "center", m: "10px" }}
              >
                {user.role}
              </Typography>
            </Box>
          )}

          <Box paddingLeft={!isCollapsed && "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              Student
            </Typography>
            <Item
              title="Manage Students"
              to="/students"
              icon={<LocalLibraryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              Employee
            </Typography>

            <Item
              title="Manage Instructors"
              to="/instructors"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Admins"
              to="/admins"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              Term / Lesson
            </Typography>
            <Item
              title="Profile Form"
              to="/term"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              Calendar
            </Typography>

            <Item
              title="Event Calendar"
              to="/calendar"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              Comments / Chats
            </Typography>
            <Item
              title="Comments"
              to="/comment"
              icon={<CommentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Chat"
              to="/chat"
              icon={<QuestionAnswerIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 10px" }}
            >
              News
            </Typography>
            <Item
              title="News"
              to="/news"
              icon={<NewspaperOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
