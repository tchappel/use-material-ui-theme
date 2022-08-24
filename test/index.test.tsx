import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { ThemeProvider } from '../src';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
  },
});

const createTheme = (mode: PaletteMode) =>
  createMuiTheme(getDesignTokens(mode));

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider createTheme={createTheme}>Hello World</ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
