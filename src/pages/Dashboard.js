import React from 'react';
import { Card, Grid,Box,Typography,TextField, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation('translation');
  const [openSnack,setOpenSnack] = React.useState(false);
  const [successfulSubmit,setSuccessfulSubmit] = React.useState(false);
  const [loading,setLoading] = React.useState(true)
  const [ExcessValue,setExcessValue] = React.useState(
    {
      "EURIRR": {
          "code": "EURIRR",
          "buy": 0,
          "sell": 0
      },
      "USDIRR": {
          "code": "USDIRR",
          "buy": 0,
          "sell": 0
      }
  }
  );
  const handleClose = ( reason) => {
    // console.log(event);
    // event.preventDefault();
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  function setValue(val,cas){
    // console.log(val,cas);
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
    // console.log(res);
    setExcessValue(res);
  }


  React.useEffect(() => {
    if (ExcessValue.USDIRR.buy === 0)
    getData();

    // console.log(ExcessValue);
  },[ExcessValue]);

  async function getData() {
   const response =  await fetch('http://localhost:8000/excess');
   const data = await response.json();
   setExcessValue(data);
   setLoading(false);
  //  console.log(data);
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
        setOpenSnack(true);
        console.log(responseData.message);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

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
    console.log(transformedData);
    try {
      await postData('http://localhost:8000/update_excess',  transformedData )
          
       
  } catch (error) {
      console.error('Error fetching data:', error);
  } finally {
      setLoading(false);
  }
  }
  const bundleImages = {
    usd: require("../assets/flags/flag128/usd.png"),
    eur: require("../assets/flags/flag128/eur.png"),
  };
  const getImageUrl = (code) => bundleImages[code];
  return ( 
    <Grid id="test" justifyContent= 'center' alignContent={'center'} container sx={{p:4,justifyContent: 'center',flex:1}} >
      <Box sx={{justifyContent: 'center',flexDirection:'column'}} >
        <Card variant='outlined' sx={{flex:1,backgroundColor:'#ffffff',py:10,px:15,borderRadius:2}}>
        {loading ? <p>Loading...</p> : 
          <Card variant='outlined' sx={{ py:10 ,px:2,marginBottom:2,borderRadius:2}}>
              <Box sx={{display:'flex',flex:1 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>

                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',px:1}}>
                  <img src={getImageUrl('usd')} alt="en" width="50" style={{marginInlineEnd:'5px'}} />
                  <Typography variant='h6'>{t('Dashboard.USD')}</Typography>
                </Box>
                <Box sx={{px:1}}>
                  <TextField
                    id="outlined-number"
                    label={t('Dashboard.Buy')}
                    type="number"
                    color='success'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={ExcessValue.USDIRR.buy}
                    onChange={(event) => {
                      setValue(event.target.value,"USDIRR.buy");
                    }}
                  />
                </Box>
                <Box sx={{px:1}}>
                  <TextField
                    id="outlined-number"
                    label={t('Dashboard.Sell')}
                    type="number"
                    color='error'
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
          </Card>
}

          <Card variant='outlined' sx={{ py:10,px:2 ,marginBottom:5,borderRadius:2}}>
            <Box sx={{display:'flex',flex:1 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <img src={getImageUrl('eur')} alt="en" width="50" style={{marginInlineEnd:'5px'}} />
                  <Typography variant='h6'>{t('Dashboard.EUR')}</Typography>
              </Box>
              {loading ? <p>Loading...</p> :
              <>
              <Box>
                <TextField
                  id="outlined-number"
                  label={t('Dashboard.Buy')}
                  type="number"
                  color='success'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={ExcessValue.EURIRR.buy}
                  onChange={(event) => {
                    setValue(event.target.value,"EURIRR.buy");
                  }}
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-number"
                  label={t('Dashboard.Sell')}
                  type="number"
                  color='error'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={ExcessValue.EURIRR.sell}
                  onChange={(event) => {
                    setValue(event.target.value,"EURIRR.sell");
                  }}
                />
              </Box>
                    </>
              }
            </Box>
          </Card>
          <Box sx={{justifyContent:'center',alignItems:'center',display:'flex'}}>
            <Button disableElevation variant="outlined" color='DashboardButtonColor' size='large'  sx={{borderRadius:2,minWidth:120,mx:4}} onClick={handleSubmit}>{t('Dashboard.Submit')}</Button>
            <Button variant="outlined" color='DashboardButtonColor' size='large' disabled sx={{borderRadius:2,minWidth:120,mx:4}}>{t('Dashboard.Reset')}</Button>
          </Box>
        </Card>
      </Box>
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={successfulSubmit?'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          <Typography sx={{px:2}} variant='body3'>
              {successfulSubmit ? t('Dashboard.snack.Done') : t('Dashboard.snack.Failed')}
          </Typography>
        </Alert>
      </Snackbar>
    </Grid>
);
}

export default Dashboard;