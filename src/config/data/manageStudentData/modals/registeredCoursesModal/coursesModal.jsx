import * as React from "react";
import { Box, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { tokens } from "../../../../../global/theme/Theme";
import { RegisteredCourses } from "./registeredCourses/RegisteredCourses";
import { AllCourses } from "./allCourses/AllCourses";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const StudentCoursesModal = ({ setOpen, open, student }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //console.log("student", student);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* console.log(student.courses[0].lesson.lessonName);
  console.log(student.courses[0].teacher.fullName);
  console.log(dayjs(student.courses[0].startDate).format("DD/MM/YYYY"));
  console.log(dayjs(student.courses[0].endDate).format("DD/MM/YYYY"));
  console.log(student.courses[0].lesson.topics); */

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "53%",
            typography: "body1",
            margin: "10% auto",
            background: `${colors.primary[400]} !important`,
            borderRadius: "10px",
          }}
        >
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
              >
                <Tab label="Registered Course" value="1" />
                <Tab label="All Courses" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <RegisteredCourses student={student} />
            </TabPanel>
            <TabPanel value="2">
              <AllCourses />
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
};
