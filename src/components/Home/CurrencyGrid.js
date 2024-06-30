import React from 'react';
import { Box,Typography } from '@mui/material';
// import { CurrencyName } from '../../misc/CurrencyNameList';
// import UpdateIcon from '@mui/icons-material/Update';
// import {formatTime} from '../../misc/dateFixer'
import { formatPrice } from '../../misc/priceFixer';
// import Divider from '@mui/material/Divider';

// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function CurrencyGrid({CurrencyData}) {
  const[oldChange,setOldChange] = React.useState([]);
  const[cellColor,setCellColor] = React.useState({});
  // const [cardHeight, setCardHeight] = React.useState(null);

  // const FontStyle = {fontFamily: 'Vazir'}
  const bundleImages = {
    usd: require("../../assets/flags/flag64/usd.png"),
    eur: require("../../assets/flags/flag64/eur.png"),
    gbp: require("../../assets/flags/flag64/gbp.png"),
    chf: require("../../assets/flags/flag64/chf.png"),
    cad: require("../../assets/flags/flag64/cad.png"),
    aud: require("../../assets/flags/flag64/aud.png"),
    try: require("../../assets/flags/flag64/try.png"),
    usdt: require("../../assets/flags/flag64/usdt.png"),
  };
const getImageUrl = (code) => bundleImages[code];

// React.useEffect(() => {
//   if (typeof window !== 'undefined') {
//     // setCardHeight(window.innerWidth);
//     setCardHeight((window.innerWidth * 0.5));
//     console.log(window.innerWidth);
//     // Optionally, you can also listen for window resize events and update dimensions accordingly:
//     window.addEventListener('resize', () => {
//       // setCardHeight(window.innerWidth);
//       setCardHeight((window.innerWidth * 0.5));
//     });

//     // Don't forget to clean up the event listener when unmounting the component:
//     return () => {
//       window.removeEventListener('resize', () => {
//         // setCardHeight(window.innerWidth);
//         setCardHeight((window.innerWidth * 0.5));
//       });
//     };
//   }
// }, []);
React.useEffect(() => {
  if (oldChange.length === 0){
    let change =[];
    let color ={}
    for (let i=0;i<CurrencyData.length;i++){
        change[i] = CurrencyData[i].change_percentage;
        color[CurrencyData[i].slug]= '#000';
    }
    setCellColor(color)
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
        color[CurrencyData[i].slug]= '#000';
        change[i] = CurrencyData[i].change_percentage;
      }
    }
    setCellColor(color);
    setOldChange(change);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[CurrencyData]);
  return ( 
    <Box sx={{ display: 'flex', flexWrap: 'wrap',mb:2}}>
    {CurrencyData.map((item) => (
      <Box key={item.code} sx={{ width: '50%',display:'flex'}}>
        <Box sx={{ m:0.5,backgroundColor: '#fff', borderRadius:5,flex:'1',flexDirection:'column',display:'flex'}} className='elevatedBox'>
          <Box sx={{display:'flex',flexDirection:'column',flex:1}}>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',p:2}}>
              {/*  //! OPTION 2   */}
              {/* <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                <Typography sx={[{fontSize:'1.1rem',color:'#000'},FontStyle]}>{CurrencyName(item.slug)}</Typography>
                <Typography sx={{color:'gray',fontSize:'0.7rem'}}>{(item.slug).toUpperCase()}</Typography>
              </Box> */}

             {/*  //! OPTION 2   */}
              <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                <Typography sx={{color:'#000',fontSize:'1.1rem',fontWeight:400}}>{(item.slug).toUpperCase()}</Typography>
              </Box>
              <Box sx={{display:'flex',flexDirection:'column'}}>
                <img style={{width:32,height:item.slug === "usdt" ? 28 : 32}} src={getImageUrl(item.slug)} alt={`Flag of ${item.code}`} />
              </Box> 
            </Box>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column',flex:1,p:2,justifyContent: 'center',}}>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <Box sx={{display:'flex',flexDirection:'column',justifyContent: 'center',}}>
                <Box>
                  <Typography sx={{fontSize:'0.9rem',color:'#555'}}>Buy</Typography>
                </Box>
              </Box>
              <Box sx={{display:'flex',flexDirection:'column',justifyContent: 'space-around',}}>
                <Typography sx={{fontSize:'1rem',color:'#555'}}>{formatPrice(item.prices.buy.price)}</Typography>
              </Box>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <Box sx={{display:'flex',flexDirection:'column',justifyContent: 'center',}}>             
                <Box>
                  <Typography sx={{fontSize:'0.9rem',fontWeight:'200',color:'#000'}}>Sell</Typography>
                </Box>
              </Box>
              <Box sx={{display:'flex',flexDirection:'column',justifyContent: 'space-around',}}>
                <Typography sx={{fontSize:'1.9rem',fontWeight:'200',color:'#000'}}>{formatPrice(item.prices.sell.price)}</Typography>
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