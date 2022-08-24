import * as React from 'react';
import { useMemo, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  ThemeProvider as MuiThemeProvider,
  useTheme as useMuiTheme,
  Theme,
} from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

type PaletteModeContextValue = {
  toggleMode: () => void;
};

const PaletteModeContext = React.createContext<PaletteModeContextValue>({
  toggleMode: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
  createTheme: (mode: PaletteMode) => Theme;
  initialMode?: PaletteMode;
  onModeChange?: (mode?: PaletteMode) => void;
  cssBaseline?: boolean;
};

export const ThemeProvider = ({
  children,
  createTheme,
  initialMode,
  onModeChange,
  cssBaseline = true,
}: ThemeProviderProps) => {
  /** Find out preference for dark mode in operating system, either systemwide, or for a single user agent */
  const defaultMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';
  const [mode, setMode] = useState<PaletteMode>(initialMode || defaultMode);
  const paletteModeContextValue = useMemo(
    () => ({
      toggleMode: () =>
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(mode), [mode]);

  useEffect(() => {
    onModeChange && onModeChange(mode);
  }, [mode]);

  return (
    <PaletteModeContext.Provider value={paletteModeContextValue}>
      <MuiThemeProvider theme={theme}>
        {cssBaseline && <CssBaseline />}
        {children}
      </MuiThemeProvider>
    </PaletteModeContext.Provider>
  );
};

export const useTheme = (): Theme & PaletteModeContextValue => {
  const theme = useMuiTheme();
  const { toggleMode } = React.useContext(PaletteModeContext);
  return {
    ...theme,
    toggleMode,
  };
};
