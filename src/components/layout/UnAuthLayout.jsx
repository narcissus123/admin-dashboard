import React from "react";
import { SidebarSection } from "./sidebar/Sidebar";
import { Footer } from "./footer/Footer";
import { HomeHeader } from "./header/homeHeader/HomeHeader";
import { Header } from "./header/authHeader/Header";
import { Box } from "@mui/material";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getItem } from "../../core/services/storage/Storage";

export const UnAuthLayout = ({ sidebarSection, homeHeader, footer }) => {
  const token = Boolean(getItem("employee"));
  // console.log("token un: ", token);
  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {sidebarSection && <SidebarSection />}
        <Box sx={{ width: "100%" }}>
          {homeHeader ? <HomeHeader /> : <Header />}
          <Outlet />
        </Box>
      </Box>
      {footer && <Footer />}
    </>
  );
};
