import React from "react";
import { Box, Link } from "@mui/material";
import axios from "axios";
import Image from "mui-image";
import { toast, ToastContainer } from "react-toastify";

import { CustomModal } from "../../../../common/modal/Modal";
import { DropBox } from "../../../../common/dropbox/Dropbox";

import { useDragAndDrop } from "../../../../../hooks/useDragAndDrop";

const EditImageModal = ({
  openImgModal,
  setOpenImgModal,
  setUploadedImage,
}) => {
  // Saving image from the file system.
  const [onDrop, image] = useDragAndDrop();

  // Saving uploaded image url.
  const [imageUrl, setImageUrl] = React.useState("");

  // Updating admin profile image.
  const handleUpload = React.useCallback(async () => {
    try {
      // Checking if user choose an image from file system.
      if (image) {
        // Sending request to imgbb to upload the image.
        const formData = new FormData();
        formData.append("image", image);
        formData.append("key", "7c7bc18520b528d475177a2bab14209d");

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        // If image uploaded successfully, we save the image url.
        if (imgbbResponse.status === 200) {
          setImageUrl(() => imgbbResponse.data.data.url);
          setUploadedImage(() => imgbbResponse.data.data.url);

          toast.success("Admin profile image updated successfully!");
        } else {
          toast.error("Sorry. Something went wrong.");
        }
        // If user presses upload button before choosing an image, we show this message.
      } else {
        toast.error("Please choose image first.");
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
        {/* Profile image */}
        <Box
          sx={{
            height: "auto",
            width: "60%",
            padding: "3px",
          }}
        >
          {imageUrl && (
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
          )}
        </Box>
      </Box>
    </CustomModal>
  );
};

export default React.memo(EditImageModal);
