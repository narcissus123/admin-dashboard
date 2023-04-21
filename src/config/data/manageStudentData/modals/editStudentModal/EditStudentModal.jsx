import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { Box, useTheme } from "@mui/material";
import { getStudentById } from "../../../../../core/services/api/manage-students.api";
export const EditStudentModal = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  //const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  const handleSubmit = () => {
    setLoading(true);
    const { role, isActive, _id } = params.row;
    /* try {
        
       const studentInfo = await getStudentById(_id);

       if(studentInfo[0].result.isActive === isActive) {
           const response = await deActiveStudent(_id);
       } else {
           const response = await activeStudent(_id);
       }
       
        
       if (response.success) {
         console.log("response edit: ", response);
         console.log("Your information has been updated successfully!");
       }
      } catch (error) {
        toast.error(error);
        toast.error("Sorry. Something went wrong. Please try again.");
      }
    setLoading(false);
  }; */
  };
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {success ? (
        <>
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          />

          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={() => {}}
            color="inherit"
          />
        </>
      ) : (
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => {}}
          color="inherit"
        />
      )}
    </Box>
  );
};
