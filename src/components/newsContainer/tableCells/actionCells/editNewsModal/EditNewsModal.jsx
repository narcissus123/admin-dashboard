import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import LoadingButton from "../../../../common/button/LoadingButton";
import { Input, MutiLineInput } from "../../../../common/inputs/SignupInput";
import { Dropdown } from "../../../../common/dropdown/Dropdown";
import { CustomModal } from "../../../../common/modal/Modal";
import EditImageModal from "../editImageModal/EditImageModal";

import { updateNewsById } from "../../../../../core/services/api/manage-News.api";
import { updateNewsData } from "../../../../../config/data/manageNewsData/UpdateNewsData";

const EditNewsModal = ({
  setOpen,
  open,
  setRows,
  rows,
  selectedRow,
  newsId,
}) => {
  // Finding selected news to be eddited.
  const row = rows.filter((row) => row.id === newsId);

  const [isLoading, setIsLoading] = React.useState(false);

  // Saving image of selected news.
  const [uploadedImage, setUploadedImage] = React.useState(row[0].image);
  const [openImgModal, setOpenImgModal] = React.useState(false);

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
          direction: "column",
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
        {/* Update news form */}
        <Formik
          initialValues={{
            title: selectedRow.row.title,
            category: selectedRow.row.category,
            text: selectedRow.row.text,
          }}
          validationSchema={formSchema}
          onSubmit={React.useCallback(async (values) => {
            try {
              // Getting updated news information.
              const userInput = {
                title: values.title,
                category: values.category,
                image: uploadedImage,
                text: values.text,
              };

              setIsLoading(true);
              // Sending updated news information to server.
              const response = await updateNewsById(
                selectedRow.row._id,
                userInput
              );

              if (response.success) {
                toast.success("News updated successfully.");

                // Adding id to updated news.
                let updatedRow = {
                  ...response.result,
                  id: response.result._id,
                };

                // Removing outdated news information and adding the updated one.
                setRows((prev) =>
                  prev.filter((row) => row.id !== updatedRow._id)
                );

                setRows((prev) => [...prev, updatedRow]);
              } else {
                toast.error("Sorry, something went wrong. Please try again.");
              }
            } catch (error) {
              console.error(error);
            }
            setIsLoading(false);
          }, [])}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                marginTop="40px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": "span 4",
                }}
              >
                {updateNewsData.map((data, index) => {
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "32px",
                }}
              >
                <LoadingButton isLoading={isLoading} btnText="UPDATE" />
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </CustomModal>
  );
};

export default React.memo(EditNewsModal);
