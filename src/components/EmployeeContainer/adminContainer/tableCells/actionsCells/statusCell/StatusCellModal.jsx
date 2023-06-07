import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { CustomModal } from "../../../../../common/modal/Modal";

import {
  deActiveEmployee,
  activeEmployee,
} from "../../../../../../core/services/api/manage-employees.api";
import { tokens } from "../../../../../../global/theme/Theme";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const StatusCellModal = ({
  setOpen,
  open,
  setChecked,
  checked,
  employeeId,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleStatusChange = React.useCallback(async () => {
    try {
      if (checked) {
        const response = await deActiveEmployee(employeeId);

        if (response.success) {
          toast.success("Admin deactivated successfully.");
          setChecked(false);
        } else {
          toast.error("Sth went wrong. Please try again.");
        }
      } else {
        const response = await activeEmployee(employeeId);

        if (response.success) {
          toast.success("Admin activated successfully.");
          setChecked(true);
        } else {
          toast.error("Sth went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      callBackFunc={handleStatusChange}
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
          Are you sure that you want to change the status of selected admin?
        </Typography>
      </Box>
    </CustomModal>
  );
};

export default React.memo(StatusCellModal);
