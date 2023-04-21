import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormikContext } from "formik";
import dayjs from "dayjs";

export const CustomDatePicker = ({ name, label, required }) => {
  const formik = useFormikContext();
  console.log(formik.values);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DatePicker
            label={label}
            name={name}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched[name] && !!formik.errors[name]}
            helperText={formik.touched[name] && formik.errors[name]}
            onChange={(value) => {
              formik.setFieldValue(name, value);
            }}
            required={required}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};
