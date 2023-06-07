import React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import DeleteEmployeeModal from "../../../common/modals/deleteEmployeeModal/DeleteEmployeeModal";
import EditEmployeeModal from "../../../common/modals/editEmployeeModal/EditEmployeeModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditAdminCell = ({ params, setRows, rows }) => {
  const [openDel, setOpenDel] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  return [
    <>
      <Box sx={{ marginY: 1, position: "relative" }}>
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={React.useCallback(() => {
            setOpenEdit(true);
          }, [])}
        />
      </Box>
      {openEdit && (
        <EditEmployeeModal
          setOpen={setOpenEdit}
          open={openEdit}
          setRows={setRows}
          selectedRow={params.row}
        />
      )}
    </>,
    <>
      <Box sx={{ marginY: 1, marginRight: 1, position: "relative" }}>
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Edit"
          className="textPrimary"
          onClick={React.useCallback(() => {
            setOpenDel(true);
          }, [])}
          color="inherit"
        />
      </Box>
      {openDel && (
        <DeleteEmployeeModal
          setOpen={setOpenDel}
          open={openDel}
          setRows={setRows}
          rows={rows}
          iadminId={params.id}
          adminTitle={params.row.title}
        />
      )}
    </>,
  ];
};

export default React.memo(EditAdminCell);
