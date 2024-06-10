import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { login,logout } from '../../redux/authSlice';

const useAuth = (
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const handleLogin = (username, password,KeepSignedIn) => {
    // Validate user and password, then dispatch the login action
    
    dispatch(login({ username, password }));

    if(KeepSignedIn){
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify({ username: username, password: password }), process.env.REACT_APP_PRIVATE_KEY).toString();

      localStorage.setItem('user', ciphertext);
    }
   

    navigate('/dashboard', { replace: true }); // Redirect to the dashboard page
};

const setLogin = () => {
  dispatch(setLogin());
};
const handleLogout = () => {
  dispatch(logout());
    localStorage.removeItem('user')
  };

  return { handleLogin, handleLogout,setLogin };
};


export { useAuth };
