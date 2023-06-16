import "./index.css";
import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { themeOptions } from "./config/theme.ts";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeOptions}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
