import React from 'react';
import { Box,Grid,Card,Typography,TextField,Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingSpinner from '../LoadingSpinner'

function DashboardMobile({ExcessData}) {
  const items = [{slug: "try", name: 'لیر',code:'TRYIRR'},{slug: "usd", name: 'دلار',code:'USDIRR'},{slug: "eur", name: 'یورو',code:'EURIRR'},  {slug: "gbp", name: 'پوند',code:'GBPIRR'},{slug: "cad", name: 'دلار کانادا',code:'CADIRR'},{slug: "aud", name: 'دلار استرالیا',code:'AUDIRR'}];
  const fontStyle = {fontFamily: 'Vazir'}
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
  function setValue(val,cas,typ){
    let res = ExcessValue
    switch (typ) {
      case "sell":
        res[cas].sell = val;
        break;
      case "buy":
        res[cas].buy = val;
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
    gbp: require("../../assets/flags/flag64/gbp.png"),
    cad: require("../../assets/flags/flag64/cad.png"),
    aud: require("../../assets/flags/flag64/aud.png"),
    try: require("../../assets/flags/flag64/try.png")
  };

  const getImageUrl = (code) => bundleImages[code];

if(loading)
  return <LoadingSpinner />
else

  return ( 
    <Grid container sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flex:1,p:1}}>
      {items.map((item) => 
          <Card sx={{my:0.5}} variant='outlined'>
            <Box sx={{display:'flex',flex:1 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',px:1}}>
                <img src={getImageUrl(item.slug)} alt="en" width="20" style={{marginInlineEnd:'5px'}} />
                <Typography variant='h6' sx={[{fontSize:'0.9rem'},fontStyle]}>{item.name}</Typography>
              </Box>
              <Box sx={{px:1,py:2,justifyContent: 'center',display:'flex' ,flexDirection:'column'}}>
                <Box sx={{py:2,direction:'ltr'}}>
                  <TextField
                    id="outlined-number"
                    label={'خرید'}
                    type="number"
                    color='success'
                    size='small'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={ExcessValue[item.code].buy}
                    onChange={(event) => {
                      setValue(event.target.value,item.code,"buy");
                    }}
                  />
                </Box>
                <Box sx={{py:2,direction:'ltr'}}>
                  <TextField
                    id="outlined-number"
                    label={'فروش'}
                    type="number"
                    color='error'
                    size='small'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={ExcessValue[item.code].sell}
                    onChange={(event) => {
                      setValue(event.target.value,item.code,"sell");
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Card>
      )}
      <Box sx={{justifyContent:'space-evenly',alignItems:'center',display:'flex',my:1,mb:10}}>
            <Button variant="outlined" color='DashboardButtonColor' size='samll' sx={[{borderRadius:2,minWidth:100},fontStyle]} onClick={handleSubmit}>تائید</Button>
            <Button variant="outlined" color='DashboardButtonColor' size='samll' sx={[{borderRadius:2,minWidth:100},fontStyle]} onClick={handleReset}>تنظیم مجدد</Button>
      </Box>
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={successfulSubmit?'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          <Typography sx={[{px:2},fontStyle]} variant='body3'>
              {successfulSubmit ? 'ثبت شد' :'خطا'}
          </Typography>
        </Alert>
      </Snackbar>
    </Grid>
   );
}

export default DashboardMobile;