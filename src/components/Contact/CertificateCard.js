import React from 'react';
import { Box } from '@mui/material'
import certImg from '../../assets/certificate.jpeg'
function CertificateCard() {
  return ( 
    <>
      <Box sx={{display:{xs:'none',md:'flex'}, flex:1,flexDirection:'row',justifyContent: 'center',p:1}}>
          <img src={certImg} alt="Certificate" style={{ width: '18%', height: 'auto' }} />
      </Box>
      <Box sx={{display:{xs:'flex',md:'none'}, flex:1,flexDirection:'row',justifyContent: 'center',mb:8,mt:1}}>
        <img src={certImg} alt="Certificate" style={{ width: '95%', height: 'auto' }} />
      </Box>
    </>
   );
}

export default CertificateCard;