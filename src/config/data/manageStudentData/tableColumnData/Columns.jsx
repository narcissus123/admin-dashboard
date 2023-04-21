import { RegisteredCoursesModal } from "../modals/registeredCoursesModal/coursesModal";
import { EditStudentModal } from "../modals/editStudentModal/EditStudentModal";
import { DeleteStudentModal } from "../modals/deleteStudentModal/DeleteStudentModal";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid-pro";
//const [prowId, setRowId] = React.useState(null);
export const columns = [
  {
    field: "fullName",
    headerName: "Full Name",
    flex: 1,
    cellClassName: "name-column--cell",
    editable: true,
  },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 1,
    editable: true,
  },
  {
    field: "nationalId",
    headerName: "National Id",
    flex: 1,
    editable: true,
  },
  {
    field: "courses",
    headerName: "Registered Courses",
    flex: 1,
    renderCell: ({ row: params }) => {
      return <RegisteredCoursesModal student={params} />;
    },
    editable: true,
  },
  {
    field: "isActive",
    headerName: "Status",
    type: "boolean",
    editable: true,
    renderCell: (params) => {
      //console.log("params: ", params.isActive);
      return (
        <h
          onClick={() => {
            console.log(params.row);
          }}
        >
          hello
        </h>
      );
    },
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    cellClassName: "actions",
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <DeleteStudentModal student={params.row} />
          <EditStudentModal student={params.row} />
        </>
      );
    },

    //  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    /* const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
      }; */
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    cellClassName: "actions",
    flex: 1,
    getActions: ({ id }) => {
      //  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      /* const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
      }; */
      if (false) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={() => {}}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={() => {}}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => {}}
          color="inherit"
          LinkComponent={<EditStudentModal />}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {}}
          color="inherit"
          component={<DeleteStudentModal />}
        />,
      ];
    },
  },
];

/* {
    field: "",
    headerName: "Registered Courses",
    flex: 1,
    renderCell: (params) => {
      return <RegisteredCoursesModal />;
    },
  },
  { field: "", headerName: "Status", flex: 1 },
  { field: "", headerName: "Edit", flex: 1 },
  { field: "", headerName: "Delete", flex: 1 }, 
  
  {
    field: "_id",
    headerName: "Edit  /  Delete",
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <DeleteStudentModal student={params.row} />
          <EditStudentModal student={params.row} />
        </>
      );
    },
  },
  
  */
