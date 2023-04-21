import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { privateRoutes } from "../../config/Routes";
import { useAuth } from "../../utils/auth/Auth";

export const Auth = ({ auth }) => {
  const auth1 = useAuth();
  console.log("isEmployee auth: ", auth.isEmployee);
  console.log("isEmployee auth1: ", auth1.isEmployee);
  return (
    <Routes>
      <Route
        element={
          <Layout sidebarSection={true} homeHeader={true} footer={true} />
        }
        exact
      >
        {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
            exact={route.exact}
          />
        ))}
      </Route>
    </Routes>
  );
};
