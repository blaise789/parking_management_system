import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@mui/material";
import THEME from "./theme";
import { MantineProvider } from "@mantine/core";
import ErrorBoundary from "./pages/500/ErrorBoundary";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* store container */}
    <ErrorBoundary>
      <MantineProvider>
        <ThemeProvider theme={THEME}>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </MantineProvider>
    </ErrorBoundary>
  </StrictMode>
);
