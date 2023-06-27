import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Slider from "./slider/Slider";
import { SigninForm } from "./signinForm/SigninForm";
import { SignupForm } from "./signupForm/SignupForm";

const theme = createTheme();

export const RegistrationContainer = () => {
  const [signUp, setSignUp] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Slider />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {signUp ? "Sign up" : "Sign in"}
            </Typography>
            <Box sx={{ mt: 1 }}>
              {signUp ? (
                <SignupForm setSignUp={setSignUp} />
              ) : (
                <SigninForm setSignUp={setSignUp} />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
