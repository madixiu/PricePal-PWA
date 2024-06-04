import {  Navigate } from 'react-router-dom';
import React from'react';

const PrivateRoute = ({isAuthenticated,children}) => {
  // const {  handleLogin } = useAuth();
  console.log('PrivateRoute component rendered');
  const [isAuthorized, setAuthorized] = React.useState(isAuthenticated);
  console.log('isAuthenticated',isAuthenticated);;
  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    // const token = localStorage.getItem('token');
    if (storedUser) {
      // Perform silent login using the stored user data and token
      setAuthorized(true); // Assuming isAuthenticated is a function that sets authentication state
    }
  }, [isAuthorized]);

if (!isAuthorized) {
  console.log("here");
    return <Navigate to="/login" replace />; // Redirect to login page
}
else
  // return <Navigate to='/dashboard' replace />; // Redirect to dashboard page

  return children; // Render the protected component if logged in
};

export default PrivateRoute;