import React from "react";
import { SubHeader } from "../layout/subHeader/SubHeader";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer } from "react-toastify";
import CustomToolbar from "./tableGridToollbar/GridToolbar";
import { CustomNoRowsOverlay } from "../common/customNoRowsOverlay/CustomNoRowsOverlay";
import { Columns } from "./tableColumn/TableColumn";
import { Table } from "../common/table/Table";

import { useFetch } from "../../hooks/useFetch";
import { getCourses } from "../../core/services/api/manage-Courses.api";

const TermContainer = () => {
  const [rows, setRows] = React.useState([]);
  const [cellModesModel, setCellModesModel] = React.useState({});
  const [err, setErr] = React.useState(false);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  let obj = {};

  /* Saving students information sent from backend. */
  const { isLoading, data } = useFetch(getCourses);

  React.useEffect(() => {
    if (isLoading) {
      setRows([]);
    } else {
      const updatedData = data.map((term) => {
        term = { ...term, id: term._id };
        return term;
      });

      setRows(updatedData);
    }
  }, [isLoading]);

  return (
    <Box m="20px" sx={{ flex: "1" }}>
      <ToastContainer />
      <SubHeader title="TERMS" />
      <Table
        columns={Columns(
          rows,
          setRows,
          cellModesModel,
          setCellModesModel,
          err,
          obj
        )}
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

export default React.memo(TermContainer);
