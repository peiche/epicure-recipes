import { createTheme } from "@mui/material";

const baseTheme = createTheme({
    colorSchemes: {
        light: true,
        dark: true,
    },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
});

const theme = createTheme({
    colorSchemes: {
        light: true,
        dark: true,
    },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                firstLast: {
                    [baseTheme.breakpoints.up('sm')]: {
                        display: 'none',
                    },
                },
                page: {
                    [baseTheme.breakpoints.down('sm')]: {
                        display: 'none',
                    },
                },
                ellipsis: {
                    [baseTheme.breakpoints.down('sm')]: {
                        display: 'none',
                    },
                },
            },
        },
    },
});

export default theme;
