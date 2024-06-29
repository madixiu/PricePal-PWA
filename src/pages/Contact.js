import React from 'react';

import { Box } from '@mui/material';
import ContactInfoCard from '../components/Contact/ContactInfoCard';
import GoogleMap from '../components/Contact/GoogleMap';
import CertificateCard from '../components/Contact/CertificateCard';
function Contact() {
  return (
    <>
      <Box sx={{p:4,display:{xs:'none',md:'flex'},flexDirection:'column',justifyContent: 'center',flex:1}}>
        <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',}}>
          <ContactInfoCard />
          <GoogleMap />
        </Box>
        <CertificateCard />
      </Box>
      <Box sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flex:1,p:1}}>
        <ContactInfoCard />
        <GoogleMap />
        <CertificateCard />
      </Box>
    </>
    
   );
}



export default Contact;
