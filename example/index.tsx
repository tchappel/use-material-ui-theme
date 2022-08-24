import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PaletteMode } from '@mui/material';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, useTheme } from '../.';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
  },
});

const createTheme = (mode: PaletteMode) =>
  createMuiTheme(getDesignTokens(mode));

const TogglePaletteModeButton = () => {
  const theme = useTheme();
  console.log({ theme });
  const {
    toggleMode,
    palette: { mode },
  } = theme;
  return (
    <>
      {mode} mode
      <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider createTheme={createTheme}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <TogglePaletteModeButton />
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
