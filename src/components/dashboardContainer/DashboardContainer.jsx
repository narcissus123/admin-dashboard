import React from "react";
import { Box, Button, useTheme } from "@mui/material";

import { addEmployeeData } from "../../config/data/manageDashboardData/statBoxData";

import StatBox from "./common/statBox/StatBox";
import { tokens } from "../../global/theme/Theme";
import { SubHeader } from "../layout/subHeader/SubHeader";

import ChatNotifications from "./chatNotifications/ChatNotifications";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TopNews from "./topNews/TopNews";
import NewEmployeesTable from "./newEmployeesTable/NewEmployeesTable";
import ToDoList from "./toDoList/ToDoList";
import EmployeeProfileInfo from "./employeeProfileInfo/EmployeeProfileInfo";

export const data = [
  ["Language", "Speakers (in millions)"],
  ["active", 0.6],
  ["inactive", 0.5],
];

export const options = {
  legend: "none",
  pieSliceText: "label",
  title: "Swiss Language Use (100 degree rotation)",
  pieStartAngle: 100,
  pieHole: 0.8,
  backgroundColor: "transparent",
  border: "none",
};

export const DashboardContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = addEmployeeData();

  return (
    <Box sx={{ m: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <SubHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* ROW 1 */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {columns.map((col) => {
          return (
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={col.title}
                subtitle={col.subtitle}
                increase={col.increase}
                icon={col.icon}
                pieData={col.pieData}
                pieOptions={col.pieOptions}
                pieStyle={col.pieStyle}
              />
            </Box>
          );
        })}
        {/* <Clock format={"HH:mm:ss"} ticking={true} timezone={"US/Pacific"} /> */}
        {/* ROW 2 */}

        <Box gridColumn="span 4" gridRow="span 2">
          <ChatNotifications />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <EmployeeProfileInfo />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{ overflow: "hidden", height: "109%" }}
        >
          <TopNews />
        </Box>
        {/* ROW 3 */}

        <Box gridColumn="span 8" gridRow="span 2" marginTop="29px">
          <NewEmployeesTable />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          marginTop="29px"
          sx={{ height: "97%" }}
        >
          <ToDoList />
        </Box>
      </Box>
    </Box>
  );
};
