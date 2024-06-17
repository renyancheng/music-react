import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ConfirmProvider} from "material-ui-confirm";
import {SnackbarProvider} from "notistack";
import {ThemeProvider,} from "@mui/material/styles";
import {AudioPlayerProvider} from "react-use-audio-player";
import {Grow} from "@mui/material";
import {lightTheme, darkTheme, DARK_MODE, SYSTEM_MODE} from "./theme";
import {getSystemTheme} from "@/utils";

const Providers = ({children, mode, currentTheme}) => {

    const [curTheme, setCurTheme] = useState(mode === "system" ? getSystemTheme() : mode);

    useEffect(() => {
        setCurTheme(mode === SYSTEM_MODE ? getSystemTheme() : mode);
    }, [mode])

    return (<>
        <ThemeProvider theme={curTheme === DARK_MODE ? darkTheme : lightTheme}>
            <ConfirmProvider
                defaultOptions={{
                    title: "提示", confirmationText: "确定", cancellationText: "取消",
                }}
            >
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: "top", horizontal: "center",
                    }}
                    // dense
                    TransitionComponent={Grow}
                >
                    <AudioPlayerProvider>
                        {children}
                    </AudioPlayerProvider>
                </SnackbarProvider>
            </ConfirmProvider>
        </ThemeProvider>
    </>);
}
export default connect(({
                            style: {mode, currentTheme},
                        }) => ({mode, currentTheme}))(Providers);