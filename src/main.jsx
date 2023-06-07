import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/auth/Auth";
import { ChatProvider } from "./utils/chatContext/ChatContext";
import { DashboardProvider } from "./utils/dashboardData/DashboardData";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatProvider>
        <DashboardProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DashboardProvider>
      </ChatProvider>
    </AuthProvider>
  </React.StrictMode>
);
