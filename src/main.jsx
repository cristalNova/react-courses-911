import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#283593",
        },
        secondary: {
            main: "#ff6f00",
        },
        background: {
            default: "#f4f6fb",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 14,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 10,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 18,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <CssBaseline />
                <App />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);