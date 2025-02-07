import { Close, FilterAlt } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

interface SearchDrawerProps {
    children?: ReactNode;
}

export default function SearchDrawer(props: SearchDrawerProps) {
    const { children } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <>
            <Button
                variant='outlined'
                color='inherit'
                startIcon={<FilterAlt />}
                onClick={handleDrawerToggle}
            >
                Search filters
            </Button>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '100%',
                        maxWidth: '380px',
                    },
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography>Search Filters</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <Close />
                    </IconButton>
                </Toolbar>
                <Divider />
                <Box p={2}>
                    {children}
                </Box>
            </Drawer>
        </>
    )
}