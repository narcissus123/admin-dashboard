import React from "react";
import { useTheme } from "@mui/material";
import { getStudents } from "../../../core/services/api/manage-students.api";
import { getAllTeachers } from "../../../core/services/api/Employee-authentication.api";
import { getAllComments } from "../../../core/services/api/manage-comments.api";
import { getCourses } from "../../../core/services/api/manage-Courses.api";
import { useFetch } from "../../../hooks/useFetch";
import { tokens } from "../../../global/theme/Theme";

import CommentIcon from "@mui/icons-material/Comment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export const addEmployeeData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const teachers = useFetch(getAllTeachers);
  const messages = useFetch(getAllComments);
  const courses = useFetch(getCourses);
  const students = useFetch(getStudents);

  let activeTeachers = teachers.data.filter(
    (teacher) => teacher.isActive === true
  );
  let totalInstructors = teachers.data.length;

  let totalCourses = courses.data.length;

  let totalMessages = messages.data.length;
  let validatedmessages = messages.data.filter(
    (message) =>
      message.username.split(" ")[0] !== "userChat" &&
      message.username.split(" ")[0] !== "adminChat" &&
      message.verified === true
  );

  let totalStudents = students.data.length;

  const pieOptions = {
    legend: "none",
    pieSliceText: "label",
    pieStartAngle: 100,
    pieHole: 0.8,
    backgroundColor: "transparent",
    border: "non",
  };

  return [
    {
      title: totalInstructors,
      subtitle: "Number of Instructors",

      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 640 512"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: colors.greenAccent[600], fontSize: "26px" }}
        >
          <path d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z"></path>
        </svg>
      ),
      pieData: [
        ["statistics", "percentage of active instructors"],
        ["active", activeTeachers],
        ["inactive", 1 - activeTeachers],
      ],
      pieOptions: {
        legend: "none",
        pieSliceText: "label",
        pieStartAngle: 100,
        pieHole: 0.8,
        backgroundColor: "transparent",
        border: "non",
      },
      pieStyle: {
        width: "70px",
        height: "70px",
      },
    },
    {
      title: totalMessages,
      subtitle: "Number of Messages / Chats",

      icon: (
        <CommentIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      pieData: [
        ["statistics", "percentage of active instructors"],
        ["read", validatedmessages],
        ["not read", 1 - validatedmessages],
      ],
      pieOptions: {
        legend: "none",
        pieSliceText: "label",
        pieStartAngle: 100,
        pieHole: 0.8,
        backgroundColor: "transparent",
        border: "non",
      },
      pieStyle: {
        width: "70px",
        height: "70px",
      },
    },
    {
      title: totalCourses,
      subtitle: "Number of Courses",

      icon: (
        <MenuBookIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      pieData: [
        ["statistics", "percentage of active instructors"],
        ["read", validatedmessages],
        ["not read", 1 - validatedmessages],
      ],
      pieOptions: {
        legend: "none",
        pieSliceText: "label",
        pieStartAngle: 100,
        pieHole: 0.8,
        backgroundColor: "transparent",
        border: "non",
      },
      pieStyle: {
        width: "70px",
        height: "70px",
      },
    },
    {
      title: totalStudents,
      subtitle: "Number of Students",

      icon: (
        <LocalLibraryOutlinedIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      pieData: [
        ["statistics", "percentage of active instructors"],
        ["read", validatedmessages],
        ["not read", 1 - validatedmessages],
      ],
      pieOptions: {
        legend: "none",
        pieSliceText: "label",
        pieStartAngle: 100,
        pieHole: 0.8,
        backgroundColor: "transparent",
        border: "non",
      },
      pieStyle: {
        width: "70px",
        height: "70px",
      },
    },
  ];
};
// <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
