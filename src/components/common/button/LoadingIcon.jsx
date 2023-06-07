import * as React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";

const LoadingIcon = ({
  icon,
  loading,
  label,
  clickHandler,
  sx = {
    color: "green",
    position: "absolute",
    top: -4,
    left: -6,
    width: "auto",
    zIndex: 1,
  },
  size = "38",
}) => {
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <GridActionsCellItem icon={icon} label={label} onClick={clickHandler} />
      {loading && <CircularProgress size={size} sx={sx} />}
    </Box>
  );
};

export default React.memo(LoadingIcon);
