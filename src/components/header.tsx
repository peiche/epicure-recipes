import React, { useState } from "react"
import { AppBar, Box, Container, FormControl, FormControlLabel, FormLabel, IconButton, Menu, MenuItem, Radio, RadioGroup, Stack, ToggleButton, ToggleButtonGroup, Toolbar, Typography, useColorScheme } from "@mui/material";
import NextLink from "next/link";
import { Contrast, DarkMode, LightMode, SearchOutlined } from "@mui/icons-material";
import ModeToggle from "./modeToggle";

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

                    <Box>
                        <ModeToggle />

                        <IconButton
                            component={NextLink}
                            href='/search'
                        >
                            <SearchOutlined />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
