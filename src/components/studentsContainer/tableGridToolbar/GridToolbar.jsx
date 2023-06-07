import React from "react";
import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import GridToolbarAddItem from "./gridToolbarAddItem/GridToolbarAddItem";
import GridToolbarDeleteItem from "./gridToolbarDeleteItem/GridToolbarDeleteItem";

const CustomToolbar = (props) => {
  const {
    setRows,
    setCellModesModel,
    cellModesModel,
    rows,
    rowSelectionModel,
    setRowSelectionModel,
  } = props;

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
        <GridToolbarAddItem
          setRows={setRows}
          setCellModesModel={setCellModesModel}
          cellModesModel={cellModesModel}
          rows={rows}
        />
        <GridToolbarDeleteItem
          setRows={setRows}
          setCellModesModel={setCellModesModel}
          cellModesModel={cellModesModel}
          rows={rows}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export default React.memo(CustomToolbar);
