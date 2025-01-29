import React from "react"
import { Container } from "@mui/material";
import Header from "./header";
import Footer from "./footer";

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Container maxWidth='md' sx={{ my: 3 }}>
                {children}
            </Container>
            <Footer />
        </>
    )
}

export default Wrapper;