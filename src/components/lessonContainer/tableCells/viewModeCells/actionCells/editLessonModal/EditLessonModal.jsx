import React from "react";
import { Box, Avatar, IconButton, TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import LoadingButton from "../../../../../common/button/LoadingButton";
import { CustomModal } from "../../../../../common/modal/Modal";
import EditImageModal from "../EditImageModal";

import { UpdteLessonById } from "../../../../../../core/services/api/manage-lessons.api";

const EditLessonModal = ({ setOpen, open, setRows, rows, lessonId }) => {
  // Finding selected lesson to be eddited.
  const row = rows.filter((row) => row.id === lessonId);

  // Saving keywords related to the selected lesson.
  const [chips, setChips] = React.useState(row[0].topics);
  const handleChipChange = (newChips) => {
    setChips(newChips);
  };

  const [isLoading, setIsLoading] = React.useState(false);

  // Saving image of selected lesson.
  const [uploadedImage, setUploadedImage] = React.useState(row[0].image);
  const [openImgModal, setOpenImgModal] = React.useState(false);

  // Update lesson form validation.
  const formSchema = Yup.object().shape({
    lessonName: Yup.string()
      .min(2, "Must be 2 characters or more.")
      .max(100, "Must be 100 characters or less.")
      .required("This is required."),
    description: Yup.string()
      .min(2, "Must be 2 characters or more.")
      .max(1000, "Must be 500 characters or less.")
      .required("This is required."),
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
            row={row[0]}
            sx={{ fullWidth: "auto" }}
          />
        )}

        {/* Update lesson form */}
        <Formik
          initialValues={{
            lessonName: row[0].lessonName,
            description: row[0].description,
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            // Getting updated lesson information.
            let updateLesson = {
              lessonName: values.lessonName,
              topics: chips,
              description: values.description,
              image: uploadedImage,
              category: row[0].category,
            };

            try {
              setIsLoading(true);
              // Sending updated lesson information to server.
              const response = await UpdteLessonById(row[0].id, updateLesson);

              if (response.success) {
                toast.success("Lesson updated successfully.");

                // Adding id to updated lesson.
                let updatedRow = {
                  ...response.result,
                  id: response.result._id,
                };

                // Removing outdated lesson information and adding the updated one.
                setRows((prev) =>
                  prev.filter((row) => row.id !== updatedRow._id)
                );

                setRows((prev) => [...prev, updatedRow]);
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

              <LoadingButton isLoading={isLoading} btnText="UPDATE" />
            </form>
          )}
        </Formik>
      </Box>
    </CustomModal>
  );
};

export default React.memo(EditLessonModal);
