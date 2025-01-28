import React from "react"
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Link as GatsbyLink } from "gatsby";
import { GitHub } from "@mui/icons-material";

export default function Header() {
    return (
        <AppBar position="static" variant='outlined' color="default" className="hide-print" sx={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
        }}>
            <Container maxWidth='md'>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        component={GatsbyLink}
                        to='/'
                        color='inherit'
                        fontWeight='bold'
                        sx={{ textDecoration: 'none' }}
                    >Epicure Recipes</Typography>

                    <Box>
                        <IconButton color='inherit' component='a' href='https://github.com/peiche/epicure-recipes' target="_blank">
                            <GitHub />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
