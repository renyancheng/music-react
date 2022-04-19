import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { AudioPlayerProvider } from "react-use-audio-player";
import { Grow } from "@mui/material";
import { store, persistor } from "./redux/store";
import theme from "./theme";

export default function Providers({ children }) {
  return (
    <>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <ConfirmProvider
              defaultOptions={{
                title: "提示",
                confirmationText: "确定",
                cancellationText: "取消",
              }}
            >
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                // dense
                TransitionComponent={Grow}
              >
                <AudioPlayerProvider>{children}</AudioPlayerProvider>
              </SnackbarProvider>
            </ConfirmProvider>
          </ThemeProvider>
        </PersistGate>
      </StoreProvider>
    </>
  );
}
