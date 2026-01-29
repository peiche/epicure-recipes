import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tomato: Palette['primary'];
    basil: Palette['primary'];
    golden: Palette['primary'];
    wood: Palette['primary'];
  }
  interface PaletteOptions {
    tomato?: PaletteOptions['primary'];
    basil?: PaletteOptions['primary'];
    golden?: PaletteOptions['primary'];
    wood?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tomato: true;
    basil: true;
    golden: true;
    wood: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    tomato: true;
    basil: true;
    golden: true;
    wood: true;
  }
}

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F97316',
      light: '#FB923C',
      dark: '#EA580C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#16A34A',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#22C55E',
    },
    background: {
      default: '#FDFBF9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D2319',
      secondary: '#6B5B4F',
    },
    tomato: {
      main: '#EF5350',
      light: '#FF7961',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    basil: {
      main: '#43A047',
      light: '#76D275',
      dark: '#2E7D32',
      contrastText: '#FFFFFF',
    },
    golden: {
      main: '#FFB300',
      light: '#FFE54C',
      dark: '#FF8F00',
      contrastText: '#2D2319',
    },
    wood: {
      main: '#5D4037',
      light: '#8B6B61',
      dark: '#3E2723',
      contrastText: '#FFFFFF',
    },
    divider: 'rgba(45, 35, 25, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 14px -3px rgba(249, 115, 22, 0.4)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px -4px rgba(45, 35, 25, 0.1)',
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 32px -8px rgba(45, 35, 25, 0.2)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '9999px',
        },
        colorPrimary: {
          background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        },
        colorSecondary: {
          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(253, 251, 249, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(45, 35, 25, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#F97316',
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#FFB300',
        },
        iconEmpty: {
          color: 'rgba(45, 35, 25, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 16px 16px 0',
        },
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme);

export default theme;
