import React from "react";
import { SubHeader } from "../../layout/subHeader/SubHeader";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";

import { CustomNoRowsOverlay } from "../../common/customNoRowsOverlay/CustomNoRowsOverlay";
import CustomToolbar from "./GridToolbar/CustomToolbar";
import { Columns } from "./tableColumn/TableColumn";
import { Table } from "../../common/table/Table";

import { useFetch } from "../../../hooks/useFetch";
import { getInstructors } from "../../../core/services/api/manage-employees.api";

const InstractorContainer = () => {
  /* Saving Instructors information sent from backend. */
  const [rows, setRows] = React.useState([]);

  // Saving id of selected table rows
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  // Sending request data to the server.
  const { isLoading, data } = useFetch(getInstructors);

  React.useEffect(() => {
    if (isLoading) {
      setRows([]);
    } else {
      const updatedData = data.map((instructors) => {
        instructors = { ...instructors, id: instructors._id };
        return instructors;
      });

      setRows(updatedData);
    }
  }, [isLoading]);

  return (
    <Box m="20px" sx={{ flex: "1" }}>
      <ToastContainer />
      <SubHeader title="Instructors" />
      <Table
        columns={Columns(rows, setRows)}
        rows={rows}
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          toolbar: {
            setRows,
            rows,
            rowSelectionModel,
            setRowSelectionModel,
          },
        }}
        loading={isLoading}
        onRowSelectionModelChange={React.useCallback(
          (newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel),
          []
        )}
        rowSelectionModel={rowSelectionModel}
      />
    </Box>
  );
};

export default React.memo(InstractorContainer);
