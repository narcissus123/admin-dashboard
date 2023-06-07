import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { CustomModal } from "../../../common/modal/Modal";

import { sendCommentVerification } from "../../../../core/services/api/manage-comments.api";
import { tokens } from "../../../../global/theme/Theme";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CommentStatusModal = ({ setOpen, open, setChecked, commentId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleValidation = React.useCallback(async () => {
    try {
      const response = await sendCommentVerification(commentId);

      if (response.status === 200) {
        toast.success("Comment verified successfully.");
        setChecked(true);
      } else {
        toast.error("Sth went wrong. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      callBackFunc={handleValidation}
      modalHeader={true}
      modalFooter={true}
      buttonText="VERIFY"
      btnStyle="success"
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
          Are you sure that you want to activate this modal?
        </Typography>
      </Box>
    </CustomModal>
  );
};

export default React.memo(CommentStatusModal);
