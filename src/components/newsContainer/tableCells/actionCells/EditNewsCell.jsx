import * as React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import DeleteNewsModal from "./deleteNewsModal/DeleteNewsModal";
import EditNewsModal from "./editNewsModal/EditNewsModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditNewsCell = ({ params, setRows, rows }) => {
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
        <EditNewsModal
          setOpen={setOpenEdit}
          open={openEdit}
          setRows={setRows}
          rows={rows}
          newsId={params.id}
          selectedRow={params}
          newsTitle={params.row.title}
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
        <DeleteNewsModal
          setOpen={setOpenDel}
          open={openDel}
          setRows={setRows}
          rows={rows}
          newsId={params.id}
          newsTitle={params.row.title}
        />
      )}
    </>,
  ];
};

export default React.memo(EditNewsCell);
