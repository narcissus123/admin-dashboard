import * as React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../global/theme/Theme";
import { TableProvider } from "../../../utils/table/Table";

export const Table = ({
  rows,
  columns,
  slots,
  slotProps,
  onRowSelectionModelChange,
  rowSelectionModel,
  cellModesModel,
  onCellModesModelChange,
  loading,
  height,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <TableProvider>
      <Box
        m="40px 0 0 0"
        height={height === undefined ? "75vh" : height}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="cell"
          onCellEditStop={(event) => {
            event.defaultMuiPrevented = true;
          }}
          onCellEditStart={(event) => {
            event.defaultMuiPrevented = true;
          }}
          loading={loading}
          slots={slots}
          slotProps={slotProps}
          checkboxSelection
          onRowSelectionModelChange={onRowSelectionModelChange}
          rowSelectionModel={rowSelectionModel}
          cellModesModel={cellModesModel}
          onCellModesModelChange={onCellModesModelChange}
        />
      </Box>
    </TableProvider>
  );
};
