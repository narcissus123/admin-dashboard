import React from "react";
import { Typography, Box } from "@mui/material";

import EditTermCell from "../tableCells/viewModeCells/actionCells/EditTermCell";
import TermImageCell from "../tableCells/viewModeCells/TermImageCell";
import EditInputCell from "../../common/table/tableCells/EditModeCells/EditInputCell";
import EditDateCell from "../../common/table/tableCells/EditModeCells/EditDateCell";
import EditImageCell from "../tableCells/editModeCells/editImageCell/EditImageCell";
import EditSelectCell from "../tableCells/editModeCells/editSelectCell/EditInstructorCell";
import EditLessonCell from "../tableCells/editModeCells/editSelectCell/EditLessonCell";

import { validation } from "../../../hooks/useValidation";

const handleValidation = (params, validationMessage) => {
  return {
    ...params.props,
    error: !!validationMessage,
    errorMessage: validationMessage,
  };
};

export const Columns = (
  rows,
  setRows,
  cellModesModel,
  setCellModesModel,
  err
) => {
  const keys = [
    "lesson.image",
    "title",
    "teacher.fullName",
    "lesson.lessonName",
    "cost",
    "capacity",
    "startDate",
    "endDate",
  ];

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
      renderEditCell: (params) => <EditImageCell params={params} />,
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
            .minLength(2, "Must be 2 characters or more.")
            .maxLength(30, "Must be 30 characters or less.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditInputCell params={params} />,
    },
    {
      field: "teacher.fullName",
      headerName: "Instructor",
      flex: 1,
      editable: true,
      type: "string",
      renderCell: ({ row: params }) => (
        <Typography>{params.teacher.fullName}</Typography>
      ),
      preProcessEditCellProps: null,
      renderEditCell: (params) => <EditSelectCell {...params} />,
    },
    {
      field: "lesson.lessonName",
      headerName: "Lesson Name",
      flex: 1,
      editable: true,
      type: "string",
      renderCell: ({ row: params }) => (
        <Typography>{params.lesson.lessonName}</Typography>
      ),
      preProcessEditCellProps: null,
      renderEditCell: (params) => <EditLessonCell {...params} />,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0,
      editable: true,
      type: "number",
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .number()
            .min(1, "Cost must be at least one dollar.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditInputCell params={params} />,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      flex: 0,
      editable: true,
      type: "number",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              marginX: "auto",
            }}
          >
            <Typography>{params.row.capacity}</Typography>
          </Box>
        );
      },
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .number()
            .min(5, "Capacity of class must be at least 5.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditInputCell params={params} />,
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
      renderEditCell: (params) => <EditDateCell {...params} />,
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
      renderEditCell: (params) => <EditDateCell {...params} />,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <EditTermCell
            params={params}
            setCellModesModel={setCellModesModel}
            cellModesModel={cellModesModel}
            setRows={setRows}
            rows={rows}
            err={err}
            keys={keys}
          />,
        ];
      },
    },
  ];
};
