import React from "react";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

import DeleteInstruCourseModal from "./DeleteInstruCourseModal";

import DeleteIcon from "@mui/icons-material/Delete";

const EditInstructorCell = ({ params, setRows, rows }) => {
  const [open, setOpen] = React.useState(false);

  return [
    <>
      <Box sx={{ marginY: 1, marginRight: 1, position: "relative" }}>
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Edit"
          className="textPrimary"
          onClick={React.useCallback(() => {
            setOpen(true);
          }, [])}
          color="inherit"
        />
      </Box>
      {open && (
        <DeleteInstruCourseModal
          setOpen={setOpen}
          open={open}
          setRows={setRows}
          rows={rows}
          CourseId={params.id}
          CourseTitle={params.row.title}
        />
      )}
    </>,
  ];
};

export default React.memo(EditInstructorCell);
