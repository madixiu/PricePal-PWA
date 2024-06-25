import React from 'react';
import './index.css'
import Appbar from './components/Appbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Faq from './pages/Faq';
import PaymentOrder from './pages/PaymentOrder';
import Contact from './pages/Contact';
import BottomAppBar from './components/BottomAppBar';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/Authentication/PrivateRoute';
import Login from './pages/Authentication/login';
import { Box } from '@mui/material';
import {setAuthenticated} from './redux/authSlice'
import { useSelector,useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';
//! *******************TEMPORARY*******************************
// import Calculator from './pages/Calculator';
//! ***********************************************************



function App() {
// //   console.log(process.env.REACT_APP_BASE_URL);
// //   // console.log(window.matchMedia('(display-mode: standalone)').matches);
//   const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
//   const isMinimal = window.matchMedia('(display-mode: minimal-ui)').matches;
//   const isBrowser = window.matchMedia('(display-mode: browser)').matches;
// if (isStandalone) {
//   alert('Display type: Standalone');
// } else if (isMinimal) {
//   alert('Display type: Minimal UI');
// } else if (isBrowser){
//   alert('Display type: Browser');
// }

  const dispatch = useDispatch();
  React.useEffect(() => {
    var user = localStorage.getItem('user');
    if (user) {
      try {
        var bytes  = CryptoJS.AES.decrypt(user, process.env.REACT_APP_PRIVATE_KEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        user = JSON.parse(originalText);
        if (user.username === process.env.REACT_APP_ADMIN_USERNAME && user.password === process.env.REACT_APP_ADMIN_PASSWORD) 
        dispatch(setAuthenticated(true));
        
      } catch (error) {
        localStorage.removeItem('user');
        return
      }
    }
  }, [dispatch])
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <Appbar isAuthenticated={isAuthenticated} />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '90vh',gap: 0}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/payment" element={<PaymentOrder />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/calculator" element={<Calculator />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
        </Routes>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
        <BottomAppBar style={{ display: { xs: 'flex', md: 'none' } }} />
      </Box>
    </>
  );
}

export default App;
