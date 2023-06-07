import React from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Menu,
  Card,
} from "@mui/material";

import { formatDate } from "@fullcalendar/core";
import { Link } from "react-router-dom";

import { tokens } from "../../../global/theme/Theme";
import { useData } from "../../../utils/dashboardData/DashboardData";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const ToDoList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const calEvent = useData();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        height: "100%",
        backgroundColor: theme.palette.mode === "dark" && colors.primary[400],
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Box
          display="flex"
          justifyContent="start"
          alignItems="center"
          gap="5px"
        >
          <FormatListBulletedIcon />
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            To Do List
          </Typography>
        </Box>
        <Box>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem
                selected={"got to Calendar"}
                onClick={handleClose}
                sx={{ color: "white" }}
              >
                <Link
                  to="/calendar"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Calendar{" "}
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Box>
      </Box>
      {calEvent.calendarEvents.map((event, i) => (
        <Box
          key={`${event.id}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="8px"
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              fontSize="15px"
              fontWeight="500"
            >
              {event.title}
            </Typography>
          </Box>
          <Box p="5px 10px" color={colors.grey[100]}>
            {formatDate(event.start, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Box>
        </Box>
      ))}
    </Card>
  );
};

export default React.memo(ToDoList);
