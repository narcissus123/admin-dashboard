import React from "react";
import { Box, IconButton, Avatar } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { CustomModal } from "../../../common/modal/Modal";
import { Input } from "../../../common/inputs/SignupInput";
import { CustomDatePicker } from "../../../common/datePicker/CustomDatePicker";
import EditImageModal from "./EditImageModal";
import LoadingButton from "../../../common/button/LoadingButton";

import { addStudentData } from "../../../../config/data/manageStudentData/addStudentData";
import { createStudent } from "../../../../core/services/api/manage-students.api";

// This component allows admin to add new student to the list of students.
const GridToolbarAddItemModal = ({ setOpen, open, rows, setRows }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState("image.png");
  const [openImgModal, setOpenImgModal] = React.useState(false);

  // Define form validation.
  const formSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Must be 2 characters or more.")
      .max(20, "Must be 20 characters or less.")
      .required("This is required."),
    password: Yup.string()
      .min(8, "Must be 8 characters or more.")
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        "The password must contain numbers, upper and lower case letters and one of the @, ?, * or ! characters."
      )
      .required("This is required."),
    email: Yup.string()
      .email("This email is not valid.")
      .required("This is required."),
    phoneNumber: Yup.number().required("This is required."),
    birthDate: Yup.date().required("This is required."),
    nationalId: Yup.string()
      .length(10, "Must be 10 characters.")
      .required("This is required"),
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
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          paddingX: "30px",
          paddingY: "40px",
          gap: "15px",
        }}
      >
        {/* Form */}
        <Formik
          FormControlLabel
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            phoneNumber: "",
            birthDate: new Date(),
            nationalId: "",
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            try {
              // Getting user inputs.
              const userInput = {
                fullName: values["fullName"],
                email: values["email"],
                phoneNumber: values["phoneNumber"].toString(),
                birthDate: dayjs(values["birthDate"]).format("MM/DD/YYYY"),
                nationalId: values["nationalId"],
                password: values["password"],
                profile: uploadedImage,
              };

              setIsLoading(true);

              // Sending new student information to server.
              const response = await createStudent(userInput);

              if (response.success) {
                toast.success("Student added successfully.");

                // Adding id to the row and update the students' table.
                let newRow = { ...response.result, id: response.result._id };
                setRows((prev) => [...prev, newRow]);
              } else {
                toast.error("Something went wrong. Please try again.");
              }
            } catch (error) {
              console.error(error);
            }
            setIsLoading(false);
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {/* Showing new student image. User can upload new image in the EditImageModal. */}
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": "span 4",
                }}
              >
                <IconButton
                  sx={{
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
                {/* Form inputs including date picker and TextField */}
                {addStudentData.map((data, index) => {
                  return data.name === "birthDate" ? (
                    <CustomDatePicker
                      key={index}
                      name={data.name}
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

export default React.memo(GridToolbarAddItemModal);
