import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Button, Avatar, IconButton } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { Input } from "../../../../common/inputs/SignupInput";
import { Dropdown } from "../../../../common/dropdown/Dropdown";
import { CustomDatePicker } from "../../../../common/datePicker/CustomDatePicker";
import { CustomModal } from "../../../../common/modal/Modal";
import EditImageModal from "./EditImageModal";

import { createEmployee } from "../../../../../core/services/api/manage-employees.api";

const GridToolbarAddRowModal = ({ setOpen, open, setRows, addFormData }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [uploadedImage, setUploadedImage] = React.useState("image.png");

  const [openImgModal, setOpenImgModal] = React.useState(false);
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
    nationalId: Yup.string().required("This is required"),
    address: Yup.string().required("This is required"),
    role: Yup.string().required("This is required"),
  });
  return (
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
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phoneNumber: "",
            birthDate: new Date(),
            nationalId: "",
            address: "",
            password: "Abc@123",
            role: "",
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            try {
              const userInput = {
                fullName: values.fullName,
                email: values.email,
                phoneNumber: values.phoneNumber.toString(),
                birthDate: dayjs(values.birthDate).format("MM/DD/YYYY"),
                nationalId: values.nationalId,
                address: values.address,
                role: "teacher",
                password: values.password,
                profile: "image.png",
              };
              setIsLoading(true);
              const response = await createEmployee(userInput);

              if (response.success) {
                toast.success("Employee added successfully.");
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
                {addFormData.map((data, index) => {
                  return data.name === "role" ? (
                    <Dropdown
                      key={index}
                      name={data.name}
                      options={data.options}
                      sx={data.sx}
                      label={data.label}
                      required={data.required}
                    />
                  ) : data.name === "birthDate" ? (
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "32px",
                }}
              >
                <Button
                  display="flex"
                  justifyContent="center"
                  variant="contained"
                  type="submit"
                  color="secondary"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "small",
                    color: "white",
                    height: "32px",
                  }}
                >
                  <Typography sx={{ paddingRight: "5px" }}>ADD</Typography>
                  {!!isLoading && (
                    <CircularProgress color="inherit" size={20} />
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </CustomModal>
  );
};

export default React.memo(GridToolbarAddRowModal);
