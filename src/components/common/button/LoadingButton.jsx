import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Button } from "@mui/material";

const LoadingButton = ({
  variant = "contained",
  isLoading,
  type = "submit",
  color = "secondary",
  btnStyle = {
    color: "secondary",
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "small",
    color: "white",
    height: "32px",
  },
  btnText,
  btnTextStyle = { paddingRight: "5px" },
  CircularProgressSize = 20,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "32px",
      }}
    >
      <Button variant={variant} type={type} sx={btnStyle} color={color}>
        <Typography sx={btnTextStyle}>{btnText}</Typography>

        {!!isLoading && (
          <CircularProgress color="inherit" size={CircularProgressSize} />
        )}
      </Button>
    </Box>
  );
};

export default React.memo(LoadingButton);
