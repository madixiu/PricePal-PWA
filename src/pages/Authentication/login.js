
// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import {Card} from '@mui/material';
// project import
// import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //

export default function Login() {

  return (
    <Grid id="hereis" container direction="column" justifyContent="center" alignItems="center" flex='1' sx={{flex:1 ,flexGrow:1,display:'flex',flexDirection:'column'}}>
          <Grid item>
            <Card
              sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '95%' },borderRadius:3 }}
              variant='outlined'
            >
              <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                      <Typography variant="h5" sx={{fontFamily:'Vazir'}}>ورود</Typography>
                      {/* <Typography component={Link} to="#" variant="body1" sx={{ textDecoration: 'none' }} color="black">
                        Don&apos;t have an account?
                      </Typography> */}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                </Grid>  
              </Box>
            </Card>
          </Grid>
      </Grid>
  );
}
