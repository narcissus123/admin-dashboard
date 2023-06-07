import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGridApiContext } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import { useTable } from "../../../../../utils/table/Table";

const CustomPicker = styled(DatePicker)(({ theme }) => ({
  "&.MuiStack-root css-1xhypcz-MuiStack-root": {
    overflow: "hidden",
  },

  "&.MuiStack-root": {
    display: "block",

    gap: "2px",
    overflow: "none",
    paddingTop: "0px",
    maxWidth: "0px",
  },
  "&.MuiFormControl-root": {
    width: `20px !important`,
    color: `red !important`,
  },
}));

const EditDateCell = (params) => {
  const { id, error, value: valueProp, field, errorMessage } = params;
  const rowData = useTable();

  const [value, setValue] = React.useState(dayjs(valueProp));
  const apiRef = useGridApiContext();

  const handleChange = (newValue) => {
    apiRef.current.setEditCellValue({
      id,
      field,
      value: new Date(newValue),
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <Tooltip open={error} title={errorMessage}>
          <CustomPicker
            slotProps={{ textField: { size: "small" } }}
            value={value}
            onChange={handleChange}
            style={{
              backgroundColor: "red",
              border: "none",
              display: "block",
              height: "10px",
              color: error ? "red" : "white",
              padding: "0px",
              margin: "0px",
              overflow: "hidden",
              width: `400px !important`,
              backgroundColor: "red",
              border: "1px solid red",
            }}
          />
        </Tooltip>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default React.memo(EditDateCell);
