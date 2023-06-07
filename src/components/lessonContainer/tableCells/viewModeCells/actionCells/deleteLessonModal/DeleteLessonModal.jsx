import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { CustomModal } from "../../../../../common/modal/Modal";

import { deleteLessonById } from "../../../../../../core/services/api/manage-lessons.api";
import { tokens } from "../../../../../../global/theme/Theme";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DeleteLessonModal = ({
  setOpen,
  open,
  setRows,
  rows,
  lessonId,
  lessonTitle,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDeleteLesson = async () => {
    try {
      const response = await deleteLessonById(lessonId);

      if (response.data.success) {
        setRows(rows.filter((row) => row.id !== lessonId));
        toast.success("Lesson deleted successfully.");
      } else {
        toast.error("Sth went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      callBackFunc={handleDeleteLesson}
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
            {lessonTitle}
            {"  "}
          </span>
          term permanently?
        </Typography>
      </Box>
    </CustomModal>
  );
};

export default React.memo(DeleteLessonModal);
