import React from "react";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

import { removeStudentFromCourse } from "../../../../../../../core/services/api/manage-Courses.api";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

// This component shows list of courses that student is registered. Admin can unenrol the student from the course from here.
const RegisteredCourses = ({ student, setRows, rows }) => {
  const unenrollStudent = async (courseId) => {
    try {
      const response = await removeStudentFromCourse(student._id, courseId);

      if (response.success) {
        toast.success("Student is unenrolled from the course successfully.");

        // Removing student with updated information from list of students
        const students = rows.filter(
          (student) => student.id !== response.result.studentModel._id
        );

        let studentCourses = student.courses.filter(
          (course) => course._id !== response.result.course._id
        );

        // Adding id and updating student registered courses.
        const updatedStudent = {
          ...response.result.studentModel,
          id: response.result.studentModel._id,
          courses: studentCourses,
        };

        // Adding updated student information to the list of students' information.
        setRows([...students, updatedStudent]);
      } else {
        toast.error("Sorry. Something went wrong.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {student.courses.length === 0 ? (
        <Typography>No registered courses!</Typography>
      ) : (
        // List of registered courses.
        <List
          sx={{
            maxHeight: "400px",
            overflow: "auto",
            width: "100%",
            paddingRight: "12px",
          }}
        >
          {student.courses.map((course) => (
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                "&": {
                  borderColor: `#4cceac !important`,
                },
                borderRadius: "10px",
                border: 1,
                marginBottom: "8px",
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{
                    borderLeft: 1,
                    borderRadius: "0%",
                    height: "150px",
                    "&": {
                      borderColor: `#4cceac !important`,
                    },
                  }}
                >
                  <DeleteIcon
                    sx={{
                      width: "35px",
                      height: "36px",
                      borderRadius: "100%",
                      mx: "10px",
                    }}
                    onClick={() => unenrollStudent(course._id)}
                  />
                </IconButton>
              }
            >
              <ListItemText
                primary="Course Name:"
                secondary={course.lesson.lessonName}
                sx={{ display: "block" }}
              />
              <ListItemText
                primary="Instructor Name:"
                secondary={course.teacher.fullName}
              />

              <ListItemText
                primary="Start Date:"
                secondary={dayjs(course.startDate).format("DD/MM/YYYY")}
              />

              <ListItemText
                primary="End Date:"
                secondary={dayjs(course.endDate).format("DD/MM/YYYY")}
              />

              <ListItemText
                primary="Keywords:"
                secondary={course.lesson.topics}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default React.memo(RegisteredCourses);
