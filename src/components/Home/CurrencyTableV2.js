import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { formatPrice,FarsiDigitPrice } from '../../misc/priceFixer';
import {formatTime,formatTimeFarsiDigit} from '../../misc/dateFixer'

// import RimaData from '../../assets/data/rimaMockDataPrice.json'


const bundleImages = {
  usd: require("../../assets/flags/flag128/usd.png"),
  eur: require("../../assets/flags/flag128/eur.png"),
  gbp: require("../../assets/flags/flag128/gbp.png"),
  chf: require("../../assets/flags/flag128/chf.png"),
  cad: require("../../assets/flags/flag128/cad.png"),
  aud: require("../../assets/flags/flag128/aud.png"),
  try: require("../../assets/flags/flag128/try.png"),
};
const getImageUrl = (code) => bundleImages[code];

function CurrencyTableV2({CurrencyData}) {
  const { t } = useTranslation('translation');
  function ChangeIcon({direction}) {
    if (direction === 'positive') {
      return <ExpandLessIcon fontSize='small' sx={{color: 'HomePage.changeUp'}}/>;
    }
    else if (direction === 'negative') {
      return <ExpandMoreIcon fontSize='small' sx={{color: 'HomePage.changeDown'}}/>;
    }
    else
    return <></>;
  }
// ************* Fixing Data **************
  // var mainData = RimaData.assets;
  const sortOrder = {"usd": 0,"eur": 1,"gbp": 2,"chf": 3,"cad": 4,"aud": 5,"try": 6};
  
  const sortDataArray = (dataArray, sortOrder) => {
    return dataArray.sort((a, b) => {
      // Sort based on the `slug` property
      const slugA = a.slug;
      const slugB = b.slug;
  
      // Compare slugA and slugB based on their order in the sortOrder object
      if (sortOrder[slugA] < sortOrder[slugB]) {
        return -1;
      } else if (sortOrder[slugA] > sortOrder[slugB]) {
        return 1;
      } else {
        return 0;
      }
    });
  };
// ********************************************
  return ( 
    <>
      <TableContainer component={Paper} sx={{mt:2}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
          <TableHead sx={{backgroundColor: '#eeee'}}>
            <TableRow>
              <TableCell align='center'>{t('Home.flag')}</TableCell>
              <TableCell align="center">{t('Home.Currency')}</TableCell>
              <TableCell align="center">{t('Home.Buy')}</TableCell>
              <TableCell align="center">{t('Home.Sell')}</TableCell>
              <TableCell align="center">{t('Home.Change')}</TableCell>
              <TableCell align="center">{t('Home.Updated At')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortDataArray(CurrencyData,sortOrder).map((row) => (
              <TableRow
                key={row.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } ,py:0 }}
              >
                <TableCell align='center' component="th" scope="row" sx={{py:0}}>
                  <img style={{width:32,height:32}} src={getImageUrl(row.slug)} alt={`Flag of ${row.code}`} />

                  {row.name}
                </TableCell>
                <TableCell align="center">{t('Home.CurrencyList.'+row.slug)}</TableCell>
                <TableCell align="center">
                  {document.body.dir === "rtl" ? FarsiDigitPrice(row.prices.buy.price): formatPrice(row.prices.buy.price)}
                </TableCell>
                <TableCell align="center">
                {document.body.dir === "rtl" ? FarsiDigitPrice(row.prices.sell.price): formatPrice(row.prices.sell.price)}
                </TableCell>
                <TableCell align="center">

                  <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', }}>
                      <Typography sx={{color: row.change_direction ==='positive' ? 'green' : 'red'}}>{row.change_percentage === 0 ? "-" : document.body.dir === 'ltr' ? row.change_percentage : FarsiDigitPrice(row.change_percentage)}</Typography>
                      <ChangeIcon direction={row.change_direction} />
                  </Box>
                </TableCell>
                <TableCell align="center">{document.body.dir === "ltr" ? formatTime(row.lastUpdate) : formatTimeFarsiDigit(row.lastUpdate)}</TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
    </>
   );
}

export default CurrencyTableV2;


