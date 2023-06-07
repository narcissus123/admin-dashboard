import React from "react";

import EditNewsCell from "../tableCells/actionCells/EditNewsCell";
import NewsImageCell from "../tableCells/newsImageCell/NewsImageCell";

export const Columns = (rows, setRows) => {
  return [
    {
      field: "image",
      headerName: "Image",
      flex: 0,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => <NewsImageCell params={params} />,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: null,
    },
    {
      field: "text",
      headerName: "News",
      flex: 1,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: null,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      editable: false,
      type: "string",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: (params) => {
        return [<EditNewsCell params={params} setRows={setRows} rows={rows} />];
      },
    },
  ];
};
