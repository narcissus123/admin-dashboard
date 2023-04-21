import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import { signinInputData } from "../../../config/data/signinInputData/SigninInputData";
import { Input } from "../../common/inputs/SignupInput";
import { SignInEmployee } from "../../../core/services/api/Employee-authentication.api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../utils/auth/Auth";
import { getItem } from "../../../core/services/storage/Storage";

export const SigninForm = () => {
  const history = useNavigate();
  const loacation = useLocation();
  const auth = useAuth();

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("This email is not valid.")
      .required("This is required."),
    password: Yup.string()
      .min(8, "Must be 8 characters or more.")
      .required("This is required."),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        console.log("values: ", values);
        const inputObj = {
          email: values.email,
          password: values.password,
        };

        console.log("inputObj: ", inputObj);
        try {
          const response = await SignInEmployee(inputObj);

          if (response.success) {
            console.log(response);
            console.log("You are successfully signed in!");
            console.log(
              "Boolean(getItem(employee)) === false: ",
              Boolean(getItem("employee")) === false
            );
            console.log("getItem(employee) === false: ", getItem("employee"));

            auth.login(Boolean(getItem("employee")) === true);
            console.log(auth.isEmployee);
            history("/dashboard");
          } else {
            console.log("Something went wrong! Please try again.");
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box>
            {signinInputData.map((data, index) => (
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
            ))}
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
