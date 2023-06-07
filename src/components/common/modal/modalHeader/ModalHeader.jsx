import React from "react";
import { Box } from "@mui/material";

export const ModalHeader = ({ colors }) => {
  return (
    <Box
      sx={{
        height: "40px",
        borderBottom: `1px solid ${colors.blueAccent[700]}`,
        boxShadow: 1,
      }}
    />
  );
};
