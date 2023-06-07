import React from "react";
import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import GridToolbarAddRow from "./gridDataAddRow/GridToolbarAddRow";
import GridToolbarDeleteRow from "./gridToolbarDeleteRow/GridToolbarDeleteRow";

const CustomToolbar = (props) => {
  const { setRows, rows, rowSelectionModel, setRowSelectionModel } = props;

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
      <Box
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "end",
          flex: "1",
        }}
      >
        <GridToolbarAddRow setRows={setRows} rows={rows} />
        <GridToolbarDeleteRow
          setRows={setRows}
          rows={rows}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export default React.memo(CustomToolbar);
