import React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Typography, useTheme, IconButton } from "@mui/material";

import DeleteLessonModal from "./DeleteLessonModal";

import DeleteIcon from "@mui/icons-material/Delete";

const GridToolbarDeleteRow = ({ setRows, rowSelectionModel }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return [
    <>
      <GridActionsCellItem
        icon={
          <IconButton
            aria-label="delete"
            disabled={rowSelectionModel.length === 0}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              background: "none",
              color: `${
                theme.palette.mode === "dark" ? "#e0e0e0" : "black"
              } !important`,
              "&:hover": { cursor: "pointer", backgroundColor: "none" },
              "&:disabled": {
                color: "grey !important",
              },
            }}
          >
            <DeleteIcon />

            <Typography sx={{ fontSize: "12px" }}>DELETE LESSON</Typography>
          </IconButton>
        }
        label="Delete"
        onClick={() => setOpen(true)}
      />
      {open && (
        <DeleteLessonModal
          rowSelectionModel={rowSelectionModel}
          setOpen={setOpen}
          open={open}
          setRows={setRows}
        />
      )}
    </>,
  ];
};

export default React.memo(GridToolbarDeleteRow);
