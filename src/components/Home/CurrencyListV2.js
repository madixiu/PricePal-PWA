import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import {formatTime} from '../../misc/dateFixer'
import { formatPrice,ChangeColor } from '../../misc/priceFixer';
function CurrencyListV2({CurrencyData}) {
  const { t } = useTranslation('translation');

  const typographyHeaderStyle = {
    fontSize: 11 ,
    fontWeight: 600,
    fontFamily:document.body.dir === 'ltr'? 'Roboto' : 'Vazir'
  };
  const typographyListStyle = {
    fontSize: 11,
    alignSelf:'flex-end',
    fontFamily:document.body.dir === 'ltr'? 'Roboto' : 'Vazir'
  }
function ChangeIcon({direction}) {
    if (direction === 'positive') {
      return <ExpandLessIcon fontSize='small' sx={{color: 'HomePage.changeUp',fontSize:'0.6rem'}}/>;
    }
    else if (direction === 'negative') {
      return <ExpandMoreIcon fontSize='small' sx={{color: 'HomePage.changeDown',fontSize:'0.6rem'}}/>;
    }
    else
    return <></>;
}
function RenderList({CurrencyData}) {
  return CurrencyData.map((item) => (
    <Box
      key={item.slug} 
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#eee',
        // elevation: 6,
        py: 1,
        px:0.4,
        borderRadius: 1,
        mt:0.4,
      }}
    >
      <Box sx={{display:'flex',flex:2,justifyContent: 'flex-start',alignItems:'center'}}>
        <img src={getImageUrl(item.slug)} alt="flag" style={{ width: 18, height: 18 }} />
        <Typography sx={[{marginInlineStart:0.5},typographyListStyle]}>{t('Home.CurrencyList.'+item.slug)}</Typography>
      </Box>
      <Box sx={{display:'flex',flex:1,justifyContent: 'center',alignItems:'center'}}>
        <Typography sx={typographyListStyle}>{formatPrice(item.prices.buy.price)}</Typography>
      </Box>
      <Box sx={{display:'flex',flex:1,justifyContent: 'center',alignItems:'center'}}>
        <Typography sx={typographyListStyle}>{formatPrice(item.prices.sell.price)}</Typography>
      </Box>
      <Box sx={{display:'flex',flex:1,justifyContent: 'center',alignItems:'baseline',flexWrap:'wrap'}}>
        <ChangeIcon direction={item.change_direction} />
        <Typography sx={[typographyListStyle,{color:ChangeColor(item.change_direction)}]}>{item.change_percentage === 0 ? "-" : formatPrice(item.change_percentage)}</Typography>
      </Box>
      <Box sx={{display:'flex',flex:1,justifyContent: 'center',alignItems:'center'}}>
        <Typography sx={typographyListStyle}>{formatTime(item.lastUpdate)}</Typography>
      </Box>
    </Box>
  ));
}
  return ( 
    <Grid
      sx={{bgcolor: 'background.paper' ,p:1,flex:1 ,flexDirection:'row'}}>
      <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor: 'gainsboro',py:0.5,borderRadius:1}}>

        <Box sx={{display:'flex',flex:2,justifyContent: 'flex-start',alignItems:'center',alignContent:'center',marginInlineStart:1}}>
          <Typography sx={typographyHeaderStyle}>{t('Home.Currency')}</Typography>

        </Box>
        <Box sx={{display:'flex',flex:1,justifyContent: 'center',alignItems:'center',alignContent:'center'}}>
          <Typography sx={typographyHeaderStyle}>{t('Home.Buy')}</Typography>
        </Box>
        <Box sx={{display:'flex',flex:1,justifyContent: 'center',alignItems:'center'}}>
          <Typography sx={typographyHeaderStyle}>{t('Home.Sell')}</Typography>
        </Box>
        <Box sx={{display:'flex',flex:1,justifyContent: 'center',alignItems:'center'}}>
          <Typography sx={typographyHeaderStyle}>{t('Home.Change')}(%)</Typography>
        </Box>
        <Box sx={{display:'flex',flex:1,justifyContent: 'center',alignItems:'center'}}>
          <Typography sx={typographyHeaderStyle}>{t('Home.Updated At')}</Typography>
        </Box>
      </Box>
      <RenderList CurrencyData={CurrencyData} />
    </Grid>
);
}

const getImageUrl = (code) => bundleImages[code];

const bundleImages = {
  usd: require("../../assets/flags/flag64/usd.png"),
  eur: require("../../assets/flags/flag64/eur.png"),
  gbp: require("../../assets/flags/flag64/gbp.png"),
  chf: require("../../assets/flags/flag64/chf.png"),
  cad: require("../../assets/flags/flag64/cad.png"),
  aud: require("../../assets/flags/flag64/aud.png"),
  try: require("../../assets/flags/flag64/try.png"),

};


export default CurrencyListV2;