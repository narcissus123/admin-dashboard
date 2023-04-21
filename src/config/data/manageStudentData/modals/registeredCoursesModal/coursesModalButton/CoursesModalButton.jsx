import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../../../global/theme/Theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { getItem } from "../../../../../../core/services/storage/Storage";
import { StudentCoursesModal } from "../coursesModal";

export const CoursesModalButton = ({ student }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
        backgroundColor={
          JSON.parse(getItem("employee")).role === "admin"
            ? colors.greenAccent[600]
            : JSON.parse(getItem("employee")).role === "teacher"
            ? colors.greenAccent[700]
            : colors.greenAccent[700]
        }
        borderRadius="4px"
        onClick={() => setOpen(true)}
      >
        {JSON.parse(getItem("employee")).role === "admin" && (
          <AdminPanelSettingsOutlinedIcon />
        )}
        {JSON.parse(getItem("employee")).role === "teacher" && (
          <SecurityOutlinedIcon />
        )}

        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          {JSON.parse(getItem("employee")).role}
        </Typography>
      </Box>

      {open && (
        <StudentCoursesModal setOpen={setOpen} open={open} student={student} />
      )}
    </>
  );
};
