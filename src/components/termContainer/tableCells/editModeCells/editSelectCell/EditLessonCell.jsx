import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useTable } from "../../../../../utils/table/Table";
import { getAllLessons } from "../../../../../core/services/api/manage-lessons.api";
import { useFetch } from "../../../../../hooks/useFetch";

const EditLessonCell = (params) => {
  const { data } = useFetch(getAllLessons);
  const rowData = useTable();
  const [lessons, setLessons] = React.useState(params.row.lesson.lessonName);

  const handleChange = (event) => {
    setLessons(event.target.value);

    // Finding the id of selected row.
    let selected = data.filter(
      (lesson) => lesson.lessonName === event.target.value
    );

    rowData.setUpdatedValue({ ["lesson"]: selected[0]._id });
  };
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">Lesson</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lessons}
        label="lesson"
        onChange={handleChange}
      >
        {data.map((lesson) => (
          <MenuItem
            key={lesson._id}
            value={lesson.lessonName}
            name={lesson._id}
          >
            {lesson.lessonName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(EditLessonCell);
