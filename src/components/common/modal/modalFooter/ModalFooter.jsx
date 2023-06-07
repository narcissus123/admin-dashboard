import React from "react";
import { Box, Button } from "@mui/material";

export const ModalFooter = ({
  setOpen,
  colors,
  callBackFunc,
  buttonText,
  btnStyle,
}) => {
  return (
    <Box
      testID="modalFooterId"
      sx={{
        height: "50px",
        borderTop: `1px solid ${colors.blueAccent[700]}`,
        display: "flex",
        justifyContent: "end",
        gap: "10px",
        paddingX: "15px",
        paddingY: "8px",
        boxShadow: 3,
      }}
    >
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
      <Button
        variant="contained"
        size="medium"
        color={btnStyle}
        sx={{ fontWeight: "bold", fontSize: "small" }}
        onClick={callBackFunc}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
