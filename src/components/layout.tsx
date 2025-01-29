import React from "react"
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../themes/theme";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default Layout;
