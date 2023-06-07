import { TextField, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";

const DropBox = ({ onDrop }) => {
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
  });

  return (
    <Box
      sx={{
        height: "100%",
        padding: "4px",
        overflow: "hidden",
      }}
    >
      {/* The getRootProps returns the props required for drag-and-drop functionality. */}
      <Box
        {...getRootProps(isDragAccept, isFocused, isDragReject)}
        sx={{ height: "90%" }}
      >
        <Typography
          sx={{
            text: "gray",
            border: "1px solid #ccc",
            height: "90%",
            borderRadius: "5px",
            marginBottom: "3px",
            padding: "4px",
          }}
        >
          Drag 'n' drop your profile image here
        </Typography>
        {/* The getInputProps is used to create the drag-and-drop zone. */}
        <input
          {...getInputProps()}
          style={{ height: "10%", marginTop: "4px" }}
        />
      </Box>
      <Box sx={{ height: "10%", marginTop: "6px" }}>
        {acceptedFiles.map((image) => (
          <Box key={image.path} class="mt-6">
            {image.path} - {image.size} bytes
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { DropBox };

{
  /* The open prop allows user to open the file directory to upload files. */
}
{
  /* <Button type="button" onClick={open}>
          Click to select file
        </Button> */
}
