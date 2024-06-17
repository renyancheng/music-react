import {createTheme} from "@mui/material/styles";

export const LIGHT_MODE = "light";

export const DARK_MODE = "dark";

export const SYSTEM_MODE = "system";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1e88e5",
        },
        secondary: {
            main: "#ff4081",
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
