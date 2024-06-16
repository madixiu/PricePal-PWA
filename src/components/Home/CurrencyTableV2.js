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
import { formatPrice,ChangeColor } from '../../misc/priceFixer';
import {formatTime} from '../../misc/dateFixer'

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
  const tableHeaderStyle = {
    fontWeight: document.body.dir === "ltr" ? 500 : 700,
    fontFamily: document.body.dir === "ltr" ? 'Roboto' : 'Vazir'
  }
  const tableCellStyle = {
    fontFamily: document.body.dir === "ltr" ? 'Roboto' : 'Vazir'
  }
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

  return ( 
    <>
      <TableContainer component={Paper} sx={{mt:2}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
          <TableHead sx={{backgroundColor: '#eeee'}}>
            <TableRow>
              <TableCell align={document.body.dir === "ltr" ? "left" : "right"} sx={tableHeaderStyle}>
                <Box>
                  <Typography sx={tableCellStyle}>
                      ارز
                  </Typography>
                  <Typography sx={tableCellStyle}>
                      Currency
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>
                  <Typography sx={tableCellStyle}>
                      خرید
                  </Typography>
                  <Typography sx={tableCellStyle}>
                      Buy
                  </Typography>
              </TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>
                  <Typography sx={tableCellStyle}>
                      فروش
                  </Typography>
                  <Typography sx={tableCellStyle}>
                      Sell
                  </Typography>
              </TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>{t('Home.Change')}(%)</TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>
                  <Typography sx={tableCellStyle}>
                      بروز شده
                  </Typography>
                  <Typography sx={tableCellStyle}>
                      Updated
                  </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CurrencyData.map((row) => (
              <TableRow
                key={row.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } ,py:0 }}
              >
                <TableCell align='left' component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'flex-start', }}>
                  <img style={{width:32,height:32,marginInlineEnd:10}} src={getImageUrl(row.slug)} alt={`Flag of ${row.code}`} />
                  <Typography sx={tableCellStyle}>
                      {t('Home.CurrencyList.'+row.slug)}
                  </Typography>
                </Box>
                </TableCell>

                <TableCell align="center" sx={tableCellStyle}>
                  {formatPrice(row.prices.buy.price)}
                </TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                {formatPrice(row.prices.sell.price)}
                </TableCell>
                <TableCell align="center">

                  <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', }}>
                      <ChangeIcon direction={row.change_direction} />
                      <Typography sx={[tableCellStyle,{color: ChangeColor(row.change_direction)}]}>
                          {row.change_percentage === 0 ? "-" : row.change_percentage}
                      </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center" sx={tableCellStyle}>{formatTime(row.lastUpdate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
   );
}

export default CurrencyTableV2;


