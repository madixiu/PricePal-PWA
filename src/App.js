import React from 'react';
import './App.css';
import Appbar from './components/Appbar';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BottomAppBar from './components/BottomAppBar';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/Authentication/PrivateRoute';
import Login from './pages/Authentication/login';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import {setAuthenticated} from './redux/authSlice'
import { useSelector } from 'react-redux';
// import { useAuth } from './pages/Authentication/AuthContext'
const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ededed  ',
    },
    secondary: {
      main: '#f50057',
    },
    AppBarButtonColor:{
      main: '#777',
    },
    ContactPage:{
      text:{
        main:"#333"
      },
      icon:{
        default:"#666"
      }
    }

  
  },
});


function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const { isAuthenticated } = useSelector((state) => state.auth);
 
  return (
  
      <ThemeProvider theme={themeOptions}>
          <Appbar isAuthenticated={isAuthenticated}/>
          <Grid container sx={{ display: 'flex', flexDirection: 'column',height: '90vh' }}>
            {/* <CurrencyTable /> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
              </Routes>
          </Grid>
          <Box sx={{display: {xs: 'flex', md:'none'},flexDirection:'column'}}>
            <BottomAppBar style={{display: { xs: 'flex', md: 'none' }}} />
          </Box>
      </ThemeProvider>

  );
}

export default App;
