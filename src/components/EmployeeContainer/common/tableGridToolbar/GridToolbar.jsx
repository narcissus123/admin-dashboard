import React from "react";
import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import GridToolbarAddRow from "../../common/tableGridToolbar/gridToolbarAddRow/GridToolbarAddRow";
import GridToolbarDeleteRow from "../../common/tableGridToolbar/gridToolbarDeleteRow/GridToolbarDeleteRow";

const CustomToolbar = (props) => {
  const {
    setRows,
    rows,
    rowSelectionModel,
    setRowSelectionModel,
    AddFormData,
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
        <GridToolbarAddRow
          setRows={setRows}
          rows={rows}
          AddFormData={AddFormData}
        />
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
