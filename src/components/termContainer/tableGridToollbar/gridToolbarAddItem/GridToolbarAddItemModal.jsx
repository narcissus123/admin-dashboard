import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { CustomModal } from "../../../common/modal/Modal";
import { Input } from "../../../common/inputs/SignupInput";
import { CustomDatePicker } from "../../../common/datePicker/CustomDatePicker";
import { Dropdown } from "../../../common/dropdown/Dropdown";
import { Message } from "../../../common/messages/Message";

import { addTermData } from "../../../../config/data/addTermData/AddTermData";

import { createCourse } from "../../../../core/services/api/manage-Courses.api";

const GridToolbarAddItemModal = ({ setOpen, open, rows, setRows }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  let termData = addTermData();

  const formSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Must be 2 characters or more.")
      .max(20, "Must be 30 characters or less.")
      .required("This is required."),
    cost: Yup.number()
      .min(1, "Cost cannot be 0 dollars.")
      .required("This is required."),
    capacity: Yup.number()
      .min(1, "Capacity can not be 0.")
      .required("This is required."),
    instructor: Yup.string().required("This is required"),
    lesson: Yup.string().required("This is required"),
    startDate: Yup.date().required("This is required."),
    endDate: Yup.date().required("This is required."),
  });

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      modalHeader={true}
      modalFooter={false}
    >
      {/* Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          paddingX: "30px",
          paddingY: "40px",
          gap: "15px",
        }}
      >
        <Formik
          initialValues={{
            title: "",
            cost: 1,
            capacity: 1,
            instructor: "",
            lesson: "",
            startDate: new Date(),
            endDate: new Date(),
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            try {
              setIsLoading(true);
              const response = await createCourse({
                title: values.title,
                cost: values.cost,
                endDate: dayjs(values.endDate).format("MM/DD/YYYY"),
                startDate: dayjs(values.startDate).format("MM/DD/YYYY"),
                capacity: values.capacity,
                teacher: values.instructor,
                lesson: values.lesson,
              });

              if (response.success) {
                let newRow = { ...response.result, id: response.result._id };
                setRows((prev) => [...prev, newRow]);
                toast.success("Term added successfully.");
              } else {
                toast.error("Sorry, something went wrong. Please try again.");
              }
            } catch (error) {
              toast.error("Sorry, something went wrong. Please try again.");
            }
            setIsLoading(false);
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": "span 4",
                }}
              >
                {termData.map((data, index) => {
                  return data.name === "lesson" ||
                    data.name === "instructor" ? (
                    <Dropdown
                      key={index}
                      name={data.name}
                      options={data.options}
                      sx={data.sx}
                      label={data.label}
                      required={data.required}
                    />
                  ) : data.name === "startDate" || data.name === "endDate" ? (
                    <CustomDatePicker
                      key={index}
                      name={data.name}
                      label={data.label}
                      required={data.required}
                    />
                  ) : (
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
                  );
                })}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "32px",
                }}
              >
                <Button
                  display="flex"
                  justifyContent="center"
                  variant="contained"
                  type="submit"
                  color="secondary"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "small",
                    color: "white",
                    height: "32px",
                  }}
                >
                  <Typography sx={{ paddingRight: "5px" }}>ADD</Typography>

                  {!!isLoading && (
                    <CircularProgress color="inherit" size={20} />
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </CustomModal>
  );
};

export default React.memo(GridToolbarAddItemModal);
