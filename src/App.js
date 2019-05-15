import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";

import './App.css';
import Routes from './routes'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    /*secondary: {
      main: blue[900]
    },*/
    primary: blue,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default App;
