import React from "react";
import { useFormikContext } from "formik";
import { Autocomplete, TextField, MenuItem } from "@mui/material";

export const Dropdown = ({ name, options, sx, label, required }) => {
  const formik = useFormikContext();
  return (
    <TextField
      name={name}
      select
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.errors[name]}
      variant={"outlined"}
      sx={sx}
      fullWidth
      required={required}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
