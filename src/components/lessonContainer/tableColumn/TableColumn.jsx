import React from "react";

import EditLessonCell from "../tableCells/viewModeCells/actionCells/EditLessonCell";
import LessonImageCell from "../tableCells/viewModeCells/LessonImageCell";

export const Columns = (rows, setRows) => {
  return [
    {
      field: "image",
      headerName: "Image",
      flex: 0,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => <LessonImageCell params={params} />,
    },
    {
      field: "lessonName",
      headerName: "Lesson name",
      flex: 0,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: null,
    },
    {
      field: "createDate",
      headerName: "CreateDate",
      flex: 0,
      editable: false,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row["createDate"]);
      },
      renderCell: null,
    },
    {
      field: "topics",
      headerName: "Topics",
      flex: 1,
      editable: false,
      type: "string",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: false,
      type: "string",
      renderCell: null,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <EditLessonCell params={params} setRows={setRows} rows={rows} />,
        ];
      },
    },
  ];
};
