import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { toast } from "react-toastify";

import { CustomModal } from "../../../common/modal/Modal";

import { deleteCourseById } from "../../../../core/services/api/manage-Courses.api";
import { tokens } from "../../../../global/theme/Theme";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DeleteTermModal = ({ setOpen, open, setRows, rowSelectionModel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [deletedRows, setDeletedRows] = React.useState([]);

  const handleDeleteClick = React.useCallback(() => {
    rowSelectionModel.map(async (id) => {
      try {
        const response = await deleteCourseById(id);

        if (response.data.success) {
          setDeletedRows((prev) => [...prev, id]);

          toast.success(`Term with id ${id} deleted successfully.`);
        } else {
          toast.error(`Sorry, deleting term with id ${id} was unsuccessfull.`);
        }
      } catch (error) {
        console.error("error", error);
      }
    });
  }, [rowSelectionModel]);

  React.useEffect(() => {
    deletedRows.map((id) => {
      setRows((r) => r.filter((row) => row.id !== id));
    });
  }, [deletedRows]);

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      callBackFunc={handleDeleteClick}
      modalHeader={true}
      modalFooter={true}
      buttonText="Delete"
      btnStyle="error"
    >
      {/* Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100px",
          paddingX: "30px",
          paddingY: "40px",
          gap: "15px",
        }}
      >
        <ErrorOutlineIcon
          sx={{
            height: "45px",
            width: "45px",
            color: `${colors.blueAccent[700]}`,
          }}
        />

        <Typography sx={{ fontSize: "15px" }}>
          Are you sure that you want to delete selected terms permanently?
        </Typography>
      </Box>
    </CustomModal>
  );
};

export default React.memo(DeleteTermModal);
