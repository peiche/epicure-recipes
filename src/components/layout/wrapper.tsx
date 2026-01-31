import React from "react"
import Header from "./header";
import Footer from "./footer";

interface WrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
