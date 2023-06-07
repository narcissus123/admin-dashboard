import React from "react";
import { SubHeader } from "../layout/subHeader/SubHeader";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer } from "react-toastify";

import CustomToolbar from "./tableGridToolbar/GridToolbar";
import { CustomNoRowsOverlay } from "../common/customNoRowsOverlay/CustomNoRowsOverlay";
import { Table } from "../common/table/Table";
import { Columns } from "./tableColumn/TableColumn";

import { getStudents } from "../../core/services/api/manage-students.api";
import { useFetch } from "../../hooks/useFetch";

const StudentsContainer = () => {
  /* Saving students information sent from backend. */
  const [rows, setRows] = React.useState([]);
  const [cellModesModel, setCellModesModel] = React.useState({});
  const [err, setErr] = React.useState(false);

  // Saving id of selected table rows
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  /* Saving students information sent from backend. */
  const { isLoading, data } = useFetch(getStudents);
  React.useEffect(() => {
    if (isLoading) {
      setRows([]);
    } else {
      const updatedData = data.map((student) => {
        const { _id } = student;
        student = { ...student, id: _id };
        return student;
      });

      setRows(updatedData);
    }
  }, [isLoading]);

  return (
    <Box m="20px">
      <ToastContainer />
      <SubHeader title="STUDENTS" subtitle="Manage Students" />
      <Table
        columns={Columns(rows, setRows, cellModesModel, setCellModesModel, err)}
        rows={rows}
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setCellModesModel,
            cellModesModel,
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
        cellModesModel={cellModesModel}
      />
    </Box>
  );
};

export default React.memo(StudentsContainer);
