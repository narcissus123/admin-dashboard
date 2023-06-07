import React from "react";
import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        direction: "row",
        justifyContent: "between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "start",
          flex: "1",
        }}
      >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>
    </GridToolbarContainer>
  );
};

export default React.memo(CustomToolbar);
