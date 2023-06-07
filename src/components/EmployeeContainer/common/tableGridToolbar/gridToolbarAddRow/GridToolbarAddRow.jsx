import React from "react";
import { Typography, IconButton, useTheme } from "@mui/material";

import GridToolbarAddRowModal from "./GridToolbarAddRowModal";

import AddIcon from "@mui/icons-material/Add";

const GridToolbarAddRow = (setRows, rows, addFormData) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <>
      {open && (
        <GridToolbarAddRowModal
          setOpen={setOpen}
          open={open}
          rows={rows}
          setRows={setRows}
          addFormData={addFormData}
        />
      )}
      <IconButton
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "6px",
          color: `${"#e0e0e0"} !important`,
          "&:hover": { cursor: "pointer", background: "none" },
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon
          sx={{
            border: "2px solid",
            borderRadius: "100%",
            fontSize: "15px",
          }}
        />

        <Typography sx={{ fontSize: "12px" }}>ADD Employee</Typography>
      </IconButton>
    </>
  );
};

export default React.memo(GridToolbarAddRow);
