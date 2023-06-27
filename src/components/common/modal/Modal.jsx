import * as React from "react";
import { Box, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";

import { ModalFooter } from "./modalFooter/ModalFooter";
import { ModalHeader } from "./modalHeader/ModalHeader";

import { tokens } from "../../../global/theme/Theme";

export const CustomModal = ({
  setOpen,
  open,
  modalHeader,
  modalFooter,
  callBackFunc,
  buttonText,
  btnStyle,
  children,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: "hidden" }}
    >
      <Box
        sx={{
          width: "53%",
          typography: "body1",
          margin: "1% auto",
          background: `${colors.primary[400]} !important`,
          borderRadius: "10px",
        }}
      >
        {modalHeader === true && <ModalHeader colors={colors} />}
        {children}
        {modalFooter === true && (
          <ModalFooter
            colors={colors}
            setOpen={setOpen}
            callBackFunc={callBackFunc}
            buttonText={buttonText}
            btnStyle={btnStyle}
          />
        )}
      </Box>
    </Modal>
  );
};
