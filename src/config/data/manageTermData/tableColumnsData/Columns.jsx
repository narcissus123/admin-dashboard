import React from "react";

import TermImageCell from "../../../../components/termContainer/tableCells/viewModeCells/TermImageCell";
import EditInputCell from "../../../../components/termContainer/tableCells/editModeCells/EditInputCell";
import EditDateCell from "../../../../components/termContainer/tableCells/editModeCells/EditDateCell";

import { validation } from "../../../../hooks/useValidation";

const handleValidation = (params, validationMessage) => {
  return {
    ...params.props,
    error: !!validationMessage,
    errorMessage: validationMessage,
  };
};

export const termColumn = (obj) => {
  return [
    {
      field: "lesson.image",
      headerName: "Image",
      flex: 0,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => <TermImageCell params={params} />,
      preProcessEditCellProps: null,
      renderEditCell: ({ row: params }) => <TermImageCell params={params} />,
    },
    {
      field: "title",
      headerName: "Term name",
      flex: 1,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: null,
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .stringType()
            .match("^[a-zA-Z ]+$")
            .min(2, "Must be 2 characters or more.")
            .max(30, "Must be 30 characters or less.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditInputCell {...params} obj={obj} />,
    },
    {
      field: "teacher.fullName",
      headerName: "Instructor",
      flex: 1,
      editable: true,
      type: "string",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      editable: true,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row["startDate"]);
      },
      renderCell: null,
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .dateType("Start date must be of form MM/DD/YYYY.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditDateCell {...params} obj={obj} />,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      editable: true,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row["endDate"]);
      },
      renderCell: null,
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .dateType("End date must be of form MM/DD/YYYY.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditDateCell {...params} obj={obj} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0,
      editable: false,
      type: "actions",
      valueGetter: null,
      renderCell: null,
      validation: null,
      renderEditCell: null,
    },
  ];
};
