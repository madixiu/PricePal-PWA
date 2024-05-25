import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar';
import { createTheme,ThemeProvider } from '@mui/material/styles';

import CurrencyTable from './components/CurrencyTable';
const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c3d4e4',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={themeOptions}>
      <div className="App">
        <Appbar />
        <CurrencyTable />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
