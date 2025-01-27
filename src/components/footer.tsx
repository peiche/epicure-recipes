import React from "react"
import { Box, Container, Divider, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box component='footer'>
            <Container maxWidth='md'>
                <Divider sx={{ my: 5 }} />
                <Typography textAlign='center'>Built with love of food and programming.</Typography>
            </Container>
        </Box>
    )
}