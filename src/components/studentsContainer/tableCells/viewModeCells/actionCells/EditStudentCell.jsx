import * as React from "react";
import { GridActionsCellItem, GridCellModes } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

import LoadingIcon from "../../../../common/button/LoadingIcon";
import { useTable } from "../../../../../utils/table/Table";
import DeleteStudentModal from "./deleteStudentModal/DeleteStudentModal";

import {
  updateStudentInfoById,
  deactivateStudentById,
  activateStudentById,
} from "../../../../../core/services/api/manage-students.api";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const EditStudentCell = ({
  params,
  setRows,
  rows,
  setCellModesModel,
  cellModesModel,
  err,
}) => {
  const rowData = useTable();
  const [loading, setLoading] = React.useState(false);
  const [isEditting, setIsEditting] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // Handling save button by changing the mode from view to mode and sending information to server.
  const handleEditClick = () => {
    setCellModesModel({
      ...cellModesModel,
      [params.row.id]: {
        ...cellModesModel[params.row.id],
        ["profile"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["fullName"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["email"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["phoneNumber"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["nationalId"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["birthDate"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["isActive"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
      },
    });

    setIsEditting(true);
  };

  let handleSaveClick = async () => {
    setLoading(true);

    if (!err) {
      setCellModesModel({
        ...cellModesModel,
        [params.row.id]: {
          ...cellModesModel[params.row.id],
          ["profile"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["fullName"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["email"]: { mode: GridCellModes.View, ignoreModifications: false },
          ["phoneNumber"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["nationalId"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["birthDate"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["isActive"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
        },
      });

      try {
        // Getting student updated information
        let userData = {
          fullName: params.row.fullName,
          email: params.row.email,
          birthDate: params.row.birthDate,
          nationalId: params.row.nationalId,
          profile: rowData.userInput["profile"]
            ? rowData.userInput["profile"]
            : params.row.profile === ""
            ? "image.png"
            : params.row.profile,
          ...rowData.userInput,
          phoneNumber: rowData.userInput["phoneNumber"]
            ? rowData.userInput["phoneNumber"].toString()
            : params.row.phoneNumber,
        };

        // Getting student status (active / inactive)
        let isActive =
          rowData.studentIsActive === undefined
            ? params.row["isActive"]
            : rowData.studentIsActive;
        let responses;

        // If student status changes to false, we call deactivateStudentById api. Otherwise we call activateStudentById api.
        // Other student information, except status, updates with updateStudentInfoById api.
        if (isActive === true) {
          responses = await Promise.all([
            await updateStudentInfoById(params.id, userData),
            await activateStudentById(params.id, isActive.toString()),
          ]);
        } else {
          responses = await Promise.all([
            await updateStudentInfoById(params.id, userData),
            await deactivateStudentById(params.id, isActive.toString()),
          ]);
        }

        // Updating table information and showing relevant response to the user.
        // status api calls have the most uptodate information.
        if (responses[1].success === true) {
          if (responses[0].data.success !== true) {
            toast.success("Sorry, only student status updated.");
          } else {
            toast.success("Student information updated successfully.");
          }

          let student = responses[1].result;
          student = { ...student, id: student._id };
          setRows((prev) => prev.filter((row) => row._id !== student._id));
          setRows((prev) => [student, ...prev]);
        } else if (responses[0].data.success === true) {
          if (responses[1].success !== true) {
            toast.success("Sorry, student status could not be updated.");
          }
          let student = responses[0].result;
          student = { ...student, id: student._id };
          setRows((prev) => prev.filter((row) => row._id !== student._id));
          setRows((prev) => [student, ...prev]);
        }
      } catch (error) {
        console.error("error:", error);
        toast.error("Something went wrong. Please try later.");
      }

      setLoading(false);
      setIsEditting(false);
    }
  };

  // Handling cancel button by changing the mode from edit to view and ignoring modifications.
  const handleCancelClick = () => {
    setCellModesModel({
      ...cellModesModel,
      [params.row.id]: {
        ...cellModesModel[params.row.id],
        ["profile"]: { mode: GridCellModes.View, ignoreModifications: true },
        ["fullName"]: { mode: GridCellModes.View, ignoreModifications: true },
        ["email"]: { mode: GridCellModes.View, ignoreModifications: true },
        ["phoneNumber"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
        ["nationalId"]: { mode: GridCellModes.View, ignoreModifications: true },
        ["birthDate"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
        ["isActive"]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
    setIsEditting(false);
  };

  return isEditting
    ? [
        <LoadingIcon
          icon={<SaveIcon />}
          label="Save"
          clickHandler={handleSaveClick}
          loading={loading}
          size={38}
          sx={{
            color: "green",
            position: "absolute",
            top: -4,
            left: -6,
            width: "auto",
            zIndex: 1,
          }}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          onClick={handleCancelClick}
        />,
      ]
    : [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick}
        />,
        <>
          <Box sx={{ m: 1, position: "relative" }}>
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => {
                setOpen(true);
              }}
              color="inherit"
            />
          </Box>
          {open && (
            <DeleteStudentModal
              setOpen={setOpen}
              open={open}
              setRows={setRows}
              rows={rows}
              studentId={params.id}
              studentTitle={params.row.title}
            />
          )}
        </>,
      ];
};

export default React.memo(EditStudentCell);
