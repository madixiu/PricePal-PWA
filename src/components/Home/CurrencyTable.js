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
import { formatPrice,ChangeColor } from '../../misc/priceFixer';
import {formatTime} from '../../misc/dateFixer'
import { CurrencyName } from '../../misc/CurrencyNameList';
import UpdateIcon from '@mui/icons-material/Update';

const bundleImages = {
  usd: require("../../assets/flags/flag128/usd.png"),
  eur: require("../../assets/flags/flag128/eur.png"),
  gbp: require("../../assets/flags/flag128/gbp.png"),
  chf: require("../../assets/flags/flag128/chf.png"),
  cad: require("../../assets/flags/flag128/cad.png"),
  aud: require("../../assets/flags/flag128/aud.png"),
  try: require("../../assets/flags/flag128/try.png"),
  usdt: require("../../assets/flags/flag128/usdt.png"),
};
const getImageUrl = (code) => bundleImages[code];

function CurrencyTable({CurrencyData}) {
 const[oldChange,setOldChange] = React.useState([]);
 const[cellColor,setCellColor] = React.useState({});
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
    <>
      <TableContainer component={Paper} sx={{mt:2}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
          <TableHead sx={{backgroundColor:'#fafafa'}}>
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
              <TableCell align="center">
                  <Typography sx={tableHeaderStyle}>
                      تغییر
                  </Typography>
                  <Typography sx={tableHeaderEnStyle}>
                      Change
                  </Typography>
              </TableCell>
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
                  <img style={{width:32,height:row.slug === "usdt" ? 28 : 32,marginInlineEnd:10}} src={getImageUrl(row.slug)} alt={`Flag of ${row.code}`} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', }}>
                    <Box sx={{backgroundColor: '#eee',borderRadius:1,p:0.2}}>
                    <Typography sx={{fontSize:'0.7rem',color:'black'}}>
                      {(row.slug).toUpperCase()}
                    </Typography>
                    </Box>
                    <Typography sx={tableCellStyle}>
                      {CurrencyName(row.slug)}
                    </Typography>
                  </Box>
                </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{color: cellColor[row.slug]}}>
                    {formatPrice(row.prices.buy.price)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{color: cellColor[row.slug]}}>
                    {formatPrice(row.prices.sell.price)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
                      <Typography sx={{color: ChangeColor(row.change_direction)}}>
                          {row.change_percentage === 0 ? "-" : `${row.change_percentage}%`}
                      </Typography>
                      <ChangeIcon direction={row.change_direction} />
                  </Box>
                </TableCell>
                <TableCell align="center" sx={tableCellStyle} >
                  <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
                    <Typography sx={{ml:0.2}}>
                      {formatTime(row.lastUpdate)}
                    </Typography>
                    <UpdateIcon sx={{fontSize:'0.9rem'}}/>
                  </Box>
                  
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


