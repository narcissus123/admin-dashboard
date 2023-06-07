import React from "react";
import { Box, Checkbox } from "@mui/material";

import StatusCellModal from "./StatusCellModal";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StatusCell = ({ params }) => {
  const [checked, setChecked] = React.useState(params.isActive);
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Checkbox {...label} checked={checked} onClick={() => setOpen(true)} />

      {open && (
        <StatusCellModal
          setOpen={setOpen}
          open={open}
          checked={checked}
          employeeId={params.id}
          setChecked={setChecked}
        />
      )}
    </Box>
  );
};

export default React.memo(StatusCell);
