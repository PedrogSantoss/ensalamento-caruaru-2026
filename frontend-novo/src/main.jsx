import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import QueryProvider from "./providers/QueryProvider";
import { AppProvider } from "./providers/AppProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryProvider>
    <AppProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppProvider>
  </QueryProvider>
);
