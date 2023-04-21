import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/auth/Auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
