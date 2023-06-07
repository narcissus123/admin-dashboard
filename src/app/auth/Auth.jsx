import React from "react";

import { Layout } from "../../components/layout/Layout";

import { Routes, Route } from "react-router-dom";
import { privateRoutes } from "../../config/Routes";

export const Auth = () => {
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
