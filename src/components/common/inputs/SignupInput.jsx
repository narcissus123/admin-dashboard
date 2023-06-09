import React from "react";
import { useFormikContext } from "formik";
import { Box, TextField } from "@mui/material";

export const Input = ({
  variant,
  type,
  label,
  name,
  sx,
  fullWidth,
  required,
}) => {
  const formik = useFormikContext();

  return (
    <TextField
      defaultValue={formik.initialValues[name]}
      fullWidth={fullWidth}
      variant={variant}
      type={type}
      label={label}
      name={name}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.touched[name] && formik.errors[name]}
      sx={sx}
      required={required}
      autoComplete={name}
    />
  );
};

export const MutiLineInput = ({
  variant,
  type,
  label,
  name,
  sx,
  fullWidth,
  required,
  row,
}) => {
  const formik = useFormikContext();

  return (
    <TextField
      defaultValue={formik.initialValues[name]}
      fullWidth={fullWidth}
      variant={variant}
      type={type}
      label={label}
      name={name}
      onBlur={formik.handleBlur}
      value={formik.values.name}
      onChange={formik.handleChange}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.touched[name] && formik.errors[name]}
      sx={sx}
      required={required}
      multiline
      row={row}
    />
  );
};
