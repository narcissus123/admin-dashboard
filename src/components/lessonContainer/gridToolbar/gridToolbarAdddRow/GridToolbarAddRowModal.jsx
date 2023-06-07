import React from "react";
import { Box, Avatar, IconButton, TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { CustomModal } from "../../../common/modal/Modal";
import LoadingButton from "../../../common/button/LoadingButton";
import EditImageModal from "./EditImageModal";

import { addLesson } from "../../../../core/services/api/manage-lessons.api";

const GridToolbarAddRowModal = ({ setOpen, open, setRows }) => {
  // Saving keywords related to the selected lesson.
  const [chips, setChips] = React.useState([]);
  const handleChipChange = (newChips) => {
    setChips(newChips);
  };

  const [isLoading, setIsLoading] = React.useState(false);

  // Saving image of selected instructor.
  const [uploadedImage, setUploadedImage] = React.useState("image.png");
  const [openImgModal, setOpenImgModal] = React.useState(false);

  // Create lessson form validation.
  const formSchema = Yup.object().shape({
    lessonName: Yup.string()
      .min(2, "Must be 2 characters or more.")
      .max(100, "Must be 100 characters or less.")
      .required("This is required."),
    description: Yup.string()
      .min(2, "Must be 2 characters or more.")
      .max(1000, "Must be 500 characters or less.")
      .required("This is required."),
    category: Yup.number().required("This is required."),
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
            sx={{ fullWidth: "auto" }}
          />
        )}

        {/* Update lesson form */}
        <Formik
          initialValues={{
            lessonName: "",
            description: "",
            category: 0,
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            // Getting new lesson information.
            let newLesson = {
              lessonName: values.lessonName,
              topics: chips,
              description: values.description,
              image: uploadedImage,
              category: values.category,
            };

            try {
              setIsLoading(true);
              // Sending new lesson information to server.
              const response = await addLesson(newLesson);

              if (response.success) {
                toast.success("Lesson added successfully.");

                // Adding id to new lesson.
                let newRow = {
                  ...response.result,
                  id: response.result._id,
                };

                setRows((prev) => [...prev, newRow]);
              } else {
                toast.error("Something went wrong! Please try again.");
              }
            } catch (error) {
              console.error(error);
            }
            setIsLoading(false);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
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
                <TextField
                  variant="filled"
                  type="text"
                  label="Lesson Name"
                  name="lessonName"
                  onBlur={props.handleBlur}
                  value={props.values.lessonName}
                  onChange={props.handleChange}
                  error={props.touched.lessonName && !!props.errors.lessonName}
                  helperText={
                    props.touched.lessonName && props.errors.lessonName
                  }
                  sx={{ gridColumn: "span 4", fullWidth: "auto" }}
                  required={true}
                />
                <TextField
                  variant="filled"
                  type="text"
                  label="Description"
                  name="description"
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  onChange={props.handleChange}
                  error={
                    props.touched.description && !!props.errors.description
                  }
                  helperText={
                    props.touched.description && props.errors.description
                  }
                  multiline
                  rows={4}
                  sx={{
                    gridColumn: "span 4",
                    textAlign: "left",
                    fullWidth: "auto",
                  }}
                  required={true}
                />
                <TextField
                  variant="filled"
                  type="numer"
                  label="Category"
                  name="category"
                  onBlur={props.handleBlur}
                  value={props.values.category}
                  onChange={props.handleChange}
                  error={props.touched.category && !!props.errors.category}
                  helperText={props.touched.category && props.errors.category}
                  sx={{ gridColumn: "span 4", fullWidth: "auto" }}
                  required={true}
                />
                <MuiChipsInput
                  name="topics"
                  value={chips}
                  onChange={handleChipChange}
                  sx={{
                    gridColumn: "span 4",
                    textAlign: "left",
                    fullWidth: "auto",
                  }}
                />
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
