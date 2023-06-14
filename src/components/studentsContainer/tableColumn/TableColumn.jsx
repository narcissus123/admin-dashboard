import React from "react";

import StudentImageCell from "../tableCells/viewModeCells/studentImageCell/StudentImageCell";
import EditImageCell from "../tableCells/editModeCells/editImageCell/EditImageCell";
import EditInputCell from "../../common/table/tableCells/EditModeCells/EditInputCell";
import EditDateCell from "../../common/table/tableCells/editModeCells/EditDateCell";
import EditCheckBoxCell from "../../common/table/tableCells/EditModeCells/EditCheckBoxCell";
import EditStudentCell from "../tableCells/viewModeCells/actionCells/EditStudentCell";
import StudentCoursesCell from "../tableCells/viewModeCells/actionCells/editStudentCourses/StudentCoursesCell";

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
  return [
    {
      field: "profile",
      headerName: "Image",
      flex: 0,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => <StudentImageCell params={params} />,
      preProcessEditCellProps: null,
      renderEditCell: (params) => <EditImageCell params={params} />,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      cellClassName: "name-column--cell",
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
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .emailType(
              "Email is not valid.",
              "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*$"
            )
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditInputCell params={params} />,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      editable: true,
      flex: 1,
      type: "number",
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .number()
            .minLength(10, "Must be 10 characters.")
            .maxLength(10, "Must be 10 characters.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditInputCell params={params} />,
    },
    {
      field: "nationalId",
      headerName: "National Id",
      flex: 1,
      type: "string",
      editable: true,
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .stringType()
            .minLength(10, "Must be 10 characters.")
            .maxLength(10, "Must be 10 characters.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditInputCell params={params} />,
    },
    {
      field: "birthDate",
      headerName: "Birth Date",
      type: "date",
      flex: 1,
      editable: true,
      valueGetter: (params) => {
        return new Date(params.row["birthDate"]);
      },
      renderCell: null,
      preProcessEditCellProps: (params) =>
        handleValidation(
          params,
          validation()
            .setValue(params.props.value)
            .dateType("Birth date must be of form MM/DD/YYYY.")
            .getErrorMessage()
        ),
      renderEditCell: (params) => <EditDateCell {...params} />,
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 0,
      type: "boolean",
      editable: true,
      renderEditCell: (params) => <EditCheckBoxCell params={params} />,
    },
    {
      field: "courses",
      headerName: "Courses",
      flex: 0,
      renderCell: ({ row: params }) => {
        return (
          <StudentCoursesCell student={params} setRows={setRows} rows={rows} />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <EditStudentCell
            params={params}
            setCellModesModel={setCellModesModel}
            cellModesModel={cellModesModel}
            setRows={setRows}
            rows={rows}
            err={err}
          />,
        ];
      },
    },
  ];
};
