import React from "react";
import { IconButton, Avatar } from "@mui/material";

import EditImageCellModal from "./EditImageCellModal";

import { useTable } from "../../../../../utils/table/Table";

const EditImageCell = ({ params }) => {
  const [open, setOpen] = React.useState(false);

  const rowData = useTable();

  // Saving image of selected student.
  const [uploadedImage, setUploadedImage] = React.useState(params.profile);

  React.useEffect(() => {
    rowData.setUpdatedValue({ ["profile"]: uploadedImage });
  }, [uploadedImage]);

  return (
    <>
      {open && (
        <EditImageCellModal
          setOpen={setOpen}
          open={open}
          params={params}
          setUploadedImage={setUploadedImage}
        />
      )}
      <IconButton onClick={() => setOpen(true)}>
        <Avatar src={uploadedImage} />
      </IconButton>
    </>
  );
};

export default React.memo(EditImageCell);
