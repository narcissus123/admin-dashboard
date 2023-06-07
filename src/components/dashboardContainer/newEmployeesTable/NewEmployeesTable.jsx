import React from "react";
import { Box, Typography, Card, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { Columns } from "./tableColumns/Columns";

import { getEmployees } from "../../../core/services/api/manage-employees.api";
import { useFetch } from "../../../hooks/useFetch";
import { tokens } from "../../../global/theme/Theme";

const NewEmployeesTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  function getLastWeeksDate() {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  }

  const [rows, setRows] = React.useState([]);
  /* Getting last instructors joined institute. */
  const { isLoading, data } = useFetch(getEmployees);

  React.useEffect(() => {
    if (isLoading) {
      setRows([]);
    } else {
      let date1 = new Date(getLastWeeksDate()).getTime();
      const newEmployees = data.filter((employee) => {
        let date2 = new Date(employee.registerDate).getTime();
        return date2 > date1;
      });
      const updatedData = newEmployees.map((employee) => {
        employee = { ...employee, id: employee._id };
        return employee;
      });

      setRows(updatedData);
    }
  }, [isLoading]);
  return (
    <Box
      sx={{
        height: "290px",
        backgroundColor: colors.primary[400],
        borderRadius: "10px",
        border: "1px solid",
        borderColor: `${
          theme.palette.mode === "dark" ? "rgb(52, 71, 103)" : "white"
        } !important`,
      }}
    >
      <Box sx={{}}>
        <Card>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={1}
            px={2}
            sx={{
              fontWeight: "bold",
              backgroundColor: `${
                theme.palette.mode === "dark" && colors.blueAccent[700]
              } !important`,
            }}
          >
            <Typography variant="h6">New Employees</Typography>
          </Box>
          <Box
            sx={{
              height: "253px",
              overflowY: "auto",
              boxShadow: 2,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <DataGrid columns={Columns(rows, setRows)} rows={rows} />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default React.memo(NewEmployeesTable);
