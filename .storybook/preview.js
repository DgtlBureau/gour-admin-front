import React from 'react';

import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import { ThemeProvider } from '@mui/material';

import { defaultTheme } from '../src/themes';

('use strict');

const MUITheme = (Story, context) => {
  return (
    <EmotionThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Story {...context} />
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [MUITheme];
