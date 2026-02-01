import React from "react"
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../../themes/theme";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

