import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const tokens = {
  light: {
    mode: 'light',
    primary: '#005a9c',
    secondary: '#1b806a',
    background: '#f4f7fb',
    paper: '#ffffff',
    text: '#17324d',
  },
  dark: {
    mode: 'dark',
    primary: '#6cb3ff',
    secondary: '#63d4b7',
    background: '#091521',
    paper: '#102235',
    text: '#e4eef9',
  },
};

export function useAppTheme() {
  const mode = useSelector((state) => state.ui.themeMode);

  return useMemo(() => {
    const palette = tokens[mode] ?? tokens.light;

    return createTheme({
      palette: {
        mode: palette.mode,
        primary: { main: palette.primary },
        secondary: { main: palette.secondary },
        background: {
          default: palette.background,
          paper: palette.paper,
        },
        text: {
          primary: palette.text,
        },
      },
      shape: {
        borderRadius: 16,
      },
      typography: {
        fontFamily: '"Segoe UI", "Roboto", sans-serif',
        h4: {
          fontWeight: 700,
        },
        h5: {
          fontWeight: 700,
        },
        h6: {
          fontWeight: 600,
        },
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
      },
    });
  }, [mode]);
}
