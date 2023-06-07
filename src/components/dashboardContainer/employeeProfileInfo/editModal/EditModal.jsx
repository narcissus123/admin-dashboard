import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";

import LoadingButton from "../../../common/button/LoadingButton";
import { Input, MutiLineInput } from "../../../common/inputs/SignupInput";
import { CustomDatePicker } from "../../../common/datePicker/CustomDatePicker";
import { CustomModal } from "../../../common/modal/Modal";

import { setItem } from "../../../../core/services/storage/Storage";
import { UpdateEmployeeData } from "../../../../config/data/manageEmployeeData/UpdateEmployeeData";
import { updateEmployeeById } from "../../../../core/services/api/manage-employees.api";

const EditModal = ({ setOpen, open, employeeInfo, setEmployeeInfo }) => {
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
    <>
      <ToastContainer />

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
              fullName: employeeInfo.fullName,
              email: employeeInfo.email,
              phoneNumber: employeeInfo.phoneNumber,
              birthDate: employeeInfo.birthDate,
              nationalId: employeeInfo.nationalId,
              address: employeeInfo.address,
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
                  employeeInfo._id,
                  userInput
                );

                if (response.status === 200) {
                  toast.success(
                    "Your profile information updated successfully."
                  );

                  let employee = {
                    ...response.data.result,
                    id: response.data.result._id,
                  };
                  setEmployeeInfo(employee);
                  employee = JSON.stringify(employee);

                  setItem("employee", employee);
                } else {
                  toast.success(
                    "Sorry, something went wrong. Please try again."
                  );
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
                      src={employeeInfo.profile}
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
                  <LoadingButton isLoading={isLoading} btnText="UPDATE" />
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </CustomModal>
    </>
  );
};

export default React.memo(EditModal);
