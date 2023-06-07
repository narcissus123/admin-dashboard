import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useTable } from "../../../../../utils/table/Table";
import { getAllTeachers } from "../../../../../core/services/api/Employee-authentication.api";
import { useFetch } from "../../../../../hooks/useFetch";

const EditInstructorCell = (params) => {
  const { data } = useFetch(getAllTeachers);
  const rowData = useTable();
  const [instructors, setInstructors] = React.useState(
    params.row.teacher.fullName
  );

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">Instructors</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={instructors}
        label="Instructors"
        onChange={(event) => {
          setInstructors(event.target.value);

          // Finding the id of selected row.
          let selected = data.filter(
            (teacher) => teacher.fullName === event.target.value
          );

          rowData.setUpdatedValue({ ["teacher"]: selected[0]._id });
        }}
      >
        {data.map((instructor) => (
          <MenuItem key={instructor._id} value={instructor.fullName}>
            {instructor.fullName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(EditInstructorCell);
