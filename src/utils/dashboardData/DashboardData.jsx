import { createContext, useState, useContext } from "react";

import { getItem, setEvent } from "../../core/services/storage/Storage";

const DataContext = createContext(false);
export const DashboardProvider = ({ children }) => {
  const [isEmployee, setIsEmployee] = useState(
    Boolean(getItem("employee")) === true
  );

  const [calendarEvents, setCalendarEvents] = useState(
    JSON.parse(getItem("calendarE")) ? JSON.parse(getItem("calendarE")) : []
  );

  const setEvents = (events) => {
    setCalendarEvents(events);

    setEvent("calendarE", JSON.stringify(events));
  };

  const logout = (isEmployee) => {
    setIsEmployee(isEmployee);
  };

  return (
    <DataContext.Provider
      value={{ setEvents, calendarEvents, logout, isEmployee }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
