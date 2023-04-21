import React from "react";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeStudentFromCourse } from "../../../../../../core/services/api/manage-Courses.api";
import { Typography } from "@mui/material";

export const RegisteredCourses = ({ student }) => {
  const [secondary, setSecondary] = React.useState(false);

  const unenrollStudent = async (courseId) => {
    try {
      const result = await removeStudentFromCourse(student._id, courseId);
      if (result.success) {
        console.log("Student unenrolled.");
      }
    } catch (error) {
      console.log("Sorry. Something went wrong.");
    }
  };

  return (
    <>
      {student.courses.length === 0 ? (
        <Typography>No registered courses!</Typography>
      ) : (
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
                primary={`Course Name: ${course.lesson.lessonName}`}
                secondary={secondary ? "Secondary text" : null}
                sx={{ display: "block" }}
              />
              <ListItemText
                primary={`Instructor Name: ${course.teacher.fullName}`}
                secondary={secondary ? "Secondary text" : null}
              />

              <ListItemText
                primary={`Start Date: ${dayjs(course.startDate).format(
                  "DD/MM/YYYY"
                )}`}
                secondary={secondary ? "Secondary text" : null}
              />

              <ListItemText
                primary={`End Date: ${dayjs(course.endDate).format(
                  "DD/MM/YYYY"
                )}`}
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
