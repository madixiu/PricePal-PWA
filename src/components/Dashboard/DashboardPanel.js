import React from 'react';
import { Card, Grid,Box,Typography,TextField, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingSpinner from '../LoadingSpinner'
function DashboardPanel({ExcessData}) {
  const fontStyle = {
    fontFamily: document.body.dir === "ltr" ? 'Roboto' : 'Vazir'
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
        setSuccessfulSubmit(true);
        if (responseData.message === 'Excess updated successfully'){
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
    // console.log(transformedData);
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
  };
  const getImageUrl = (code) => bundleImages[code];
  if (loading)
    return <LoadingSpinner />
  else
  return ( 
    <Grid id="test" justifyContent= 'center' alignContent={'center'} container sx={{p:4,justifyContent: 'center',flex:1}}>
      <Box sx={{justifyContent: 'center',flexDirection:'column', display:{xs:'none',md:'flex'}}} >
        <Card variant='outlined' sx={{flex:1,backgroundColor:'#ffffff',py:5,px:5,borderRadius:2}}>        
          <Card variant='outlined' sx={{py:5, px:2,marginBottom:2,borderRadius:2}}>
              <Box sx={{display:'flex',flex:1 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',px:1}}>
                  <img src={getImageUrl('usd')} alt="en" width="50" style={{marginInlineEnd:'5px'}} />
                  <Typography variant='h6' sx={fontStyle}>دلار</Typography>
                </Box>
                <Box sx={{px:1,direction:'ltr'}}>
                  <TextField
                    id="outlined-number"
                    label={'خرید'}
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
                <Box sx={{px:1,direction:'ltr'}}>
                  <TextField
                    id="outlined-number"
                    label={'فروش'}
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


          <Card variant='outlined' sx={{ py:5,px:2 ,marginBottom:5,borderRadius:2}}>
            <Box sx={{display:'flex',flex:1 ,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <img src={getImageUrl('eur')} alt="en" width="50" style={{marginInlineEnd:'5px'}} />
                  <Typography variant='h6' sx={fontStyle}>یورو</Typography>
              </Box>
         
            
              <Box sx={{direction:'ltr'}}>
                <TextField
                  id="outlined-number"
                  label={'خرید'}
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
              <Box sx={{direction:'ltr'}}>
                <TextField
                  id="outlined-number"
                  label={'فروش'}
                  type="number"
                  color='error'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={ExcessValue.EURIRR.sell}
                  onChange={(event) => {
                    setValue(event.target.value,"EURIRR.sell");
                  }}
                  sx={fontStyle}
                />
              </Box>
              
              
            </Box>
          </Card>
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