import React from "react";
import { Box, Link } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "mui-image";

import { CustomModal } from "../../../../common/modal/Modal";
import { DropBox } from "../../../../common/dropbox/Dropbox";

import { useDragAndDrop } from "../../../../../hooks/useDragAndDrop";

const EditImageModal = ({
  openImgModal,
  setOpenImgModal,
  row,
  setUploadedImage,
}) => {
  // Saving image from the file system.
  const [onDrop, image] = useDragAndDrop();

  // Saving uploaded image url.
  const [imageUrl, setImageUrl] = React.useState("");

  // Updating user profile image.
  const handleUpload = React.useCallback(async () => {
    try {
      // Checking if user selects an image from file system.
      if (image) {
        // Sending request to imgbb to upload the image.
        const formData = new FormData();
        formData.append("image", image);
        formData.append("key", "a2b1e31f3bb10cadc30a2cb7340c95c6");

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        // If image uploaded successfully, we save the new image url.
        if (imgbbResponse.status === 200) {
          setImageUrl(() => imgbbResponse.data.data.url);
          setUploadedImage(() => imgbbResponse.data.data.url);

          toast.success("Lesson image updated successfully!");
        } else {
          toast.error("Sorry. Something went wrong.");
        }
        // If user presses upload button before choosing an image, we show this message.
      } else {
        toast.error("Please select image first.");
      }
    } catch (error) {
      console.error(error);
    }
  }, [image]);

  return (
    <CustomModal
      setOpen={setOpenImgModal}
      open={openImgModal}
      callBackFunc={handleUpload}
      modalHeader={true}
      modalFooter={true}
      buttonText="Upload"
      btnStyle="success"
    >
      <ToastContainer />
      {/* Frame*/}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Content */}
        {/* Drag and drop */}
        <Box sx={{ width: "40%", height: "300px" }}>
          <DropBox onDrop={onDrop} imageUrl={imageUrl} />
        </Box>

        <Box
          sx={{
            height: "auto",
            width: "60%",
            padding: "3px",
          }}
        >
          {imageUrl ? (
            <>
              <Box sx={{ height: "100%" }}>
                <Box sx={{ height: "90%" }}>
                  <Image
                    src={imageUrl}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "black",
                    paddingY: "4px",
                    textAlign: "center",
                  }}
                >
                  <Link href={imageUrl} sx={{ color: "white" }}>
                    {imageUrl}
                  </Link>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ height: "100%" }}>
                <Box sx={{ height: "90%" }}>
                  <Image
                    src={row.image}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "black",
                    paddingY: "4px",
                    textAlign: "center",
                  }}
                >
                  <Link href={row.image} sx={{ color: "white" }}>
                    {row.image}
                  </Link>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </CustomModal>
  );
};

export default React.memo(EditImageModal);
