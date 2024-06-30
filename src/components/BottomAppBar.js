import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpIcon from '@mui/icons-material/Help';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { Typography } from '@mui/material';


const pages = [
  {name: 'خانه',path:'/'},
  {name: 'حواله',path:'/payment'},
  {name: 'سوالات متداول',path:'/faq'},
  {name: 'ارتباط با ما',path:'/contact'},
]

export default function BottomAppBar() {
  const location = useLocation();

  const IconComponent = ({path}) => {
    switch (path) {
      case '/':
        return <HomeIcon />;
      case '/payment':
        return <CurrencyExchangeIcon />;
      case '/faq':
        return <HelpIcon />;
      case '/contact':
        return <AlternateEmailIcon />;
      default:
        return <HomeIcon />;
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed" color="AppBarColor" sx={{ top: 'auto', bottom: 0 }} enableColorOnDark>
        <Toolbar>
          <Box sx={{display:'flex',flex:1,flexDirection:'row', justifyContent:'space-around'}}>
            {pages.map((page) => (
              <Box key={page.path} sx={{display:'flex',flex:1,justifyContent: 'center',}}>
                <NavLink to={page.path} style={{textDecoration:'none'}}>
                <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
                  <IconButton sx={{p:0,color: location.pathname === page.path ? '#000' : 'gainsboro'}} aria-label={page.name}>
                    <IconComponent path={page.path} />
                  </IconButton>
                  {/* <Typography sx={{color: location.pathname === page.path ? '#C7B40A' : 'gainsboro' ,fontSize:'0.6rem',fontFamily:'Vazir'}}>{page.name}</Typography> */}
                </Box>
                </NavLink>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
