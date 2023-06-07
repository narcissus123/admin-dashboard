import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { CustomModal } from "../../../../../common/modal/Modal";

import { deleteCourseById } from "../../../../../../core/services/api/manage-Courses.api";
import { tokens } from "../../../../../../global/theme/Theme";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const DeleteTermModal = ({
  setOpen,
  open,
  setRows,
  rows,
  termId,
  termTitle,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDeleteTerm = async () => {
    try {
      const response = await deleteCourseById(termId);

      if (response.data.success) {
        setRows((prev) => prev.filter((row) => row.id !== termId));
        toast.success("Term deleted successfully.");
      } else {
        toast.error("Sorry, something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      callBackFunc={handleDeleteTerm}
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
          Are you sure that you want to delete
          <span
            style={{
              color: `${colors.greenAccent[600]}`,
            }}
          >
            {"  "}
            {termTitle}
            {"  "}
          </span>
          term permanently?
        </Typography>
      </Box>
    </CustomModal>
  );
};
