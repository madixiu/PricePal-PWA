import React from 'react';
import { Card, Grid,Box,Typography,TextField, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingSpinner from '../LoadingSpinner'
function DashboardPanel({ExcessData}) {
  const items = [{slug: "try", name: 'لیر',code:'TRYIRR'},{slug: "usd", name: 'دلار',code:'USDIRR'},{slug: "eur", name: 'یورو',code:'EURIRR'},  {slug: "gbp", name: 'پوند',code:'GBPIRR'},{slug: "cad", name: 'دلار کانادا',code:'CADIRR'},{slug: "aud", name: 'دلار استرالیا',code:'AUDIRR'}];
  const fontStyle = {
    fontFamily:'Vazir'
  }
  const [openSnack,setOpenSnack] = React.useState(false);
  const [successfulSubmit,setSuccessfulSubmit] = React.useState(false);
  const [loading,setLoading] = React.useState(true)
  const [ExcessValue,setExcessValue] = React.useState({});

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


  React.useEffect(() => {
      if(Object.keys(ExcessValue).length === 0){
        setExcessValue(JSON.parse(JSON.stringify(ExcessData)));
        setLoading(false)
      }
  },[ExcessData,ExcessValue]);


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
        if (responseData.message === 'Excess updated successfully'){
          setSuccessfulSubmit(true);
          setOpenSnack(true);
          // ExcessData = ExcessValue
        }
        
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
    try {
      await postData(`${process.env.REACT_APP_BASE_URL}update_excess`,  transformedData )
          
       
  } catch (error) {
      console.error('Error fetching data:', error);
  } finally {
      setLoading(false);
  }
  }
  const bundleImages = {
    usd: require("../../assets/flags/flag128/usd.png"),
    eur: require("../../assets/flags/flag128/eur.png"),
    gbp: require("../../assets/flags/flag128/gbp.png"),
    cad: require("../../assets/flags/flag128/cad.png"),
    aud: require("../../assets/flags/flag128/aud.png"),
    try: require("../../assets/flags/flag128/try.png")
  };
  const getImageUrl = (code) => bundleImages[code];
  if (loading)
    return <LoadingSpinner />
  else
  return ( 
    <Grid id="dashboard-grid" justifyContent= 'center' alignContent={'center'} container sx={{p:1,justifyContent: 'center',flex:1}}>
      <Box sx={{justifyContent: 'center',flexDirection:'column', display:{xs:'none',md:'flex',width:'50%'}}} >
        <Card variant='elevation' elevation={0} sx={{flex:1,backgroundColor:'#efefef',borderRadius:2,flexDirection:'column',p:1}}>        


          {items.map((item) => (
            <Card key={item.code} variant='elevation' elevation={0} sx={{ marginBottom:1,borderRadius:2,width:'100%',py:2,px:1,backgroundColor: 'rgba(255, 255, 255, 0.9)',border: '1px solid rgba(209, 213, 219, 0.8)'}}>
              <Box sx={{display:'flex',flex:1 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Box sx={{display:'flex',justifyContent:'flex-start',alignItems:'center',flex:1}}>
                  <img src={getImageUrl(item.slug)} alt="en" width="35" style={{marginInlineEnd:'5px'}} />
                  <Typography variant='h7' sx={fontStyle}>{item.name}</Typography>
                </Box>
                  <Box sx={{direction:'ltr',flex:2,justifyContent: 'center',alignItems:'center',display:'flex'}}>
                  <TextField
                    id="outlined-number"
                    size='small'
                    label={'خرید'}
                    type="number"
                    color='success'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={ExcessValue[item.code].buy}
                    onChange={(event) => {
                      setValue(event.target.value,item.code,"buy");
                    }}
                  />
                </Box>
                <Box sx={{direction:'ltr',flex:2,justifyContent: 'center',alignItems:'center',display:'flex'}}>
                  <TextField
                    id="outlined-number"
                    size='small'
                    label={'فروش'}
                    type="number"
                    color='error'
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
            </Card>
          ))}


          <Box sx={{justifyContent:'center',alignItems:'center',display:'flex'}}>
            <Button variant="outlined" color='DashboardButtonColor' size='large' sx={[{borderRadius:2,minWidth:120,mx:4},fontStyle]} onClick={handleSubmit}>تائید</Button>
            <Button variant="outlined" color='DashboardButtonColor' size='large' sx={[{borderRadius:2,minWidth:120,mx:4},fontStyle]} onClick={handleReset}>تنظیم مجدد</Button>
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
          <Typography sx={[{px:2},fontStyle]} variant='body3'>
              {successfulSubmit ? 'ثبت شد' : 'خطا'}
          </Typography>
        </Alert>
      </Snackbar>
    </Grid>
);
}

export default DashboardPanel;