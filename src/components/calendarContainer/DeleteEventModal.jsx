import React from "react";
import { CustomModal } from "../common/modal/Modal";
import { Box, Typography, useTheme } from "@mui/material";

import { tokens } from "../../global/theme/Theme";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DeleteEventModal = ({ selectedEvent, open, setOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //If user enters a title, we will create an event and add it to the calendar.
  const handleClick = () => {
    selectedEvent.event.remove();
    setOpen(false);
  };

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      callBackFunc={handleClick}
      modalHeader={true}
      modalFooter={true}
      buttonText="Delete Event"
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
          Are you sure that you want to delete the event?
        </Typography>
      </Box>
    </CustomModal>
  );
};

export default React.memo(DeleteEventModal);
