import { getAllLessons } from "../../../core/services/api/manage-lessons.api";
import { getAllTeachers } from "../../../core/services/api/Employee-authentication.api";
import { useFetch } from "../../../hooks/useFetch";

export const addTermData = () => {
  const teacherOptions = [];
  const lessonOptions = [];

  const teachers = useFetch(getAllTeachers);
  const lessons = useFetch(getAllLessons);

  teachers.data.map((teacher) => {
    teacherOptions.push({
      value: teacher._id,
      label: teacher.fullName,
    });
  });
  lessons.data.map((lesson) => {
    lessonOptions.push({
      value: lesson._id,
      label: lesson.lessonName,
    });
  });

  return [
    {
      fullWidth: true,
      variant: "filled",
      type: "text",
      label: "Title",
      name: "title",
      sx: { gridColumn: "span 4" },
      required: true,
    },
    {
      fullWidth: true,
      variant: "filled",
      type: "number",
      label: "Cost",
      name: "cost",
      sx: { gridColumn: "span 2" },
      required: true,
    },
    {
      fullWidth: true,
      variant: "filled",
      type: "number",
      label: "Capacity",
      name: "capacity",
      sx: { gridColumn: "span 2" },
      required: true,
    },
    {
      fullWidth: true,
      label: "Instructor",
      name: "instructor",
      sx: { gridColumn: "span 2" },
      options: teacherOptions,
      required: true,
    },
    {
      fullWidth: true,
      label: "Lesson",
      name: "lesson",
      sx: { gridColumn: "span 2" },
      options: lessonOptions,
      required: true,
    },
    {
      fullWidth: true,
      variant: "filled",
      type: "date",
      label: "Start Date",
      name: "startDate",
      sx: { gridColumn: "span 4" },
      required: true,
    },
    {
      fullWidth: true,
      variant: "filled",
      type: "date",
      label: "End Date",
      name: "endDate",
      sx: { gridColumn: "span 4" },
      required: true,
    },
  ];
};
