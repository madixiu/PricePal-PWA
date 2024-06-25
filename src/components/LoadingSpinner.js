import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex',justifyContent: 'center',alignItems:'center',flex:1 ,flexDirection:'column',height:'100%'}}>
      <CircularProgress size={50} sx={{color:'#C7B40A'}}/>
    </Box>
  );
}
