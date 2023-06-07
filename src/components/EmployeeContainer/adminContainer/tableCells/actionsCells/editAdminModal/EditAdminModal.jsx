import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Button, Avatar, IconButton } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

import { Input, MutiLineInput } from "../../../../../common/inputs/SignupInput";
import { CustomDatePicker } from "../../../../../common/datePicker/CustomDatePicker";
import { CustomModal } from "../../../../../common/modal/Modal";
import { Message } from "../../../../../common/messages/Message";

import { UpdateEmployeeData } from "../../../../../../config/data/manageEmployeeData/UpdateEmployeeData";
import { updateEmployeeById } from "../../../../../../core/services/api/manage-employees.api";

const EditAdminModal = ({ setOpen, open, setRows, selectedRow }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Must be 2 characters or more.")
      .max(20, "Must be 20 characters or less.")
      .required("This is required."),
    email: Yup.string()
      .email("This email is not valid.")
      .required("This is required."),
    phoneNumber: Yup.number().required("This is required."),
    birthDate: Yup.date().required("This is required."),
    nationalId: Yup.string().required("This is required"),
    address: Yup.string().required("This is required"),
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
          direction: "column",
          paddingX: "30px",
          paddingY: "40px",
          gap: "15px",
        }}
      >
        <Formik
          initialValues={{
            fullName: selectedRow.fullName,
            email: selectedRow.email,
            phoneNumber: selectedRow.phoneNumber,
            birthDate: selectedRow.birthDate,
            nationalId: selectedRow.nationalId,
            address: selectedRow.address,
          }}
          validationSchema={formSchema}
          onSubmit={React.useCallback(async (values) => {
            try {
              const userInput = {
                fullName: values.fullName,
                email: values.email,
                phoneNumber: values.phoneNumber.toString(),
                birthDate: dayjs(values.birthDate).format("MM/DD/YYYY"),
                nationalId: values.nationalId,
                address: values.address,
              };

              setIsLoading(true);
              const response = await updateEmployeeById(
                selectedRow._id,
                userInput
              );

              if (response.status === 200) {
                <Message
                  severity="success"
                  message="Term added successfully."
                  opening={true}
                  vertical="top"
                  horizontal="right"
                />;

                let updatedRow = {
                  ...response.data.result,
                  id: response.data.result._id,
                };

                setRows((prev) =>
                  prev.filter((row) => row.id !== updatedRow._id)
                );

                setRows((prev) => [...prev, updatedRow]);
              } else {
                <Message
                  severity="error"
                  message="Something went wrong! Please try again."
                  opening={true}
                  vertical="top"
                  horizontal="right"
                />;
              }
            } catch (error) {
              <Message severity="error" message={error} opening={true} />;
            }
            setIsLoading(false);
          }, [])}
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
                >
                  <Avatar
                    src={selectedRow.profile}
                    sx={{ width: 86, height: 86 }}
                  />
                </IconButton>
                {UpdateEmployeeData.map((data, index) => {
                  return data.name === "address" ? (
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
                  variant="contained"
                  type="submit"
                  color="secondary"
                  sx={{
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "small",
                    color: "white",
                    height: "32px",
                  }}
                >
                  <Typography sx={{ paddingRight: "5px" }}>UPDATE</Typography>

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

export default React.memo(EditAdminModal);
