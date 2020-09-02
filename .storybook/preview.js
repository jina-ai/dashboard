
import React  from "react";
import { ThemeProvider } from 'emotion-theming'
import {theme} from '../src/theme'


export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];