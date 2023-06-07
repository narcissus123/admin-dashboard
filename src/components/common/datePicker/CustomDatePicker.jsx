import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormikContext } from "formik";
import dayjs from "dayjs";

export const CustomDatePicker = ({ name, label, required }) => {
  const formik = useFormikContext();

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
            defaultValue={dayjs(formik.initialValues[name])}
            onChange={(value) => {
              formik.setFieldValue(name, value);
            }}
            required={required}
            textFieldStyle={{
              width: "100%",
              gridColumn: "span 4",
              border: "1px solid red",
            }}
            style={{ width: "100%" }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};
