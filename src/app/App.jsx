import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { Auth } from "./auth/Auth";
import { useMode, ColorModeContext } from "../global/theme/Theme";
import { UnAuth } from "./unAuth/UnAuth";
import { useAuth } from "../utils/auth/Auth";

export const App = () => {
  const [theme, colorMode] = useMode();
  const auth = useAuth();

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
