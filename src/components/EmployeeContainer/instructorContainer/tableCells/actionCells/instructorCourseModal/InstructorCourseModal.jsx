import React from "react";
import {
  Box,
  useTheme,
  Typography,
  IconButton,
  Button,
  Avatar,
} from "@mui/material";

import { CustomModal } from "../../../../../common/modal/Modal";
import { Table } from "../../../../../common/table/Table";
import EditCourseCell from "./actionsCell/EditCourseCell";

import { tokens } from "../../../../../../global/theme/Theme";

import CloseIcon from "@mui/icons-material/Close";

const InstructorCourseModal = ({
  setOpen,
  open,
  selectedRow,
  instructorTitle,
}) => {
  const [courseRows, setCourseRows] = React.useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  React.useEffect(() => {
    setCourseRows(
      selectedRow.courses.map(
        (course) => (course = { ...course, id: course._id })
      )
    );
  }, []);
  const handleDelete = () => {};
  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      callBackFunc={handleDelete}
      modalHeader={false}
      modalFooter={false}
      buttonText="Delete"
      btnStyle="error"
    >
      <Box
        sx={{
          height: "44px",
          borderBottom: `1px solid ${colors.blueAccent[700]}`,
          boxShadow: 1,
          display: "flex",
          paddingX: "13px",
          justifyContent: "around",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            flex: 1,
            fontSize: "16px",
            color: `${colors.greenAccent[600]}`,
          }}
        >
          Instructor Courses: <span style={{}}>{instructorTitle}</span>
        </Typography>
        <IconButton>
          <CloseIcon onClick={() => setOpen(false)} />
        </IconButton>
      </Box>
      {/* Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Table
          columns={Columns(courseRows, setCourseRows, selectedRow)}
          rows={courseRows}
          height="45vh"
        />
      </Box>
      <Box
        sx={{
          height: "50px",
          borderTop: `1px solid ${colors.blueAccent[700]}`,
          boxShadow: 1,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginTop: "18px",
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            fontWeight: "bold",
            fontSize: "small",
            marginRight: "30px",
            backgroundColor: `${colors.greenAccent[600]}`,
          }}
          onClick={() => setOpen(false)}
        >
          CLOSE
        </Button>
      </Box>
    </CustomModal>
  );
};

export const Columns = (courseRows, setCourseRows, selectedRow) => {
  return [
    {
      field: "lesson.image",
      headerName: "Image",
      flex: 0,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => <Avatar src={params.lesson.image} />,
    },
    {
      field: "title",
      headerName: "Lesson name",
      flex: 0,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: null,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0,
      editable: true,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row["startDate"]);
      },
      renderCell: null,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      flex: 0,
      editable: true,
      type: "number",
      renderCell: null,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <EditCourseCell
            setRows={setCourseRows}
            rows={courseRows}
            params={params}
          />,
        ];
      },
    },
  ];
};

export default React.memo(InstructorCourseModal);
