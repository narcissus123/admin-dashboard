import React from "react";
import { Route, Routes } from "react-router-dom";

import { publicRoutes } from "../../config/Routes";

export const UnAuth = () => {
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
