import React from "react"
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Footer from "./footer";
import theme from "../themes/theme";
import '../styles/print.scss';
import Header from "./header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container maxWidth='md' sx={{ my: 3 }}>
                {children}
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default Layout;
