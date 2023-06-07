import React from "react";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { toast } from "react-toastify";

import { addStudentToCourse } from "../../../../../../../core/services/api/manage-Courses.api";
import { getCourses } from "../../../../../../../core/services/api/manage-Courses.api";
import { useFetch } from "../../../../../../../hooks/useFetch";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

// This component shows list of courses that student can register. Admin can add student to the courses here.
const AllCourses = ({ student, setRows, rows }) => {
  const [courses, setCourses] = React.useState([]);

  // Getting list of all courses offered by institute.
  const { isLoading, data } = useFetch(getCourses);

  React.useEffect(() => {
    if (isLoading) {
      setCourses([]);
    } else {
      let notTakenCourses = data;

      // Filterring courses that student is registered from all courses offered by institute (unregistered courses).
      student.courses.map(
        (registeredCourse) =>
          (notTakenCourses = notTakenCourses.filter(
            (course) => course._id !== registeredCourse._id
          ))
      );

      // Removing courses with no capacity from the list of unregistered courses.
      let coursesWithCapacity = notTakenCourses.filter(
        (course) => course.capacity >= 0
      );

      setCourses(coursesWithCapacity);
    }
  }, [isLoading]);

  const enrollStudent = async (courseId) => {
    try {
      const response = await addStudentToCourse(student._id, courseId);

      if (response.success) {
        toast.success("The student was registered.");

        // Removing student with updated information from list of students
        const students = rows.filter(
          (student) => student.id !== response.result.studentModel._id
        );

        // Adding id and updated student registered courses.
        const updatedStudent = {
          ...response.result.studentModel,
          id: response.result.studentModel._id,
          courses: [response.result.course, ...student.courses],
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
      {courses.length === 0 ? (
        <Typography>No courses!</Typography>
      ) : (
        // List of unregistered courses that still has capacity.
        <List
          sx={{
            maxHeight: "400px",
            overflow: "auto",
            width: "100%",
            paddingRight: "12px",
          }}
        >
          {courses.map((course) => (
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "10px",
                border: 1,
                marginBottom: "8px",
                "&": {
                  borderColor: `#4cceac !important`,
                },
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
                  <AddIcon
                    sx={{
                      border: 1,
                      width: "35px",
                      height: "35px",
                      borderRadius: "100%",
                      mx: "10px",
                    }}
                    onClick={() => enrollStudent(course._id)}
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
                primary="Remaining Cpacity:"
                secondary={course.capacity - course.students.length}
              />

              <ListItemText
                primary={`Start Date: ${dayjs(course.startDate).format(
                  "DD/MM/YYYY"
                )}  /  End Date: ${dayjs(course.endDate).format("DD/MM/YYYY")}`}
                secondary="Secondary text"
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

export default React.memo(AllCourses);
