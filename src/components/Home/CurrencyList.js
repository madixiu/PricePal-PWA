import React from 'react';
import Box from '@mui/material/Box';
import Cdata from '../../assets/data/data.json'
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {formatTime} from '../../misc/dateFixer'
export default function CurrencyList() {
  const { t } = useTranslation('translation');
  function RenderList(
  ) {
    var data = CurrencyData(Cdata);
    return data.map((item) => (
      <Box
        key={item.id} // Don't forget to add a unique `key` prop
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#eee',
          // elevation: 6,
          py: 1,
          px:'5px',
          borderRadius: 2,
          mt:'2px',
        }}
      >
        <Box sx={{display:'flex',flex:2,justifyContent: 'flex-start',alignItems:'center'}}>
          <img src={getImageUrl(item.flag)} alt="flag" style={{ width: 18, height: 18 }} />
          <Typography sx={{ mx: 1 , fontSize: 9 }}>{t('Home.CurrencyList.'+item.name)}</Typography>
        </Box>
        <Box sx={{display:'flex',flex:1,justifyContent: 'flex-start',alignItems:'center'}}>
          <Typography sx={{ mx: 1 , fontSize: 9 }}>{item.buy}</Typography>
        </Box>
        <Box sx={{display:'flex',flex:1,justifyContent: 'flex-start',alignItems:'center'}}>
          <Typography sx={{ mx: 1 , fontSize: 9 }}>{item.sell}</Typography>
        </Box>
        <Box sx={{display:'flex',flex:1,justifyContent: 'flex-start',alignItems:'center'}}>
          <Typography sx={{ mx: 1, fontSize: 9}}>{item.updated_at}</Typography>
        </Box>
      </Box>
    ));
  }
  


  return ( 
    <>
      <Box
        sx={{ width: '100%', bgcolor: 'background.paper' ,p:1,flex:1}}>
        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',backgroundColor: 'gainsboro',py:'1px',borderRadius:1}}>

          <Box sx={{display:'flex',flex:2,justifyContent: 'flex-start',alignItems:'center'}}>
            <Typography sx={{mx: 1 , fontSize: 9 }}>{t('Home.Currency')}</Typography>
          </Box>
          <Box sx={{display:'flex',flex:1,justifyContent: 'flex-start',alignItems:'center'}}>
            <Typography sx={{mx: 1 , fontSize: 9 }}>{t('Home.Buy')}</Typography>
          </Box>
          <Box sx={{display:'flex',flex:1,justifyContent: 'flex-start',alignItems:'center'}}>
            <Typography sx={{mx: 1 , fontSize: 9 }}>{t('Home.Sell')}</Typography>
          </Box>
          <Box sx={{display:'flex',flex:1,justifyContent: 'flex-start',alignItems:'center'}}>
            <Typography sx={{mx: 1 , fontSize: 9 }}>{t('Home.Updated At')}</Typography>
          </Box>
        </Box>
        <RenderList />

      </Box>
    </>
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
  sek: require("../../assets/flags/flag64/sek.png"),
  nok: require("../../assets/flags/flag64/nok.png"),
  rub: require("../../assets/flags/flag64/rub.png"),
  thb: require("../../assets/flags/flag64/thb.png"),
  sgd: require("../../assets/flags/flag64/sgd.png"),
  hkd: require("../../assets/flags/flag64/hkd.png"),
  azn: require("../../assets/flags/flag64/azn.png"),
  amd: require("../../assets/flags/flag64/amd.png"),
  dkk: require("../../assets/flags/flag64/dkk.png"),
  aed: require("../../assets/flags/flag64/aed.png"),
  jpy: require("../../assets/flags/flag64/jpy.png"),
  try: require("../../assets/flags/flag64/try.png"),
  cny: require("../../assets/flags/flag64/cny.png"),
  sar: require("../../assets/flags/flag64/sar.png"),
  inr: require("../../assets/flags/flag64/inr.png"),
  myr: require("../../assets/flags/flag64/myr.png"),
  afn: require("../../assets/flags/flag64/afn.png"),
  kwd: require("../../assets/flags/flag64/kwd.png"),
  iqd: require("../../assets/flags/flag64/iqd.png"),
  bhd: require("../../assets/flags/flag64/bhd.png"),
  omr: require("../../assets/flags/flag64/omr.png"),
  qar: require("../../assets/flags/flag64/qar.png"),
  gel: require("../../assets/flags/flag64/gel.png"),
  brl: require("../../assets/flags/flag64/brl.png"),
  nzd: require("../../assets/flags/flag64/nzd.png"),
  pkr: require("../../assets/flags/flag64/pkr.png"),
  ars: require("../../assets/flags/flag64/ars.png"),
  krw: require("../../assets/flags/flag64/krw.png"),
  syp: require("../../assets/flags/flag64/syp.png"),
  kgs: require("../../assets/flags/flag64/kgs.png"),
  tjs: require("../../assets/flags/flag64/tjs.png"),
  tmt: require("../../assets/flags/flag64/tmt.png"),
};



const CurrencyData = (Cdata) => {
  let data = Cdata.arz;
  var res = []
  let counter = 0
  for (let item of data) {
    let flag = item.slug;
    
    if (item.slug === "usd-hav" || item.slug === "usd-ist" || item.slug === "usd-herat" || item.slug === "usd-sulaymaniyah")
      flag = "usd"
    if (item.slug === "eur-hav" || item.slug === "eur-ist" )
      flag = 'eur'

    res.push({id: counter,flag:flag, name: item.slug, buy: item.price[0].hi, sell: item.price[0].low, updated_at: formatTime(item.updated_at)})
    counter++
  } 
  return res;
}