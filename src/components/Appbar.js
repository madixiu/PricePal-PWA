import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import  {useAuth}  from '../pages/Authentication/AuthContext';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'

const pages = [
  {name: 'Home',link:''},
  {name: 'Blog',link:'blog'},
  {name: 'About Us',link:'about'},
  {name: 'Contact',link:'contact'},
]
const bundleImages = {
  usd: require("../assets/flags/flag64/usd.png"),
  irr: require("../assets/flags/flag64/irr.png"),
};
const getImageUrl = (code) => bundleImages[code];

function Appbar({isAuthenticated}) {
  // console.log(window.matchMedia('(display-mode: standalone)').matches);
  const { t, i18n } = useTranslation('translation');
  function LanguageSwitcher(lng) {
    if (lng == null)
    i18n.changeLanguage(i18n.dir() === 'rtl'? 'en' : 'fa');
  else if(lng === 'fa')
    i18n.changeLanguage('fa');
  else if(lng === 'en')
    i18n.changeLanguage('en');

  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user')
  };
  



const LogoutButton = () => {
  const [showButton, setShowButton] = React.useState(false);
  React.useEffect(() => {
    if (isAuthenticated) {
      setShowButton(true);
    }
  }, []);

  if (showButton) {
    return (
      <>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center',alignItems:'center' }}>
          <NavLink key={'dashboard'} to={'/dashboard'} style={{textDecoration:'none'}}> 
            <Button variant="outlined" color='AppBarButtonColor' size='small' sx={{marginInlineEnd:1,borderRadius:2,fontSize:'0.5rem'}}>{t('AppBar.buttons.Dashboard')}</Button>
          </NavLink>
          <Button variant="outlined" color='AppBarButtonColor' size='small' onClick={()=> handleLogout()} sx={{borderRadius:2,fontSize:'0.5rem'}}>{t('AppBar.buttons.Logout')}</Button>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center',alignItems:'center', marginInlineEnd: 5 }}>
          <NavLink key={'dashboard'} to={'/dashboard'} style={{textDecoration:'none'}}> 
            <Button variant="outlined" color='AppBarButtonColor'  sx={{marginInlineEnd:1,borderRadius:2}}>{t('AppBar.buttons.Dashboard')}</Button>
          </NavLink>
          <Button variant="outlined" color='AppBarButtonColor' onClick={()=> handleLogout()} sx={{borderRadius:2}}>{t('AppBar.buttons.Logout')}</Button>
        </Box>
      </>
      
    );
  }

  return null;
};

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RIMA FINANCE
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            > 
              <MenuItem onClick={()=>{handleCloseNavMenu();LanguageSwitcher('en')}} sx={{justifyContent: 'flex-start',alignContent:'center'}} >
                  <img src={getImageUrl('usd')} alt="en" width="15" style={{marginInlineEnd:'5px'}} />
                  <Typography sx={{fontSize:10}}>English</Typography>
              </MenuItem>
              <MenuItem onClick={()=>{handleCloseNavMenu();LanguageSwitcher('fa')}} sx={{justifyContent: 'flex-start',alignContent:'center',py:0}}>
                <img src={getImageUrl('irr')} alt="en" width="15" style={{marginInlineEnd:'5px'}}/>
                <Typography sx={{fontSize:10}}>فارسی</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },justifyContent: 'center',marginInlineEnd:5 }}>

            <AdbIcon sx={{display: { xs: 'flex', md: 'none' },justifyContent: 'center',alignSelf: 'center'}} />
            <Typography
              variant="h5"
              // noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignSelf:'center',
                fontSize:'1rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              RIMA FINANCE
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1,justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' },px:10 }}>
            {pages.map((page) => (
              <NavLink key={page.link} to={`/${page.link}`} style={{textDecoration:'none'}}> 
                <Button 
                  variant="outlined"
                  color='AppBarButtonColor'
                  size="medium"
                  // fullWidth="true"
                  onClick={handleCloseNavMenu}
                  sx={{ mx:1, color: '#555',minWidth:101,borderRadius:2,'&:hover':{color:'#000'}}}
                >
                  {t('AppBar.buttons.'+page.name)}
                </Button>
              </NavLink>
            ))}
          </Box>
          <LogoutButton />
            <Box sx={{display:{xs:'none',md:'flex'},flexDirection:'column',alignItems:'center',direction:'ltr'}}>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="outlined" color='AppBarButtonColor' {...bindTrigger(popupState)}>
                      <img src={getImageUrl(document.body.dir === 'ltr' ? 'usd' : 'irr')} alt="en" width="20" style={{marginInlineEnd:'5px'}} />
                      
                      {t('langBTN')}
                    </Button>
                    <Menu {...bindMenu(popupState)} style={{direction:'ltr'}}>
                      <MenuItem onClick={()=>{popupState.close();LanguageSwitcher('en')}} sx={{justifyContent: 'flex-start',}} >
                        {/* <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',px:1,justifyContent: 'space-between',}}> */}
                          <img src={getImageUrl('usd')} alt="en" width="20" style={{marginInlineEnd:'5px'}} />
                          <span>English</span>
                        {/* </Box> */}
                      </MenuItem>
                      <MenuItem onClick={()=>{popupState.close(); LanguageSwitcher('fa')}} sx={{justifyContent: 'flex-start',}}>
                        <img src={getImageUrl('irr')} alt="en" width="20" style={{marginInlineEnd:'5px'}}/>
                        <span>فارسی</span>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Appbar;
