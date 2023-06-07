import React from "react";
import { Typography, IconButton, useTheme } from "@mui/material";

import GridToolbarAddItemModal from "./GridToolbarAddItemModal";

import AddIcon from "@mui/icons-material/Add";

const GridToolbarAddItem = (params) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  return (
    <>
      {open && (
        <GridToolbarAddItemModal
          setOpen={setOpen}
          open={open}
          rows={params.rows}
          setRows={params.setRows}
        />
      )}
      <IconButton
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "6px",
          color: `${
            theme.palette.mode === "dark" ? "#e0e0e0" : "black"
          } !important`,
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

        <Typography sx={{ fontSize: "12px" }}>ADD TERM</Typography>
      </IconButton>
    </>
  );
};

export default React.memo(GridToolbarAddItem);
