import React from "react";
import { SubHeader } from "../layout/subHeader/SubHeader";
import { Box, useTheme } from "@mui/material";
import Tab from "@mui/material/Tab";
import { SigninForm } from "./signinForm/SigninForm";
import { SignupForm } from "./signupForm/SignupForm";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { tokens } from "../../global/theme/Theme";
import { getItem } from "../../core/services/storage/Storage";

export const RegistrationContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState("1");
  console.log("token: ", getItem("token"));
  console.log("employee: ", getItem("employee"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        background: `#4cceac !important`,
        borderBottom: "2px solid #ccc",
        borderLeft: "2px solid #ccc",
        borderRight: "1px solid #ccc",
        borderTop: "1px solid #ccc",
        width: "50%",
        typography: "body1",
        mt: "70px",
        borderRadius: "10px",
        overflow: "hidden",
        mx: "auto",
      }}
    >
      <TabContext value={value}>
        <Box
          color={colors.grey[100]}
          sx={{
            textAlign: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Signin"
              value="1"
              sx={{
                background: `secondary !important`,
                mx: "auto",
                width: "100%",
                "&:hover": {
                  color: "rgb(7, 177, 77)",
                },
              }}
            />
            <Tab
              label="Signup"
              value="2"
              sx={{
                mx: "auto",
                width: "100%",
                "&:hover": {
                  color: "rgb(7, 177, 37)",
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{ background: `${colors.primary[400]} !important` }}
        >
          <SigninForm />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{ background: `${colors.primary[400]} !important` }}
        >
          <SignupForm setValue={setValue} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
