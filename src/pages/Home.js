import React from 'react';
import CurrencyTable from '../components/Home/CurrencyTable'
import { Box } from '@mui/material';
import CurrencyList from '../components/Home/CurrencyList';
function Home() {
  return ( 
    <>
     <Box id="HomeXS" sx={{px: 2,pt:2,display:{xs:'none',md:'flex',flexDirection:'column'}}}>
      <CurrencyTable />
    </Box>
    <Box sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flexWrap:'nowrap'}}>

      <CurrencyList />
    </Box>
    {/* <Box sx={{p: 1,pb:7,display:{xs:'flex',md:'none',flexDirection:'column'}}}>
      <CurrencyTable />
    </Box> */}
    </>
   );
}

export default Home;
