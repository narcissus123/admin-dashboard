import { Auth } from "./auth/Auth";
import React, { useEffect, useState } from "react";
import { useMode, ColorModeContext } from "../global/theme/Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UnAuth } from "./unAuth/UnAuth";
import { getItem } from "../core/services/storage/Storage";
import { useAuth } from "../utils/auth/Auth";

export const App = () => {
  const [theme, colorMode] = useMode();
  const auth = useAuth();

  console.log("isEmployee app: ", auth.isEmployee);
  return (
    /* Context to access our colorMode from everywhere in the app. */
    <ColorModeContext.Provider value={colorMode}>
      {/* For material ui to have access to the theme */}
      <ThemeProvider theme={theme}>
        <div className="app">
          {/* Setting the css to default */}
          <CssBaseline />

          {auth.isEmployee ? <Auth auth={auth} /> : <UnAuth auth={auth} />}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
