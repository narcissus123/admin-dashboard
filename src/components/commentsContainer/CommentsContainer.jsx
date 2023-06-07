import React from "react";
import { SubHeader } from "../layout/subHeader/SubHeader";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { useFetch } from "../../hooks/useFetch";
import { getAllComments } from "../../core/services/api/manage-comments.api";
import { CustomNoRowsOverlay } from "../common/customNoRowsOverlay/CustomNoRowsOverlay";
import LinearProgress from "@mui/material/LinearProgress";
import CustomToolbar from "./tableGridToolbar/GridToolbar";

import { Columns } from "./tableColumn/Columns";
import { Table } from "../common/table/Table";

const CommentsContainer = () => {
  /* Saving comments information sent from backend. */
  const [rows, setRows] = React.useState([]);
  // Saving cell modes (views, mode).
  const [cellModesModel, setCellModesModel] = React.useState({});

  // Sending request data to the server.
  const { isLoading, data } = useFetch(getAllComments);

  React.useEffect(() => {
    if (isLoading) {
      setRows([]);
    } else {
      // Filtering comments that are not related to the courses.
      const CourseComments = data.filter((comment) => {
        return (
          comment.username.split(" ")[0] !== "userChat" &&
          comment.username.split(" ")[0] !== "adminChat"
        );
      });
      const updatedData = CourseComments.map((comment) => {
        comment = { ...comment, id: comment._id };
        return comment;
      });

      setRows(updatedData);
    }
  }, [isLoading]);

  return (
    <Box m="20px" sx={{ flex: "1" }}>
      <ToastContainer />
      <SubHeader title="Commets" />
      <Table
        columns={Columns(rows, setRows, cellModesModel, setCellModesModel)}
        rows={rows}
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        loading={isLoading}
        cellModesModel={cellModesModel}
      />
    </Box>
  );
};

export default React.memo(CommentsContainer);
