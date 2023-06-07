import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { Input, MutiLineInput } from "../../../common/inputs/SignupInput";
import { Dropdown } from "../../../common/dropdown/Dropdown";
import { CustomModal } from "../../../common/modal/Modal";
import LoadingButton from "../../../common/button/LoadingButton";
import EditImageModal from "./EditImageModal";

import { addnews } from "../../../../core/services/api/manage-News.api";
import { addNewsData } from "../../../../config/data/manageNewsData/AddNewsData";

const GridToolbarAddRowModal = ({ setOpen, open, setRows }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  // Saving image of selected news.
  const [uploadedImage, setUploadedImage] = React.useState("image.png");
  const [openImgModal, setOpenImgModal] = React.useState(false);

  // News form validation.
  const formSchema = Yup.object().shape({
    title: Yup.string().required("This is required."),
    category: Yup.string().required("This is required."),
    text: Yup.string().required("This is required"),
  });
  return (
    // Frame
    <CustomModal
      setOpen={setOpen}
      open={open}
      modalHeader={true}
      modalFooter={false}
    >
      {/* Content */}
      <Box
        sx={{
          justifyContent: "start",
          alignItems: "center",
          paddingX: "30px",
          paddingY: "40px",
          gap: "15px",
        }}
      >
        <IconButton
          sx={{
            marginX: "auto",
            border: "1px solid red",
            display: "flex",
            justifyContent: "center",
            placeSelf: "center",
            alignSelf: "center",
            justifySelf: "center",
            gridColumn: "span 4",
          }}
          onClick={() => {
            setOpenImgModal(true);
          }}
        >
          <Avatar src={uploadedImage} sx={{ width: 86, height: 86 }} />
        </IconButton>

        {openImgModal && (
          <EditImageModal
            openImgModal={openImgModal}
            setOpenImgModal={setOpenImgModal}
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
            sx={{ fullWidth: "auto" }}
          />
        )}
        {/* Form for adding new news */}
        <Formik
          initialValues={{
            title: "",
            category: "news",
            text: "",
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            try {
              // Getting new news information.
              const userInput = {
                title: values.title,
                category: values.category,
                image: uploadedImage,
                text: values.text,
              };
              setIsLoading(true);
              // Sending new news information to server.
              const response = await addnews(userInput);

              if (response.success) {
                toast.success("News added successfully.");

                // Adding id to the row of new news and update the news table.
                let newRow = { ...response.result, id: response.result._id };
                setRows((prev) => [...prev, newRow]);
              } else {
                toast.error("Sorry, something went wrong. Please try again.");
              }
            } catch (error) {
              console.error(error);
            }
            setIsLoading(false);
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {/* Showing new news image. User can upload new image in the EditImageModal. */}
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": "span 4",
                  borderRadius: "20px",
                  padding: "20px",
                }}
              >
                {addNewsData.map((data, index) => {
                  return data.name === "text" ? (
                    <MutiLineInput
                      key={index}
                      fullWidth={data.fullWidth}
                      variant={data.variant}
                      type={data.type}
                      label={data.label}
                      name={data.name}
                      sx={data.sx}
                      required={data.required}
                      row={data.row}
                    />
                  ) : data.name === "category" ? (
                    <Dropdown
                      key={index}
                      name={data.name}
                      options={data.options}
                      sx={data.sx}
                      label={data.label}
                      required={data.required}
                    />
                  ) : (
                    <Input
                      key={index}
                      fullWidth={data.fullWidth}
                      variant={data.variant}
                      type={data.type}
                      label={data.label}
                      name={data.name}
                      sx={data.sx}
                      required={data.required}
                    />
                  );
                })}
              </Box>
              <LoadingButton isLoading={isLoading} btnText="ADD" />
            </form>
          )}
        </Formik>
      </Box>
    </CustomModal>
  );
};

export default React.memo(GridToolbarAddRowModal);
