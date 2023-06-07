import * as React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import DeleteLessonModal from "./deleteLessonModal/DeleteLessonModal";
import EditLessonModal from "./editLessonModal/EditLessonModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditLessonCell = ({ params, setRows, rows }) => {
  const [openDel, setOpenDel] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  return [
    <>
      <Box sx={{ m: 1, position: "relative" }}>
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setOpenEdit(true);
          }}
        />
      </Box>
      {open && (
        <EditLessonModal
          setOpen={setOpenEdit}
          open={openEdit}
          setRows={setRows}
          rows={rows}
          lessonId={params.id}
          lessonTitle={params.row.title}
        />
      )}
    </>,
    <>
      <Box sx={{ m: 1, position: "relative" }}>
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => {
            setOpenDel(true);
          }}
          color="inherit"
        />
      </Box>
      {open && (
        <DeleteLessonModal
          setOpen={setOpenDel}
          open={openDel}
          setRows={setRows}
          rows={rows}
          lessonId={params.id}
          lessonTitle={params.row.title}
        />
      )}
    </>,
  ];
};

export default React.memo(EditLessonCell);
