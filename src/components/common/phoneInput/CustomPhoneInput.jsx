import React from "react";
import { useFormikContext, Field } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const CustomPhoneInput = ({ name, label, required }) => {
  const formik = useFormikContext();

  const [phone, setPhoneValue] = React.useState(0);

  // const handleChange = (e) => {
  //   setPhoneValue(e);
  // };
  return (
    <h>hello</h>
    // <PhoneInput
    //   country={"us"}
    //   value={formik.values[name]}
    //   onChange={(phone) => console.log(phone)}
    // />
    // <PhoneInput
    //   className="my-custom-input"
    //   name={name}
    //   value={formik.values[name]}
    //   onChange={(e) => {
    //     console.log("e", e);
    //     // formik.setFieldValue(name, e.target.value);
    //   }}
    // />
  );
};

// const CustomInputComponent = (props) => {
//   console.log("props", props);
//   return <PhoneInput className="my-custom-input" {...props} />;
// };
// <input {...field} type="text" placeholder="firstName" />
// value={this.state.phone}
// onChange={(phone) => this.setState({ phone })}

// <PhoneInput
//   country={"us"}
//   placeholder="Enter phone number"
//   name={formik.name}
//   value={formik.values.name}
//   id={name}
//   onChange={(value) => formik.handleChange(value)}
//   // onBlur={(value) => formik.handleChange(value)}
// />

// <PhoneInput
//   country={"us"}
//   label={label}
//   // name={name}
//   // id={name}
//   name="phoneNumber"
//   id="phoneNumber"
//   inputProps={{
//     name: "phoneNumber",
//     id: "phoneNumber",
//     required: required,
//     autoFocus: true,
//   }}
//   onBlur={formik.handleBlur}
//   value={formik.values[name]}
//   // error={formik.touched[name] && !!formik.errors[name]}
//   // helperText={formik.touched[name] && formik.errors[name]}
//   defaultValue={formik.initialValues[name]}
//   onChange={formik.handleChange}
//   // required={required}
//   textFieldStyle={{
//     width: "100%",
//     gridColumn: "span 4",
//     border: "1px solid red",
//   }}
//   style={{ width: "100%" }}
// />
