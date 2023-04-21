import React from "react";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { addStudentToCourse } from "../../../../../../core/services/api/manage-Courses.api";
import { Typography } from "@mui/material";
import { allCourses } from "../../../../../data/AllCoursesData";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
export const AllCourses = ({ student }) => {
  const [secondary, setSecondary] = React.useState(false);

  const enrollStudent = async (courseId) => {
    try {
      const result = await addStudentToCourse(student._id, courseId);
      if (result.success) {
        console.log("The student was registered.");
      }
    } catch (error) {
      console.log("Sorry. Something went wrong.");
    }
  };

  console.log("allCourses.result: ", allCourses.result);
  return (
    <>
      {allCourses.result.length === 0 ? (
        <Typography>No courses!</Typography>
      ) : (
        <List
          sx={{
            maxHeight: "400px",
            overflow: "auto",
            width: "100%",
            paddingRight: "12px",
          }}
        >
          {allCourses.result.map((course) => (
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                //backgroundColor: `white !important`,
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
                primary={`Course Name: ${course.lesson.lessonName}`}
                secondary={secondary ? "Secondary text" : null}
                sx={{ display: "block" }}
              />
              <ListItemText
                primary={`Instructor Name: ${course.teacher.fullName}`}
                secondary={secondary ? "Secondary text" : null}
              />
              <ListItemText
                primary={`Remaining Cpacity: ${
                  course.capacity - course.students.length
                }`}
                secondary={secondary ? "Secondary text" : null}
              />

              <ListItemText
                primary={`Start Date: ${dayjs(course.startDate).format(
                  "DD/MM/YYYY"
                )}  /  End Date: ${dayjs(course.endDate).format("DD/MM/YYYY")}`}
                secondary={secondary ? "Secondary text" : null}
              />

              <ListItemText
                primary={`Keywords: ${course.lesson.topics}`}
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
