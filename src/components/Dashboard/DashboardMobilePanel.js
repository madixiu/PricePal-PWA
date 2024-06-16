import React from 'react';
import { Box,Grid,Card,Typography,TextField,Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../LoadingSpinner'

function DashboardMobile({ExcessData}) {
  const { t } = useTranslation('translation');
  const fontStyle = {fontFamily: document.body.dir === "ltr" ? 'Roboto' : 'Vazir'}
  const [openSnack,setOpenSnack] = React.useState(false);
  const [successfulSubmit,setSuccessfulSubmit] = React.useState(false);
  const [loading,setLoading] = React.useState(true)
  const [ExcessValue,setExcessValue] = React.useState({});


  React.useEffect(() => {
      if(Object.keys(ExcessValue).length === 0){
        setExcessValue(JSON.parse(JSON.stringify(ExcessData)));

        setLoading(false)
      }
  },[ExcessData,ExcessValue]);


  const handleClose = ( reason ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  const handleReset = () => {

    // setExcessValue(ExcessData);
    setExcessValue(JSON.parse(JSON.stringify(ExcessData)));
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    
    const transformedData = Object.entries(ExcessValue).flatMap(([code, values]) => {
      return [
        {
          code,
          type: 'sell',
          value: parseFloat(values.sell)
        },
        {
          code,
          type: 'buy',
          value: parseFloat(values.buy)
        }
      ];
    });
    try {
      await postData(`${process.env.REACT_APP_BASE_URL}update_excess`,  transformedData )
          
       
  } catch (error) {
      console.error('Error fetching data:', error);
  } finally {
      setLoading(false);
  }
  }
  function setValue(val,cas){
    let res = ExcessValue
    switch (cas) {
      case "EURIRR.sell":
        res.EURIRR.sell = val;
        break;
      case "EURIRR.buy":
        res.EURIRR.buy = val;
        break;
      case "USDIRR.sell":
        res.USDIRR.sell = val;
        break;
      case "USDIRR.buy":
        res.USDIRR.buy = val;
        break;
      default:
        break;
    }
    setExcessValue(res);
  }
  const postData = async (url, dataToPost) => {
    setLoading(true);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToPost),
        });

        const responseData = await response.json();
        setSuccessfulSubmit(true);
        if (responseData.message === 'Excess updated successfully')
        setOpenSnack(true);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};
  const bundleImages = {
    usd: require("../../assets/flags/flag64/usd.png"),
    eur: require("../../assets/flags/flag64/eur.png"),
  };

  const getImageUrl = (code) => bundleImages[code];

if(loading)
  return <LoadingSpinner />
else

  return ( 
    <Grid container sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flex:1,p:1}}>
      <Card>
        <Box sx={{display:'flex',flex:1 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',px:1}}>
            <img src={getImageUrl('usd')} alt="en" width="20" style={{marginInlineEnd:'5px'}} />
            <Typography variant='h6' sx={[{fontSize:'0.9rem'},fontStyle]}>{t('Dashboard.USD')}</Typography>
          </Box>
          <Box sx={{px:1,py:2,justifyContent: 'center',display:'flex' ,flexDirection:'column'}}>
            <Box sx={{py:2,direction:'ltr'}}>
              <TextField
                id="outlined-number"
                label={t('Dashboard.Buy')}
                type="number"
                color='success'
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={ExcessValue.USDIRR.buy}
                onChange={(event) => {
                  setValue(event.target.value,"USDIRR.buy");
                }}
              />
            </Box>

            <Box sx={{py:2,direction:'ltr'}}>
              <TextField
                id="outlined-number"
                label={t('Dashboard.Sell')}
                type="number"
                color='error'
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={ExcessValue.USDIRR.sell}
                onChange={(event) => {
                  setValue(event.target.value,"USDIRR.sell");
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
      <Card sx={{my:1}}>
        <Box sx={{display:'flex',flex:1 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',px:1}}>
            <img src={getImageUrl('eur')} alt="en" width="20" style={{marginInlineEnd:'5px'}} />
            <Typography variant='h6' sx={[{fontSize:'0.9rem'},fontStyle]}>{t('Dashboard.EUR')}</Typography>
          </Box>
          <Box sx={{px:1,py:2,justifyContent: 'center',display:'flex',flexDirection:'column'}}>
            <Box sx={{py:2,direction:'ltr'}}>
              <TextField
                id="outlined-number"
                label={t('Dashboard.Buy')}
                type="number"
                color='success'
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={ExcessValue.EURIRR.buy}
                onChange={(event) => {
                  setValue(event.target.value,"EURIRR.buy");
                }}
              />
            </Box>

            <Box sx={{py:2,direction:'ltr'}}>
              <TextField
                id="outlined-number"
                label={t('Dashboard.Sell')}
                type="number"
                color='error'
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={ExcessValue.EURIRR.sell}
                onChange={(event) => {
                  setValue(event.target.value,"EURIRR.sell");
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
      <Box sx={{justifyContent:'space-evenly',alignItems:'center',display:'flex',my:1}}>
            <Button variant="contained"  size='samll' sx={[{borderRadius:2,minWidth:100},fontStyle]} onClick={handleSubmit}>{t('Dashboard.Submit')}</Button>
            <Button variant="contained"  size='samll' sx={[{borderRadius:2,minWidth:100},fontStyle]} onClick={handleReset}>{t('Dashboard.Reset')}</Button>
      </Box>
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={successfulSubmit?'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          <Typography sx={[{px:2},fontStyle]} variant='body3'>
              {successfulSubmit ? t('Dashboard.snack.Done') : t('Dashboard.snack.Failed')}
          </Typography>
        </Alert>
      </Snackbar>
    </Grid>
   );
}

export default DashboardMobile;