import React from "react"
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";
import ModeToggle from "./modeToggle";
import SearchDialogButton from "./searchDialogButton";

export default function Header() {
    return (
        <AppBar position="static" variant='outlined' elevation={0} color="default" sx={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
        }}>
            <Container maxWidth='lg'>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        component={NextLink}
                        href='/'
                        color='inherit'
                        fontWeight='bold'
                        sx={{ textDecoration: 'none' }}
                    >Epicure Recipes</Typography>

                    <Box display='flex' gap={1}>
                        <ModeToggle />
                        <SearchDialogButton />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
