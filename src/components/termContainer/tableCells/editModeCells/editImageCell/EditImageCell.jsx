import React from "react";
import { IconButton, Avatar } from "@mui/material";

import EditImageCellModal from "./EditImageCellModal";

const EditImageCell = ({ params }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {open && (
        <EditImageCellModal setOpen={setOpen} open={open} params={params} />
      )}
      <IconButton onClick={() => setOpen(true)}>
        <Avatar src={params.row.lesson.image} />
      </IconButton>
    </>
  );
};

export default React.memo(EditImageCell);
