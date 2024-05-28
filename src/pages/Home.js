import React from 'react';
import CurrencyTable from '../components/Home/CurrencyTable'
import { Box } from '@mui/material';
function Home() {
  return ( 
    <>
     <Box sx={{p: 4,display:{xs:'none',md:'flex',flexDirection:'column'}}}>
      <CurrencyTable />
    </Box>
    <Box sx={{p: 1,pb:7,display:{xs:'flex',md:'none',flexDirection:'column'}}}>
      <CurrencyTable />
    </Box>
    </>
   );
}

export default Home;
