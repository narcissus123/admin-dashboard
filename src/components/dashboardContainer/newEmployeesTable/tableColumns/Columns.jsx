import React from "react";
import { Typography, Box, Avatar, Badge, useTheme } from "@mui/material";
import dayjs from "dayjs";

import { tokens } from "../../../../global/theme/Theme";

function Author({ image, name, email }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption" color="secondary">
          {email}
        </Typography>
      </Box>
    </Box>
  );
}

function Function({ job, org }) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" fontWeight="medium" color="text">
        {job}
      </Typography>
      <Typography variant="caption" color="secondary">
        {org}
      </Typography>
    </Box>
  );
}

export const Columns = (rows, setRows) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return [
    {
      field: "fullName",
      headerName: "EMPLOYEE",
      flex: 1,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => (
        <Author
          image={params.profile}
          name={params.fullName}
          email={params.email}
        />
      ),
    },
    {
      field: "role",
      headerName: "ROLE",
      flex: 1,
      editable: true,
      type: "string",
      valueGetter: null,
      renderCell: ({ row: params }) => (
        <Function job={params.role} org="Organization" />
      ),
    },
    {
      field: "isActive",
      headerName: "STATUS",
      flex: 1,
      editable: false,
      type: "string",
      renderCell: ({ row: params }) => {
        return (
          <Badge
            variant="gradient"
            badgeContent={params.isActive ? "Active" : "InActive"}
            size="xs"
            sx={{
              width: 23,
              fontWeight: "bold",
              textTransform: "uppercase",
              lineHeight: 1,
              textAlign: "center",
              whiteSpace: "nowrap",
              verticalAlign: "baseline",
              backgroundColor: "#3e4396",
              color: `${
                params.isActive === true
                  ? colors.blueAccent[400]
                  : colors.redAccent[400]
              } !important`,
            }}
            container={false}
          />
        );
      },
    },
    {
      field: "registerDate",
      headerName: "EMPLOYED",
      flex: 1,
      editable: true,
      type: "date",
      valueGetter: (params) => {
        return new Date(params.row["registerDate"]);
      },
      renderCell: ({ row: params }) => (
        <Typography variant="caption" color="secondary" fontWeight="medium">
          {dayjs(params.registerDate).format("MM/DD/YYYY")}
        </Typography>
      ),
    },
  ];
};
