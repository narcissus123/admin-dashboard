import React from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { CustomModal } from "../../../../../common/modal/Modal";
import RegisteredCourses from "./registeredCourses/RegisteredCourses";
import AllCourses from "./allCourses/AllCourses";

// This component shows list of courses that student is registered and list of courses that student can register.
// Admin can register and unregister the student from the course from here.
export const StudentCoursesModal = ({
  setOpen,
  open,
  student,
  setRows,
  rows,
}) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomModal open={open} setOpen={setOpen}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            textColor="secondary"
          >
            <Tab
              label="Registered Course"
              value="1"
              sx={{ "&:hover": { cursor: "pointer" } }}
            />
            <Tab label="All Courses" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RegisteredCourses student={student} rows={rows} setRows={setRows} />
        </TabPanel>
        <TabPanel value="2">
          <AllCourses student={student} setRows={setRows} rows={rows} />
        </TabPanel>
      </TabContext>
    </CustomModal>
  );
};
