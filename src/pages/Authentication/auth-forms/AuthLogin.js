import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
// import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../AuthContext';
// project import

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin() {
  const { t } = useTranslation('translation');

  const {  handleLogin } = useAuth();

  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
 
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  
  const handleSubmits = (username,password) => {
    handleLogin(username,password,checked);
  };
  

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required(t('Login.Error.RequiredUsername'))
          .test('username-validation', t('Login.Error.IncorrectUsername'), function (value) {
            if (value === process.env.REACT_APP_ADMIN_USERNAME)
            return true; // Return true if the password is correct, false otherwise
            else
            return false;
          }),
          password: Yup.string().max(255).required(t('Login.Error.RequiredPassword'))
          .test('password-validation', t('Login.Error.IncorrectPassword'), function (value) {
            if (value === process.env.REACT_APP_ADMIN_PASSWORD)
            return true; // Return true if the password is correct, false otherwise
            else
            return false;
          }),
        })}
        onSubmit={(values, actions ) => {
      
            handleSubmits(values.username, values.password);
            actions.setSubmitting(false);
            
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">{t('Login.Username')}</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="email"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t('Login.placeholder.Username')}
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                </Stack>
                {touched.username && errors.username && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.username}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">{t('Login.Password')}</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="gray"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder={t('Login.placeholder.Password')}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="AppBarButtonColor"
                        size="small"
                        sx={{color: 'gray'}}
                      />
                    }
                    label={<Typography variant="body1">{t('Login.Remember')}</Typography>}
                  />
            
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary" 
                    >
                    {t('Login.Login')}
                  </Button>
              </Grid>           
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

