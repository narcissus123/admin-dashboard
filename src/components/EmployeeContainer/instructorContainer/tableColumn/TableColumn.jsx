import React from "react";

import EditInstructorCell from "../tableCells/actionCells/EditInstructorCell";
import InstructorImageCell from "../tableCells/InstructorImageCell";
import StatusCell from "../tableCells/actionCells/statusCell/StatusCell";

export const Columns = (rows, setRows) => {
  return [
    {
      field: "lesson.image",
      headerName: "Image",
      flex: 0,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => <InstructorImageCell params={params} />,
    },
    {
      field: "fullName",
      headerName: "Instructor Name",
      flex: 1,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: null,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: false,
      type: "string",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0,
      editable: false,
      type: "string",
    },
    {
      field: "nationalId",
      headerName: "NationalId",
      flex: 0,
      editable: false,
      type: "number",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: false,
      type: "string",
    },
    {
      field: "birthDate",
      headerName: "Birth Date",
      flex: 0,
      editable: false,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row["birthDate"]);
      },
      renderCell: null,
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 0,
      type: "boolean",
      editable: false,
      renderCell: ({ row: params }) => {
        return <StatusCell params={params} />;
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 0,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <EditInstructorCell params={params} setRows={setRows} rows={rows} />,
        ];
      },
    },
  ];
};
