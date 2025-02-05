import { createTheme } from "@mui/material";

const theme = createTheme({
    colorSchemes: {
        light: true,
        dark: true,
    },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
});

export default theme;
