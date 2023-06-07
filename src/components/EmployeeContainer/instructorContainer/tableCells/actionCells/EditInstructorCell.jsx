import * as React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import DeleteEmployeeModal from "../../../common/modals/deleteEmployeeModal/DeleteEmployeeModal";
import EditEmployeeModal from "../../../common/modals/editEmployeeModal/EditEmployeeModal";
import InstructorCourseModal from "./instructorCourseModal/InstructorCourseModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const EditInstructorCell = ({ params, setRows, rows }) => {
  const [openDel, setOpenDel] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCourse, setOpenCourse] = React.useState(false);

  return [
    <>
      <Box sx={{ marginY: 1, position: "relative" }}>
        <GridActionsCellItem
          icon={<MenuBookIcon />}
          label="Edit"
          className="textPrimary"
          onClick={React.useCallback(() => {
            setOpenCourse(true);
          }, [])}
          color="inherit"
        />
      </Box>
      {openCourse && (
        <InstructorCourseModal
          setOpen={setOpenCourse}
          open={openCourse}
          setRows={setRows}
          selectedRow={params.row}
          rows={rows}
          instructorId={params.id}
          instructorTitle={params.row.fullName}
        />
      )}
    </>,
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
          instructorId={params.id}
          instructorTitle={params.row.title}
        />
      )}
    </>,
  ];
};

export default React.memo(EditInstructorCell);
