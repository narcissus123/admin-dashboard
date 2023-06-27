import React from "react";
import { SubHeader } from "../layout/subHeader/SubHeader";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer } from "react-toastify";

import { CustomNoRowsOverlay } from "../common/customNoRowsOverlay/CustomNoRowsOverlay";
import CustomToolbar from "./gridToolbar/CustomToolbar";
import { Columns } from "./tableColumn/TableColumn";
import { Table } from "../common/table/Table";

import { useFetch } from "../../hooks/useFetch";
import { getAllLessons } from "../../core/services/api/manage-lessons.api";

const LessonContainer = () => {
  /* Saving lesson information sent from server. */
  const [rows, setRows] = React.useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const { isLoading, data } = useFetch(getAllLessons);

  React.useEffect(() => {
    if (isLoading) {
      setRows([]);
    } else {
      const updatedData = data.map((lesson) => {
        lesson = { ...lesson, id: lesson._id };
        return lesson;
      });

      setRows(updatedData);
    }
  }, [isLoading]);

  return (
    <Box
      sx={{
        flex: "1",
        marginX: "20px",
        marginTop: "100px",
        marginBottom: "50px",
      }}
    >
      <ToastContainer />
      <SubHeader
        title="LESSONS"
        color="secondary"
        sx={{ color: "secondary" }}
      />
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

export default React.memo(LessonContainer);
