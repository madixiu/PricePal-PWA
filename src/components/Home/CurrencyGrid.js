import React from 'react';
import { Box,Typography } from '@mui/material';
import { CurrencyName } from '../../misc/CurrencyNameList';
import UpdateIcon from '@mui/icons-material/Update';
import {formatTime} from '../../misc/dateFixer'
import { formatPrice,ChangeColor } from '../../misc/priceFixer';
import Divider from '@mui/material/Divider';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function CurrencyGrid({CurrencyData}) {
  const[oldChange,setOldChange] = React.useState([]);
  const[cellColor,setCellColor] = React.useState({});
  const FontStyle = {fontFamily: 'Vazir'}
  const bundleImages = {
    usd: require("../../assets/flags/flag64/usd.png"),
    eur: require("../../assets/flags/flag64/eur.png"),
    gbp: require("../../assets/flags/flag64/gbp.png"),
    chf: require("../../assets/flags/flag64/chf.png"),
    cad: require("../../assets/flags/flag64/cad.png"),
    aud: require("../../assets/flags/flag64/aud.png"),
    try: require("../../assets/flags/flag64/try.png"),
  };
const getImageUrl = (code) => bundleImages[code];
function ChangeIcon({direction}) {
  if (direction === 'positive') {
    return <ArrowDropUpIcon sx={{color:'HomePage.changeUp',fontSize:'1rem'}}/>;
  }
  else if (direction === 'negative') {
    return <ArrowDropDownIcon  sx={{color:'HomePage.changeDown',fontSize:'1rem'}}/>;
  }
  else
  return <></>;
}

React.useEffect(() => {
  if (oldChange.length === 0){
    let change =[];
    for (let i=0;i<CurrencyData.length;i++){
        change[i] = CurrencyData[i].change_percentage;
    }
    setOldChange(change);
   
  }else {
    let change = [];
    let color ={}
    for(let i=0;i<CurrencyData.length;i++){
      if (oldChange[i] > CurrencyData[i].change_percentage){
        color[CurrencyData[i].slug]= 'green';
        change[i] = CurrencyData[i].change_percentage;
      }else if (oldChange[i] < CurrencyData[i].change_percentage){
        color[CurrencyData[i].slug]= 'red';
        change[i] = CurrencyData[i].change_percentage;
      }else {
        color[CurrencyData[i].slug]= 'black';
        change[i] = CurrencyData[i].change_percentage;
      }
    }
    setCellColor(color);
    setOldChange(change);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[CurrencyData]);
  return ( 
    <Box sx={{ display: 'flex', flexWrap: 'wrap',mb:10}}>
    {CurrencyData.map((item) => (
      <Box key={item.code} sx={{ width: '50%', textAlign: 'center' }}>
        <Box sx={{ m:0.5,backgroundColor: '#fff', borderRadius:3}}>
          <Box sx={{display:'flex',flexDirection:'column',flex:1}}>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',p:1}}>
              <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                <Typography sx={[{fontSize:'0.9rem'},FontStyle]}>{CurrencyName(item.slug)}</Typography>
                <Typography sx={{color:'gray',fontSize:'0.7rem'}}>{(item.slug).toUpperCase()}</Typography>
              </Box> 
              <Box sx={{display:'flex',flexDirection:'column'}}>
                <img style={{width:32,height:32}} src={getImageUrl(item.slug)} alt={`Flag of ${item.code}`} />
              </Box> 
            </Box>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column',justifyContent: 'center',alignItems:'center',flex:1}}>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center',p:0.5}}>
              <Typography sx={{fontSize:'0.9rem'}}>{formatTime(item.lastUpdate)}</Typography>
              <UpdateIcon sx={{fontSize:'0.9rem',color:'gray'}}/>
            </Box>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column',flex:1}}>
             <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',px:1}}>
              <Box sx={{display:'flex',flexDirection:'column',justifyContent: 'space-around',}}>
                <Typography sx={{color:cellColor[item.slug]}}>{formatPrice(item.prices.buy.price)}</Typography>
                
                {/* <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
                  <Typography sx={{color: ChangeColor(item.change_direction),fontSize:'0.8rem'}}>{item.change_percentage === 0 ? "-" : item.change_percentage}%</Typography>
                  <ChangeIcon direction={item.change_direction} />
                </Box> */}
              </Box>
              {/* //! change in center */}
              {/* <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
                  <Typography sx={{color: ChangeColor(item.change_direction),fontSize:'0.8rem'}}>{item.change_percentage === 0 ? "-" : item.change_percentage}</Typography>
                  <ChangeIcon direction={item.change_direction} />
              </Box> */}
              <Box sx={{display:'flex',flexDirection:'column'}}>
                <Box>
                  <Typography sx={{fontSize:'0.9rem'}}>Buy</Typography>
                  <Typography sx={[{fontSize:'0.6rem',color:'gray'},FontStyle]}>خرید</Typography>
                </Box>
              </Box>
            </Box>
            {/* <Divider variant="middle"/> */}
            <Divider variant="middle">
                <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
                  <Typography sx={{color: ChangeColor(item.change_direction),fontSize:'0.8rem'}}>{item.change_percentage === 0 ? "-" :  `${item.change_percentage}%`}</Typography>
                  <ChangeIcon direction={item.change_direction} />
                </Box>
            </Divider>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',px:1}}>
              <Box sx={{display:'flex',flexDirection:'column',justifyContent: 'space-around',}}>
                <Typography sx={{color:cellColor[item.slug]}}>{formatPrice(item.prices.sell.price)}</Typography>
                {/* <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
                  <Typography sx={{color: ChangeColor(item.change_direction),fontSize:'0.8rem'}}>{item.change_percentage === 0 ? "-" : item.change_percentage}%</Typography>
                  <ChangeIcon direction={item.change_direction} />
                </Box> */}
              </Box>
              <Box sx={{display:'flex',flexDirection:'column'}}>
              
                <Box>
                  <Typography sx={{fontSize:'0.9rem'}}>Sell</Typography>
                  <Typography sx={[{fontSize:'0.6rem',color:'gray'},FontStyle]}>فروش</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
   );
}

export default CurrencyGrid;