import React from "react";

import AnswerCommentCell from "../tableCells/actionCells/AnswerCommentCell";
import CommentStatusCell from "../tableCells/commentStatusCell/CommentStatusCell";

export const Columns = (rows, setRows) => {
  return [
    {
      field: "username",
      headerName: "Commenter",
      flex: 0,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: null,
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 1,
      editable: false,
      type: "string",
      valueGetter: null,
      renderCell: null,
    },
    {
      field: "createDate",
      headerName: "Created Date",
      flex: 0,
      editable: false,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row["createDate"]);
      },
      renderCell: null,
    },
    {
      field: "verified",
      headerName: "Verified",
      flex: 0,
      editable: false,
      type: "boolean",
      renderCell: ({ row: params }) => {
        return <CommentStatusCell comment={params} />;
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 0,
      headerName: "Reply",
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <AnswerCommentCell params={params} setRows={setRows} rows={rows} />,
        ];
      },
    },
  ];
};
