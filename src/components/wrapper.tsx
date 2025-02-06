import React from "react"
import { Container } from "@mui/material";
import Header from "./header";
import Footer from "./footer";

interface WrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
    return (
        <>
            <Header />
            <Container maxWidth='lg' sx={{ my: 3 }}>
                {children}
            </Container>
            <Footer />
        </>
    )
}
