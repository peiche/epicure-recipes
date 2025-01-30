import React from "react"
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Link as GatsbyLink } from "gatsby";
import { GitHub } from "@mui/icons-material";

export default function Header() {
    return (
        <AppBar position="static" variant='outlined' elevation={0} color="default" sx={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
        }}>
            <Container maxWidth='md'>
                <Toolbar disableGutters>
                    <Typography
                        component={GatsbyLink}
                        to='/'
                        color='inherit'
                        fontWeight='bold'
                        sx={{ textDecoration: 'none' }}
                    >Epicure Recipes</Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
