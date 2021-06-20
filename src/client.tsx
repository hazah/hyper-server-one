import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import App from './App';

import theme from 'theme';

hydrate(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
  () => {
    const fontStyles = document.querySelector('#font-server-side');
    if (fontStyles) {
      fontStyles.parentElement.removeChild(fontStyles);
    }
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }
);

if (module.hot) {
  module.hot.accept();
}
