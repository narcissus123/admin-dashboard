import React from "react";
import { CustomModal } from "../common/modal/Modal";
import { TextField, Box, Typography, Button } from "@mui/material";
import { useData } from "../../utils/dashboardData/DashboardData";
const AddEventModal = ({ selectedEvent, open, setOpen, api }) => {
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const calEvent = useData();
  //If user enters a title, we will create an event and add it to the calendar.
  const handleClick = () => {
    api.addEvent({
      id: `${title}`,
      title,
      start: selectedEvent.startStr,
      end: selectedEvent.endStr,
      allDay: selectedEvent.allDay,
      description,
    });
    setOpen(false);
  };

  return (
    <CustomModal
      setOpen={setOpen}
      open={open}
      callBackFunc={handleClick}
      modalHeader={true}
      modalFooter={true}
      buttonText="Add Event"
      btnStyle="success"
    >
      <Box
        gap="20px"
        alignItems="center"
        justifyContent="center"
        padding="40px"
      >
        <Typography sx={{ marginBottom: "10px" }}>
          Please enter event title here:{" "}
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="Title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={{ marginBottom: "20px" }}
          required={true}
        />
        <Typography sx={{ marginBottom: "10px" }}>
          Please enter event description here:{" "}
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          label="Description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{}}
          multiline
          row={3}
        />
      </Box>
    </CustomModal>
  );
};

export default React.memo(AddEventModal);
