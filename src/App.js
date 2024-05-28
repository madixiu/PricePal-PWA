import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BottomAppBar from './components/BottomAppBar';
import { Box } from '@mui/material';
const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ededed  ',
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
        {/* <CurrencyTable /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        <Box sx={{display: {xs: 'flex', md:'none'},flexDirection:'column'}}>
          <BottomAppBar style={{display: { xs: 'flex', md: 'none' }}} />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
