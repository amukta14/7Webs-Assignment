import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00B8D9', // vibrant teal
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF6F61', // lively coral
      contrastText: '#fff',
    },
    info: {
      main: '#7C4DFF', // electric purple
    },
    success: {
      main: '#43E97B', // bright green
    },
    warning: {
      main: '#FFB300', // vivid yellow
    },
    background: {
      default: '#FDEB71', // fallback for browsers that don't support gradients
      paper: '#fff',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Poppins, Quicksand, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: 1,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #FDEB71 0%, #F8D800 50%, #A1C4FD 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 2px 8px 0 rgba(0,184,217,0.08)',
          transition: 'all 0.2s',
          ':hover': {
            boxShadow: '0 4px 16px 0 rgba(255,111,97,0.15)',
            transform: 'translateY(-2px) scale(1.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 4px 24px 0 rgba(124,77,255,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme; 