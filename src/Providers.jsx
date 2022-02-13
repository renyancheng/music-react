import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { Grow } from "@mui/material";
import store from "./redux/store";
import theme from "./theme";

export default function Providers({ children }) {
  return (
    <>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <ConfirmProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              TransitionComponent={Grow}
            >
              {children}
            </SnackbarProvider>
          </ConfirmProvider>
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}
