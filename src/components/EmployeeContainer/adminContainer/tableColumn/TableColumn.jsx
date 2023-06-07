import React from "react";

import EditAdminCell from "../tableCells/actionsCells/EditAdminCell";
import AdminImageCell from "../tableCells/AdminImageCell";
import StatusCell from "../tableCells/actionsCells/statusCell/StatusCell";

export const Columns = (rows, setRows) => {
  return [
    {
      field: "lesson.image",
      headerName: "Image",
      flex: 0,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => <AdminImageCell params={params} />,
    },
    {
      field: "fullName",
      headerName: "Instructor Name",
      flex: 1,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: null,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
      type: "string",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0,
      editable: true,
      type: "string",
    },
    {
      field: "nationalId",
      headerName: "NationalId",
      flex: 0,
      editable: true,
      type: "number",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: true,
      type: "string",
    },
    {
      field: "birthDate",
      headerName: "Birth Date",
      flex: 0,
      editable: true,
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
      editable: true,
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
          <EditAdminCell params={params} setRows={setRows} rows={rows} />,
        ];
      },
    },
  ];
};
