import React from 'react';

import { Box } from '@mui/material';
import ContactInfoCard from '../components/Contact/ContactInfoCard';
import GoogleMap from '../components/Contact/GoogleMap';
function Contact() {
  return (
    <>
      <Box sx={{p:4,display:{xs:'none',md:'flex',flexDirection:'column'}}}>
        <ContactInfoCard />
        <GoogleMap />
      </Box>
      <Box sx={{display:{xs:'flex',md:'none'},flexDirection:'column',p:1}}>
        <ContactInfoCard />
        <GoogleMap />
      </Box>
    </>
    
   );
}



export default Contact;
