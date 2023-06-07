import React from "react";
import { Box, Button, Modal } from "@mui/material";

const NotificationModal = ({ setOpen, open }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
      ></Box>

      <Button
        variant="contained"
        size="medium"
        sx={{
          backgroundColor: "#bdbdbd",
          fontWeight: "bold",
          fontSize: "small",
          "&:hover": {
            backgroundColor: "#9e9e9e",
          },
        }}
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
    </Modal>
  );
};

export default React.memo(NotificationModal);
