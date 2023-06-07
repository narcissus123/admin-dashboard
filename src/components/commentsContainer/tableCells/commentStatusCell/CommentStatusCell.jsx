import React from "react";
import { Box, Checkbox } from "@mui/material";
import CommentStatusModal from "./CommentStatusModal";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CommentStatusCell = ({ comment }) => {
  const [checked, setChecked] = React.useState(comment.verified);
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Checkbox {...label} checked={checked} onClick={() => setOpen(true)} />

      {open && (
        <CommentStatusModal
          setOpen={setOpen}
          open={open}
          commentId={comment.id}
          setChecked={setChecked}
        />
      )}
    </Box>
  );
};

export default React.memo(CommentStatusCell);
