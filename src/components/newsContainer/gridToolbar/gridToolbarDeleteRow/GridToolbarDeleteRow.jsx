import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { CustomModal } from "../../../common/modal/Modal";

import { tokens } from "../../../../global/theme/Theme";
import { deleteNewsById } from "../../../../core/services/api/manage-News.api";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DeleteNewsModal = ({ setOpen, open, setRows, rowSelectionModel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [deletedRows, setDeletedRows] = React.useState([]);

  const handleDeleteClick = React.useCallback(() => {
    rowSelectionModel.map(async (id) => {
      try {
        const response = await deleteNewsById(id);
        if (response.data.success) {
          setDeletedRows((prev) => [...prev, id]);

          toast.success(`News with ${id} removed successfully`);
        } else {
          toast.error(`Sorry, removing news with ${id} was unsuccessfull.`);
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
          Are you sure that you want to delete selected news permanently?
        </Typography>
      </Box>
    </CustomModal>
  );
};

export default React.memo(DeleteNewsModal);
