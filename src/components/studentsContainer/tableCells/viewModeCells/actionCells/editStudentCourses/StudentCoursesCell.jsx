import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

import { getItem } from "../../../../../../core/services/storage/Storage";
import { StudentCoursesModal } from "./coursesModal";

import { tokens } from "../../../../../../global/theme/Theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

// This component displays a button in the students table that allows the administrator and teacher to view students' enrolled and unenrolled courses.
const StudentCoursesCell = ({ student, setRows, rows }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Box
        m="0 auto"
        p="6px 9px"
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
        sx={{ cursor: "pointer" }}
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
        <StudentCoursesModal
          setOpen={setOpen}
          open={open}
          student={student}
          setRows={setRows}
          rows={rows}
        />
      )}
    </Box>
  );
};

export default React.memo(StudentCoursesCell);
