import React from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  Box,
  List,
  Typography,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import { SubHeader } from "../layout/subHeader/SubHeader";
import { tokens } from "../../global/theme/Theme";
import { useData } from "../../utils/dashboardData/DashboardData";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CalendarContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const calEvent = useData();

  // It holds the array of events entered by user.
  const [currentEvents, setCurrentEvents] = React.useState([]);

  // handleDateClick will be invoked When user clicks on a specific date in a calendar.
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState({});
  const [api, setApi] = React.useState({});

  const handleDateClick = (selected) => {
    setOpenAddModal(true);
    const calendarApi = selected.view.calendar;
    setSelectedEvent(selected);
    calendarApi.unselect();
    setApi(calendarApi);
  };

  // handleEventClick will be triggered when we click on an event.
  // By clicking on an event, event will be deleted after user confirms to do so.
  const handleEventClick = (selected) => {
    setOpenDeleteModal(true);
    setSelectedEvent(selected);
  };

  return (
    <Box m="20px">
      <SubHeader title="Calendar" subtitle="Events Calendar" />

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ height: "100%", marginTop: "60px" }}
      >
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          sx={{ maxWidth: "100%", minWidth: "20%" }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {calEvent.calendarEvents.map((event) => {
              return (
                <Accordion
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{event.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{event.extendedProps.description}</Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 80%" ml="15px" sx={{ maxWidth: "80%", minWidth: "80%" }}>
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => {
              setCurrentEvents(events);

              calEvent.setEvents(events);
            }}
            initialEvents={[...calEvent.calendarEvents]}
          />
        </Box>
      </Box>
      {openAddModal && (
        <AddEventModal
          selectedEvent={selectedEvent}
          open={openAddModal}
          setOpen={setOpenAddModal}
          api={api}
        />
      )}
      {openDeleteModal && (
        <DeleteEventModal
          selectedEvent={selectedEvent}
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
        />
      )}
    </Box>
  );
};

export default React.memo(CalendarContainer);
