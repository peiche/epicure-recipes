import React from "react"
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../themes/Theme";
import Footer from "./footer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth='md' sx={{ my: 3 }}>
                {children}
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default Layout;
