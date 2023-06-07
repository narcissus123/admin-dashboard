import React, { Fragment } from "react";
import { SidebarSection } from "./sidebar/Sidebar";
import { HomeHeader } from "./header/homeHeader/HomeHeader";
import { Header } from "./header/authHeader/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Layout = ({ sidebarSection, homeHeader }) => {
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          height: "auto",
          width: "screen",
        }}
      >
        {sidebarSection && <SidebarSection />}
        <Box sx={{ flex: "1", maxWidth: "100%", minWidth: "82%" }}>
          {homeHeader ? <HomeHeader /> : <Header />}
          <Outlet />
        </Box>
      </Box>
    </Fragment>
  );
};
