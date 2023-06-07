import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

  // Updating user profile image.
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

        // If image uploaded successfully, we send the request to the backend to update image url.
        if (imgbbResponse.status === 200) {
          setImageUrl(() => imgbbResponse.data.data.url);
          setUploadedImage(() => imgbbResponse.data.data.url);

          toast.success("Lesson image has been updated successfully!");
        } else {
          toast.error("Sorry. Something went wrong.");
        }
        // If user presses upload button before choosing an image, we show this message.
      } else {
        toast.error("Please choose image first.");
      }
    } catch (error) {
      console.error("error", error);
    }
  }, []);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          paddingX: "30px",
          paddingY: "40px",
          gap: "15px",
        }}
      >
        {/* Content */}
        <>
          <Box>
            <Box>
              {/* Drag and drop */}
              <DropBox onDrop={onDrop} imageUrl={imageUrl} />
              {/* Profile image */}
              {imageUrl && (
                <>
                  <Box>
                    <img src={imageUrl} />
                  </Box>
                  <Box>
                    <Link to={imageUrl}>{imageUrl}</Link>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </>
      </Box>
    </CustomModal>
  );
};

export default React.memo(EditImageModal);
