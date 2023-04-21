import React from "react";
import { SubHeader } from "../layout/subHeader/SubHeader";
import { Box } from "@mui/material";

export const DashboardContainer = () => {
  return (
    <Box sx={{ m: "20px" }}>
      <SubHeader title="DASHBOARD" subtitle={`welcome ... to your dashboard`} />
      <div>DashboardContainer</div>
    </Box>
  );
};
