import React from 'react';
import { Box,Grid,Card,Typography,TextField,Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import LoadingSpinner from '../LoadingSpinner'

function DashboardMobile({ExcessData,PromotionData,PromotionStatus}) {

  const items = [{slug: "try", name: 'لیر',code:'TRYIRR'},{slug: "usd", name: 'دلار',code:'USDIRR'},{slug: "eur", name: 'یورو',code:'EURIRR'},  {slug: "gbp", name: 'پوند',code:'GBPIRR'},{slug: "cad", name: 'دلار کانادا',code:'CADIRR'},{slug: "aud", name: 'دلار استرالیا',code:'AUDIRR'}];
  const fontStyle = {fontFamily: 'Vazir'}

  //**************** STATES ***************************************************
  const [openSnack,setOpenSnack] = React.useState(false);
  const [successfulSubmit,setSuccessfulSubmit] = React.useState(false);
  const [loading,setLoading] = React.useState(true)
  const [ExcessValue,setExcessValue] = React.useState({});
  const [promotionStatus,setPromotionStatus] = React.useState(false);
  const [promotionText,setPromotionText] = React.useState("");
//****************************************** 
  

//**************** HOOK ******************
  React.useEffect(() => {
      if(Object.keys(ExcessValue).length === 0){
        setExcessValue(JSON.parse(JSON.stringify(ExcessData)));
        setLoading(false)
      }
      setPromotionStatus(PromotionStatus);
      setPromotionText(PromotionData)
  },[ExcessData,ExcessValue,PromotionStatus,PromotionData]);
//****************************************** 


const postPromotionStatus = async (url) => {
  setLoading(true);
  try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           },
        // body: JSON.stringify(dataToPost),
    });
    const responseData = await response.json();
    if (responseData.status === 'success'){
      setSuccessfulSubmit(true);
      setOpenSnack(true);
    }
    else{
      setSuccessfulSubmit(false);
      setOpenSnack(true);
    }
  }
  catch(error) {
    setSuccessfulSubmit(false);
    setOpenSnack(true);
    console.error('Error fetching data:', error);
  }
  finally {
      setLoading(false);
  }
}

const postPromotion = async (url, dataToPost) => {
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
      if (responseData.message === 'Promotion updated successfully'){
        setSuccessfulSubmit(true);
        setOpenSnack(true);
      }
      else{
        setSuccessfulSubmit(false);
        setOpenSnack(true);
      }
  }
  catch(error) {
    setSuccessfulSubmit(false);
    setOpenSnack(true);
    console.error('Error fetching data:', error);
  }finally {
      setLoading(false);
  }
};
async function handlePromotion (e) {
  e.preventDefault();
    if (promotionStatus) {
      let postdata = {"textvalue": promotionText}
      await postPromotion(`${process.env.REACT_APP_BASE_URL}update_promo_text`,  postdata )
    }
    else
    await postPromotionStatus(`${process.env.REACT_APP_BASE_URL}promo_toggle`)

    return;
};

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
          <Card key={item.code} sx={{my:0.5}} variant='outlined'>
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
      <Box sx={{justifyContent:'space-evenly',alignItems:'center',display:'flex',my:1,mb:5}}>
            <Button variant="contained"  size='samll' sx={[{borderRadius:2,minWidth:100},fontStyle]} onClick={handleSubmit}>تائید</Button>
            <Button variant="outlined"  size='samll' sx={[{borderRadius:2,minWidth:100},fontStyle]} onClick={handleReset}>تنظیم مجدد</Button>
      </Box>
          <Box sx={{justifyContent: 'center',flexDirection:'column', display:{xs:'flex',md:'none',p:5,mb:10}}}>
            <Card variant='elevation' elevation={1} sx={{borderRadius:2,flexDirection:'column',p:1,mb:10}}>
              <Box sx={{p:2,flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}
                autoComplete="off"
                noValidate
              >
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="پیشنهاد ویژه"
                  multiline
                  rows={6}
                  defaultValue={promotionText}
                  onChange={(event) => setPromotionText(event.target.value)}
                />

              </Box>  
              <Box sx={{p:2}}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={promotionStatus}  onChange={() => setPromotionStatus(!promotionStatus)} />} label="فعال" />
              </FormGroup>
              </Box>
              <Box sx={{p:1,flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}>
                <Button variant="contained"  size='large' sx={[{borderRadius:2,minWidth:120,mx:4},fontStyle]} onClick={handlePromotion}>ثبت</Button>
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
              {successfulSubmit ? 'ثبت شد' :'خطا'}
          </Typography>
        </Alert>
      </Snackbar>
    </Grid>
   );
}

export default DashboardMobile;