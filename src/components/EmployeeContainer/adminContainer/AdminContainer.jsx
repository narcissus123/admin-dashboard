import React from "react";
import { SubHeader } from "../../layout/subHeader/SubHeader";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { useFetch } from "../../../hooks/useFetch";
import { getEmployees } from "../../../core/services/api/manage-employees.api";
import { CustomNoRowsOverlay } from "../../common/customNoRowsOverlay/CustomNoRowsOverlay";
import LinearProgress from "@mui/material/LinearProgress";
import CustomToolbar from "./gridToolbar/CustomToolbar";

import { Columns } from "./tableColumn/TableColumn";
import { Table } from "../../common/table/Table";

const AdminContainer = () => {
  /* Saving students information sent from backend. */
  const [rows, setRows] = React.useState([]);

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const { isLoading, data } = useFetch(getEmployees);

  React.useEffect(() => {
    if (isLoading) {
      setRows([]);
    } else {
      const adminsData = data.filter((admin) => admin.role === "admin");
      const updatedData = adminsData.map((term) => {
        term = { ...term, id: term._id };
        return term;
      });

      setRows(updatedData);
    }
  }, [isLoading]);

  return (
    <Box m="20px" sx={{ flex: "1" }}>
      <ToastContainer />
      <SubHeader title="Admins" />
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

export default React.memo(AdminContainer);
