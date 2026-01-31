import React, { useState } from "react"
import { AppBar, Box, Button, Container, Drawer, IconButton, InputBase, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from "@mui/material";
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Favorite,
    Restaurant,
    Home,
    Category,
    Book,
    Close,
} from '@mui/icons-material';
import NextLink from "next/link";
import theme from "../../themes/theme";
import { Configure, InstantSearch } from "react-instantsearch";
import { searchClient, searchIndexName } from "../../services/api/algolia";
import SearchSuggest from "../search/searchSuggest";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { label: 'Home', icon: <Home />, path: '/' },
        { label: 'Recipes', icon: <Book />, path: '/recipes' },
        { label: 'Categories', icon: <Category />, path: '/categories' },
        { label: 'About', icon: <Restaurant />, path: '/about' },
    ];

    const drawer = (
        <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontFamily: 'Playfair Display', color: 'primary.main', fontWeight: 700 }}>
                    🍳 Epicure Recipes
                </Typography>
                <IconButton onClick={handleDrawerToggle}>
                    <Close />
                </IconButton>
            </Box>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            component={NextLink}
                            href={item.path}
                            sx={{
                                py: 1.5,
                                px: 3,
                                '&:hover': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText',
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.contrastText',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky" color="transparent" elevation={0}>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters sx={{ py: 1 }}>
                        {/* Mobile Menu Button */}
                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 1 }}
                            >
                                <MenuIcon sx={{ color: 'text.primary' }} />
                            </IconButton>
                        )}

                        {/* Logo */}
                        <Link component={NextLink} href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    fontFamily: 'Playfair Display',
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                🍳 Epicure Recipes
                            </Typography>
                        </Link>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <Box sx={{ ml: 6, display: 'flex', gap: 1 }}>
                                {navItems.map((item) => (
                                    <Button
                                        key={item.label}
                                        component={NextLink}
                                        href={item.path}
                                        sx={{
                                            color: 'text.primary',
                                            fontWeight: 500,
                                            px: 2,
                                            '&:hover': {
                                                color: 'primary.main',
                                                bgcolor: 'transparent',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        <Box sx={{ flexGrow: 1 }} />

                        {/* Search Bar - Desktop */}
                        {!isMobile && (
                            <InstantSearch
                                // searchClient={searchClient}
                                // indexName="recipe"
                                searchClient={searchClient}
                                indexName={searchIndexName}
                                // routing={{
                                //     router: createInstantSearchRouterNext({
                                //         singletonRouter,
                                //     }),
                                // }}
                                // insights={false}
                                future={{
                                    preserveSharedStateOnUnmount: false,
                                }}
                            >
                                <Configure hitsPerPage={5} />
                                <SearchSuggest />
                            </InstantSearch>
                        )}

                        {/* Mobile Search Button */}
                        {isMobile && (
                            <IconButton
                                component={NextLink}
                                href='/search'
                                sx={{ color: 'text.primary', mr: 2 }}
                            >
                                <SearchIcon />
                            </IconButton>
                        )}

                        {/* Support Button */}
                        {isMobile ? (
                            <Button
                                variant="contained"
                                component='a'
                                href='https://www.paypal.com/donate/?business=SY2SCFJENKDEJ&no_recurring=0&item_name=I%27m+providing+this+recipe+website+for+free.+If+you%27d+like+to+show+your+appreciation%2C+you+can+donate+the+amount+of+your+choice.&currency_code=USD'
                                target='_blank'
                                sx={{
                                    bgcolor: 'primary.main',
                                    p: 1,
                                    fontWeight: 600,
                                    borderRadius: '50px',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                        boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                                    },
                                }}
                            >
                                <Favorite />
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                component='a'
                                href='https://www.paypal.com/donate/?business=SY2SCFJENKDEJ&no_recurring=0&item_name=I%27m+providing+this+recipe+website+for+free.+If+you%27d+like+to+show+your+appreciation%2C+you+can+donate+the+amount+of+your+choice.&currency_code=USD'
                                target='_blank'
                                startIcon={<Favorite />}
                                sx={{
                                    bgcolor: 'primary.main',
                                    px: { xs: 2, md: 3 },
                                    py: 1,
                                    fontWeight: 600,
                                    borderRadius: '50px',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                        boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                                    },
                                }}
                            >
                                {!isMobile && 'Support'}
                            </Button>
                        )}

                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    )
}
