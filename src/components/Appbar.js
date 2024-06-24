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
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const pages = [
  {name: 'خانه',link:''},
  {name: 'حواله جات ارزی',link:'payment'},
  {name: 'سوالات متداول',link:'faq'},
  {name: 'ارتباط با ما',link:'contact'},
  {name: 'ماشین حساب',link:'calculator'},
]


function Appbar({isAuthenticated}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user')
    // setShowButton(false);
    navigate('/', { replace: true }); // Redirect to the dashboard page
  };
  const handleDashboard = () => {
    navigate('/dashboard', { replace: true }); // Redirect to the dashboard page
  };

  // const [showButton, setShowButton] = React.useState(false);
  // React.useEffect(() => {
  //   if (isAuthenticated) {
  //     setShowButton(true);
  //   }
  // }, [isAuthenticated]);

const LogoutButton = () => {


  if (isAuthenticated) {
    return (
      <>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center',alignItems:'center' }}>
          <NavLink key={'dashboard'} to={'/dashboard'} style={{textDecoration:'none'}}> 
            <Button variant="outlined" color='AppBarButtonColor' size='medium'  sx={{marginInlineEnd:1,borderRadius:2,color: '#555','&:hover':{color:'#000'}}}>
              <DashboardIcon sx={{marginInlineEnd:1,fontSize:'1rem'}}/>
              <Typography sx={{fontFamily:'Vazir',fontSize:'0.8rem'}}>داشبورد</Typography>
            </Button>
          </NavLink>
          <Button variant="outlined" color='AppBarButtonColor' size='medium' onClick={()=> handleLogout()} sx={{borderRadius:2,color: '#555','&:hover':{color:'#000'}}}>
            <LogoutIcon sx={{marginInlineEnd:1,fontSize:'1rem'}}/>
            <Typography sx={{fontFamily:'Vazir',fontSize:'0.8rem'}}>خروج</Typography>
          </Button>
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

          <Box sx={{ display: { xs: isAuthenticated ? 'flex' : 'none', md: 'none' } }}>
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
              <MenuItem onClick={()=>{handleCloseNavMenu();handleDashboard();}} sx={{justifyContent: 'flex-start',alignContent:'center'}} >
                  <Typography sx={{fontSize:10,fontFamily:'Vazir'}}>داشبورد</Typography>
              </MenuItem>
              <MenuItem onClick={()=>{handleCloseNavMenu();handleLogout();}} sx={{justifyContent: 'flex-start',alignContent:'center',py:0}}>
                <Typography sx={{fontSize:10,fontFamily:'Vazir'}}>خروج</Typography>
              </MenuItem>
            </Menu>
        </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },justifyContent: 'center',marginInlineEnd:isAuthenticated ? 5: 0 }}>

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
          
          <Box sx={{ flexGrow: 1,justifyContent: 'flex-start', display: { xs: 'none', md: 'flex' },px:2}}>
            {pages.map((page) => (
              <NavLink key={page.link} to={`/${page.link}`} style={{textDecoration:'none'}}> 
                <Button 
                  variant="outlined"
                  color='AppBarButtonColor'
                  size="medium"
                  // fullWidth="true"
                  onClick={handleCloseNavMenu}
                  sx={{ mx:1, color: '#555',minWidth:101,borderRadius:2,'&:hover':{color:'#000'},fontFamily:'Vazir'}}
                >
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>
          <LogoutButton />           
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Appbar;
