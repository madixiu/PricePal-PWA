import { Box,Card,TextField, Typography } from '@mui/material';
import React from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { CurrencyName } from '../misc/CurrencyNameList';
function Calculator() {
  const [Data,setData] = React.useState([]);
  const [Reversed,setReversed] = React.useState(false);



  async function getData() {
    await fetch(`${process.env.REACT_APP_BASE_URL}pricev2`)
      .then(res => res.json())
      .then(data => {
        let Data = data.assets;
        setData(Data);
        console.log(Data);
      })
      .catch(err => console.log(err));
  }
  React.useEffect(() => {
    getData(); // Fetch data initially
  }, []); // Empty dependency array to run the effect only once


//  const width = document.getElementById('calc-left-text-field').clientWidth;



  return ( 
    <Box sx={{display:'flex',justifyContent: 'center',alignItems:'center',flex:1}}>
      <Box sx={{display:'flex',justifyContent: 'center',alignItems:'center',width:'50%'}}>
        <Card variant='elevation' elevation={0} sx={{flex:1,borderRadius:2,flexDirection:'column',p:1}}>
          <Card variant='elevation' elevation={0} sx={{ marginBottom:1,borderRadius:2,width:'100%',py:2,px:1,backgroundColor: 'rgba(0, 0, 0, 0.3)',border: '1px solid rgba(209, 213, 219, 0.8)'}}>
            <Box sx={{display:'flex',flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',mx:1}}>
              <TextField
                
                  id="calc-number-field"
                  size='small'
                  sx={{width:'46%'}}
                  // label={'خرید'}
                  type="number"
                  color='primary'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={1}
                  // onChange={(event) => {
                  //   setValue(event.target.value,item.code,"buy");
                  // }}
                />
            </Box>
            <Box sx={{display:'flex',flex:1 ,flexDirection:Reversed ? 'row-reverse' : 'row',justifyContent:'space-around',alignItems:'center',my:2}}>
              <Box sx={{direction:'ltr',flex:1,justifyContent: Reversed ? 'flex-end' : 'flex-start',alignItems:'center',display:'flex',mx:1}}>
                <TextField
                  fullWidth
                  id="calc-right-text-field"
                  size='small'
                  // label={'خرید'}
                  select
                  SelectProps={{
                    native: true,
                  }}
                  color='primary'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={'usd'}
                >
                  {Data.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {CurrencyName(option.slug)}
                      </option>
                    ))}

                </TextField>
                
              </Box>
              {/* <Button variant='outlined' color='success' size='small' sx={{px:0}}>
                <SyncAltIcon />
              </Button> */}
              <Box sx={{py:0.5,px:1.3 ,backgroundColor: '#C7B40A',display:'flex',justifyContent: 'center',alignItems:'center',borderRadius:2,'&:hover': { backgroundColor: '#006ae2',cursor: 'pointer'}}}
                onClick={()=>setReversed(!Reversed)}>
                <SyncAltIcon sx={{color:'#fff'}} />
              </Box>
              <Box sx={{direction:'ltr',flex:1,justifyContent: Reversed ? 'flex-start' : 'flex-end',alignItems:'center',display:'flex',mx:1}}>
                <TextField
                  fullWidth
                  id="calc-left-text-field"
                  size='small'
                  select
                  SelectProps={{
                    native: true,
                  }}
                  // label={'فروش'}
                  // color='error'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={'usd'}
                  // onChange={(event) => {
                  //   setValue(event.target.value,item.code,"sell");
                  // }}
                  >
                    {Data.map((option) => (
                      <option key={option.slug} value={option.slug}>
                        {CurrencyName(option.slug)}
                      </option>
                    ))}

                  </TextField>
               
              </Box>
            </Box>
            <Box sx={{display:'flex',flex:1 ,flexDirection: Reversed ? 'row-reverse' : 'row',justifyContent:'center',alignItems:'center',mx:1}}>
              <Box sx={{display:'flex',flex:3,justifyContent: Reversed ? 'flex-start' : 'flex-end'}}>
                <Typography>rifghfhhtText</Typography>
              </Box>
              <Box sx={{display:'flex',flex:1,justifyContent: 'center',}}>
                <Typography>=</Typography>

              </Box>
              <Box sx={{display:'flex',flex:3,justifyContent: Reversed ? 'flex-end' : 'flex-start'}}>
               <Typography>leftText</Typography>

              </Box>

            </Box>
          </Card>
        </Card>      

      </Box>
    </Box>
   );
}

export default Calculator;