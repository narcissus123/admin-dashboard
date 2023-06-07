import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useGridApiContext } from "@mui/x-data-grid";

import { useTable } from "../../../../../utils/table/Table";

const EditInputCell = ({ params }) => {
  const { id, error, value: valueProp, field, errorMessage } = params;
  const [value, setValue] = React.useState(valueProp);
  const apiRef = useGridApiContext();

  // Getting user input.
  const rowData = useTable();
  // Custom component to be rendered when value of cell is in edit mode.
  const handleChange = (event) => {
    const newValue = event.target.value; // The new value entered by the user
    apiRef.current.setEditCellValue({
      id,
      field,
      value: newValue,
      debounceMs: 200,
    });
    setValue(newValue);
  };

  React.useEffect(() => {
    if (!error) {
      rowData.setUpdatedValue({ [field]: params.value });
    }
  }, [params.value]);
  return (
    <Tooltip open={!!error} title={errorMessage}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          backgroundColor: "black",
          border: "none",
          height: "100%",
          width: "100%",
          border: "1px solid red",
          border: "none",
          color: error ? "red" : "white",
        }}
      />
    </Tooltip>
  );
};

export default React.memo(EditInputCell);
