import React from 'react';

import { Box } from '@mui/material';
import ContactInfoCard from '../components/Contact/ContactInfoCard';
import GoogleMap from '../components/Contact/GoogleMap';
function Contact() {
  return ( 
    <Box sx={{p:4}}>
      <ContactInfoCard />
      <GoogleMap />
    </Box>
   );
}



export default Contact;
