import React from 'react';
import CurrencyTable from '../components/CurrencyTable'
import { Box } from '@mui/material';
function Home() {
  return ( 
    <Box sx={{p: 4}}>
      <CurrencyTable />
    </Box>
   );
}

export default Home;
