import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Button, Grid, Link } from "@mui/material";

import { signupInputData } from "../../../config/data/signupInputData/SignupInputData";
import { Input } from "../../common/inputs/SignupInput";
import { CustomDatePicker } from "../../common/datePicker/CustomDatePicker";
import { CustomPhoneInput } from "../../common/phoneInput/CustomPhoneInput";

import { Dropdown } from "../../common/dropdown/Dropdown";
import { SignUpEmployee } from "../../../core/services/api/Employee-authentication.api";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import ReactPhoneInput from "react-phone-input-material-ui";
// import { TextField, withStyles } from "@material-ui/core";

export const SignupForm = ({ setValue, setSignUp }) => {
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
        phoneNumber: 2264638173,
        birthDate: "",
        nationalId: "",
        address: "",
        role: "admin",
        profile: "image.png",
      }}
      validationSchema={formSchema}
      onSubmit={async (values) => {
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

        try {
          const response = await SignUpEmployee(inputObj);

          if (response.success) {
            toast.success(
              "You are successfully signed up! Please sign in into your acount."
            );

            setSignUp(false);
          } else {
            if (response.message[0].eventId === 401) {
              toast.error("National id or email exists in our system.");
            } else {
              toast.error("Something went wrong! Please try again.");
            }
          }
        } catch (error) {
          console.error(error);
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
              ) : data.name === "phoneNumber" ? (
                <CustomPhoneInput
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
            {/* <PhoneInput
              country={"us"}
              // value={this.state.phone}
              // onChange={(phone) => this.setState({ phone })}
              value={phoneValue}
              onChange={setPhoneValue} */}
            {/* /> */}
            {/* <ReactPhoneInput
              value={value}
              defaultCountry={defaultCountry || "gb"}
              onChange={onChange}
              inputClass={classes.field}
              dropdownClass={classes.countryList}
              component={TextField}
            /> */}
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              sign up
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                onClick={() => setSignUp(false)}
                sx={{ cursor: "pointer" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
