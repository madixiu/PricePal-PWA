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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatPrice,ChangeColor } from '../../misc/priceFixer';
import {formatTime} from '../../misc/dateFixer'
import { CurrencyName } from '../../misc/CurrencyNameList';
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

function CurrencyTable({CurrencyData}) {
  const tableHeaderStyle = {
    fontWeight: 600,
    fontFamily: 'Vazir'
  }
  const tableHeaderEnStyle = {
    fontFamily: 'Vazir',
    color:'#555',
    fontSize:'0.8rem'
  };
  const tableCellStyle = {
    fontFamily: 'Vazir'
  }
  function ChangeIcon({direction}) {
    if (direction === 'positive') {
      return <ArrowDropUpIcon fontSize='medium' sx={{color:'HomePage.changeUp'}}/>;
    }
    else if (direction === 'negative') {
      return <ArrowDropDownIcon fontSize='medium' sx={{color:'HomePage.changeDown'}}/>;
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
              <TableCell align="right" sx={tableHeaderStyle}>
              <Box id="booo" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={tableHeaderStyle}>
                    ارز
                  </Typography>
                  <Typography sx={tableHeaderEnStyle}>
                    Currency
                  </Typography>
                </Box>
              </Box>

              </TableCell>
              <TableCell align="center">
                  <Typography sx={tableHeaderStyle}>
                      خرید
                  </Typography>
                  <Typography sx={tableHeaderEnStyle}>
                      Buy
                  </Typography>
              </TableCell>
              <TableCell align="center">
                  <Typography sx={tableHeaderStyle}>
                      فروش
                  </Typography>
                  <Typography sx={tableHeaderEnStyle}>
                      Sell
                  </Typography>
              </TableCell>
              <TableCell align="center">Change(%)</TableCell>
              <TableCell align="center">
                  <Typography sx={tableHeaderStyle}>
                      بروز شده
                  </Typography>
                  <Typography sx={tableHeaderEnStyle}>
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
                      {CurrencyName(row.slug)}
                  </Typography>
                </Box>
                </TableCell>

                <TableCell align="center">
                  <Typography>
                    {formatPrice(row.prices.buy.price)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>
                    {formatPrice(row.prices.sell.price)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center', }}>
                      <Typography sx={{color: ChangeColor(row.change_direction)}}>
                          {row.change_percentage === 0 ? "-" : `${row.change_percentage}%`}
                      </Typography>
                      <ChangeIcon direction={row.change_direction} />
                  </Box>
                </TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                  <Typography>
                    {formatTime(row.lastUpdate)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
   );
}

export default CurrencyTable;


