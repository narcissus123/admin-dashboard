import React from "react";
import { GridActionsCellItem, GridCellModes } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

import LoadingIcon from "../../../../common/button/LoadingIcon";
import { DeleteTermModal } from "./deleteTermModal/DeleteTermModal";

import { useTable } from "../../../../../utils/table/Table";
import { updateCourse } from "../../../../../core/services/api/manage-Courses.api";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const EditTermCell = ({
  params,
  setRows,
  rows,
  setCellModesModel,
  cellModesModel,
  err,
  keys,
}) => {
  const [loading, setLoading] = React.useState(false);
  const rowData = useTable();
  const [isEditting, setIsEditting] = React.useState(false);
  const [row, setRow] = React.useState(params.row);
  const [open, setOpen] = React.useState(false);
  let cellModes = {};

  // Handling save button by changing the mode from view to mode and sending information to server.
  const handleEditClick = () => {
    setCellModesModel({
      ...cellModesModel,
      [row.id]: {
        ...cellModesModel[row.id],
        ["lesson.image"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["title"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["teacher.fullName"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["lesson.lessonName"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["cost"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["capacity"]: { mode: GridCellModes.Edit, ignoreModifications: false },
        ["startDate"]: {
          mode: GridCellModes.Edit,
          ignoreModifications: false,
        },
        ["endDate"]: {
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
        [row.id]: {
          ...cellModesModel[row.id],
          ["lesson.image"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["title"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["teacher.fullName"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["lesson.lessonName"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["cost"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["capacity"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["startDate"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
          ["endDate"]: {
            mode: GridCellModes.View,
            ignoreModifications: false,
          },
        },
      });

      try {
        // Getting term updated information
        const response = await updateCourse(params.id, {
          title: params.row.title,
          cost: params.row.cost,
          endDate: params.row.endDate,
          startDate: params.row.startDate,
          capacity: params.row.capacity,
          teacher: params.row.teacher._id,
          lesson: params.row.lesson._id,
          ...rowData.userInput,
        });

        if (response.success) {
          let term = response.result;

          term = { ...term, id: term._id };

          setRows((prev) => prev.filter((row) => row._id !== term._id));
          setRows((prev) => [term, ...prev]);

          toast.success("Term information updated successfully.");
        }
      } catch (error) {
        console.error("error:", error);
        toast.error("Sorry, something went wrong. Please try again.");
      }

      setLoading(false);
      setIsEditting(false);
    }
  };

  const handleCancelClick = () => {
    setCellModesModel({
      ...cellModesModel,
      [row.id]: {
        ...cellModesModel[row.id],
        ["lesson.image"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
        ["title"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
        ["teacher.fullName"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
        ["lesson.lessonName"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
        ["cost"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
        ["capacity"]: { mode: GridCellModes.View, ignoreModifications: true },
        ["startDate"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
        ["endDate"]: {
          mode: GridCellModes.View,
          ignoreModifications: true,
        },
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
            <DeleteTermModal
              setOpen={setOpen}
              open={open}
              setRows={setRows}
              rows={rows}
              termId={params.id}
              termTitle={params.row.title}
            />
          )}
        </>,
      ];
};

export default React.memo(EditTermCell);
