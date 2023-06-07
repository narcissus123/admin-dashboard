import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useTable } from "../../../../../utils/table/Table";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const EditCheckBoxCell = ({ params }) => {
  const [checked, setChecked] = React.useState(params.value);

  const cellData = useTable();

  const handleChange = (e) => {
    setChecked(e.target.checked);
    cellData.setStudentActiveValue(e.target.checked);
  };

  return <Checkbox {...label} checked={checked} onChange={handleChange} />;
};

export default React.memo(EditCheckBoxCell);
