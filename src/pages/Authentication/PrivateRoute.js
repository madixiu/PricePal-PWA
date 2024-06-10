import {  Navigate } from 'react-router-dom';
import React from'react';
import CryptoJS from 'crypto-js';
const PrivateRoute = ({isAuthenticated,children}) => {
  // const {  handleLogin } = useAuth();
  // console.log('PrivateRoute component rendered');
  const [isAuthorized, setAuthorized] = React.useState(isAuthenticated);
  // console.log('isAuthenticated',isAuthenticated);;
  React.useEffect(() => {

    // const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // Perform silent login using the stored user data and token
      var bytes  = CryptoJS.AES.decrypt(storedUser, process.env.REACT_APP_PRIVATE_KEY);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      let user = JSON.parse(originalText);
      if (user.username === process.env.REACT_APP_ADMIN_USERNAME && user.password === process.env.REACT_APP_ADMIN_PASSWORD) {
        // console.log('user',user);
        // handleLogin(user.username, user.password,true);
        setAuthorized(true);
      }
      // setAuthorized(true); // Assuming isAuthenticated is a function that sets authentication state
    }
  }, [isAuthorized]);

if (!isAuthenticated && !isAuthorized) {
    return <Navigate to="/login" replace />; // Redirect to login page
}
else
  // return <Navigate to='/dashboard' replace />; // Redirect to dashboard page

  return children; // Render the protected component if logged in
};

export default PrivateRoute;