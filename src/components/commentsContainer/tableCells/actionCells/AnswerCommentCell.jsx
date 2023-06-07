import * as React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import AnswerCommentModal from "./AnswerCommentModal";

import ReplyIcon from "@mui/icons-material/Reply";

const EditCommentCell = ({ params, setRows, rows }) => {
  const [open, setOpen] = React.useState(false);

  return [
    <>
      <Box sx={{ marginY: 1, position: "relative" }}>
        <GridActionsCellItem
          icon={<ReplyIcon />}
          label="Edit"
          onClick={React.useCallback(() => {
            setOpen(true);
          }, [])}
        />
      </Box>
      {open && (
        <AnswerCommentModal
          setOpen={setOpen}
          open={open}
          setRows={setRows}
          selectedRow={params.row}
        />
      )}
    </>,
  ];
};

export default React.memo(EditCommentCell);
