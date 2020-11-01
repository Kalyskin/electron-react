import React from 'react';
import { hot } from 'react-hot-loader/root';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Routes from '../Routes';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const Root = () => (
  <RecoilRoot>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </HashRouter>
  </RecoilRoot>
);

export default hot(Root);
