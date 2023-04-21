import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { signupInputData } from "../../../config/data/signupInputData/SignupInputData";
import { Input } from "../../common/inputs/SignupInput";
import { CustomDatePicker } from "../../common/datePicker/CustomDatePicker";
import { Dropdown } from "../../common/dropdown/Dropdown";
import { SignUpEmployee } from "../../../core/services/api/Employee-authentication.api";
import Snackbar from "@mui/material/Snackbar";
import { Message } from "../../common/messages/Message";
import dayjs from "dayjs";

export const SignupForm = ({ setValue }) => {
  const formSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Must be 2 characters or more.")
      .max(20, "Must be 20 characters or less.")
      .required("This is required."),
    email: Yup.string()
      .email("This email is not valid.")
      .required("This is required."),
    password: Yup.string()
      .min(8, "Must be 8 characters or more.")
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        "The password must contain numbers, upper and lower case letters and one of the @, ?, * or ! characters."
      )
      .required("This is required."),
    phoneNumber: Yup.number().required("This is required."),
    birthDate: Yup.date().required("This is required."),
    nationalId: Yup.string().required("This is required"),
    address: Yup.string().required("This is required"),
    role: Yup.string().required("This is required"),
  });
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        phoneNumber: 0,
        birthDate: "",
        nationalId: "",
        address: "",
        role: "admin",
        profile: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        console.log("values: ", values);
        console.log("values: ", values);
        const inputObj = {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          phoneNumber: JSON.stringify(values.phoneNumber),
          birthDate: dayjs(values.birthDate).format("DD/MM/YYYY"),
          nationalId: values.nationalId,
          address: values.address,
          role: values.role,
          profile: values.profile,
        };

        console.log("inputObj: ", inputObj);
        try {
          const response = await SignUpEmployee(inputObj);

          if (response.success) {
            <Message
              severity="success"
              message="You are successfully signed up! Please sign in into your acount."
              opening={true}
              vertical="top"
              horizontal="right"
            />;

            console.log("response sign up: ", response);
            setValue("1");
          } else {
            if (response.message[0].eventId === 401) {
              <Message
                severity="error"
                message="National id or email exists in our system."
                opening={true}
                vertical="top"
                horizontal="right"
              />;
            } else {
              <Message
                severity="error"
                message="Something went wrong! Please try again."
                opening={true}
                vertical="top"
                horizontal="right"
              />;
            }
          }
        } catch (error) {
          <Message severity="error" message={error} opening={true} />;
        }
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
            {signupInputData.map((data, index) => {
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
          <Box display="flex" justifyContent="center" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              sign up
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
