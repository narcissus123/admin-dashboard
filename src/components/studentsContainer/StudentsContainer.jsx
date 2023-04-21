import * as React from "react";
import { SubHeader } from "../layout/subHeader/SubHeader";
import { Box, useTheme } from "@mui/material";
import { allStudents } from "../../config/data/studentsList";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../global/theme/Theme";
import { getStudents } from "../../core/services/api/manage-students.api";
import { CustomNoRowsOverlay } from "../common/customNoRowsOverlay/CustomNoRowsOverlay";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridRowModes } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { EditStudentModal } from "../../config/data/manageStudentData/modals/editStudentModal/EditStudentModal";
import { CoursesModalButton } from "../../config/data/manageStudentData/modals/registeredCoursesModal/coursesModalButton/CoursesModalButton";
import { DeleteStudentModal } from "../../config/data/manageStudentData/modals/deleteStudentModal/DeleteStudentModal";

export const StudentsContainer = () => {
  /* Saving students information sent from backend. */

  const [rows, setRows] = React.useState([]);
  const [rowId, setRowId] = React.useState(null);
  const columns = React.useMemo(
    () => [
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
        headerName: "Courses",
        renderCell: ({ row: params }) => {
          return <CoursesModalButton student={params} />;
        },
        flex: 1,
        //editable: true,
      },
      {
        field: "isActive",
        headerName: "Status",
        type: "boolean",
        editable: true,
        //renderCell: (params) => params.row.isActive,

        //console.log("params: ", params.isActive);
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        cellClassName: "actions",
        flex: 1,
        renderCell: (params) => (
          <EditStudentModal {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  const getAllStudents = () => {
    try {
      //const data = await getStudents();
      const data = allStudents[0].result;
      if (data.success) {
        setRows(data.result);
      }
    } catch (error) {
      console.log("Sorry! There is a problem loading students list.");
    }
  };

  /* Call API to get all courses. */
  React.useEffect(() => {
    getAllStudents();
  }, []);

  const [rowModesModel, setRowModesModel] = React.useState({});

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("allStudents.result.courses: ", allStudents[0].result[1].courses);
  return (
    <Box m="20px">
      <SubHeader title="STUDENTS" subtitle="Manage Students" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id.slice(0, 7)}
          rows={allStudents[0].result}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          editMode="row"
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            loadingOverlay: LinearProgress,
          }}
          onCellEditCommit={(params) => setRowId(params.id)}
        />
      </Box>
    </Box>
  );
};
