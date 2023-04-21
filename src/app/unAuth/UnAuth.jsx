import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../../config/Routes";
import { Layout } from "../../components/layout/Layout";
import { useAuth } from "../../utils/auth/Auth";

export const UnAuth = ({ auth }) => {
  const auth1 = useAuth();
  console.log("isEmployee unauth: ", auth.isEmployee);
  console.log("isEmployee auth1: ", auth1.isEmployee);
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          exact={route.exact}
        />
      ))}
    </Routes>
  );
};
