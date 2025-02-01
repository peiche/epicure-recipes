import React from "react"
import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";
import { SearchOutlined } from "@mui/icons-material";

export default function Header() {
    return (
        <AppBar position="static" variant='outlined' elevation={0} color="default" sx={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
        }}>
            <Container maxWidth='md'>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        component={NextLink}
                        href='/'
                        color='inherit'
                        fontWeight='bold'
                        sx={{ textDecoration: 'none' }}
                    >Epicure Recipes</Typography>

                    <IconButton
                        component={NextLink}
                        href='/search'
                    >
                        <SearchOutlined />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
