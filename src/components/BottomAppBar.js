import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';




export default function BottomAppBar() {
  const location = useLocation();


  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Box sx={{display:'flex',flex:1,flexDirection:'row', justifyContent:'space-around'}}>
            <NavLink to={'/'}>
              <IconButton sx={{color: location.pathname === '/' ? '#3e94b3' : 'gray'}} aria-label="Home">
                <HomeIcon />
              </IconButton>
            </NavLink>
            <NavLink to={'/blog'}>
              <IconButton sx={{color: location.pathname === '/blog' ? '#3e94b3' : 'gray'}}>
                <RssFeedIcon />
              </IconButton>
            </NavLink>
            <NavLink to={'/contact'}>
              <IconButton sx={{color: location.pathname === '/contact' ? '#3e94b3' : 'gray'}} >
                <AlternateEmailIcon />
              </IconButton>
            </NavLink>
            <NavLink to={'/about'}>
              <IconButton sx={{color: location.pathname === '/about' ? '#3e94b3' : 'gray'}}>
                <InfoIcon />
              </IconButton>
            </NavLink>            
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
