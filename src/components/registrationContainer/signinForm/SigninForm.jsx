import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { Input } from "../../common/inputs/SignupInput";

import { SignInEmployee } from "../../../core/services/api/Employee-authentication.api";
import { signinInputData } from "../../../config/data/signinInputData/SigninInputData";
import { useAuth } from "../../../utils/auth/Auth";
import { getItem } from "../../../core/services/storage/Storage";

export const SigninForm = ({ setSignUp }) => {
  const history = useNavigate();
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
    <>
      <ToastContainer />

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={async (values) => {
          const inputObj = {
            email: values.email,
            password: values.password,
          };

          try {
            const response = await SignInEmployee(inputObj);

            if (response.status === 200) {
              toast.success("You are signed in successfully!");

              auth.login(Boolean(getItem("employee")) === true);

              history("/dashboard");
            } else {
              if (response.status === 400) {
                toast.error("Email or password is wrong.");
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
            <Box sx={{ mt: 5 }}>
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => setSignUp(true)}
                  sx={{ cursor: "pointer" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};
