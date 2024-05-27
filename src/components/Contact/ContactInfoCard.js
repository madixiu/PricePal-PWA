import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActions } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import BusinessIcon from '@mui/icons-material/Business';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';

function ContactInfoCard() {
  return ( 
    <Card sx={{ borderRadius:2,elevation:8 }} variant='outlined'>
    {/* <CardActionArea> */}
     
      <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',}}>
        {/* <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography> */}
        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
          <CallIcon />
          <Typography variant='body1' sx={{display:'flex',mx:1,fontWeight:600}}>Phone:</Typography>
          {/* <Typography variant='body1' sx={{display:'flex',mt:2,mb:2}}>+90 554 197 1171</Typography> */}
          {/* <Typography variant='body1' sx={{display:'flex',mt:2,mb:2}}>+90 (212) 830 39 09</Typography> */}
          <Button size="small" sx={{color:'black'}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
            +90 554 197 1171
          </Button>
          <Button size="small" sx={{color:'black'}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
            +90 (212) 830 39 09
          </Button>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
          <MailIcon />
          <Typography variant='body1' sx={{display:'flex',mx:1,fontWeight:600}}>E-mail:</Typography>
          {/* <Typography variant='body1' sx={{display:'flex',mt:2,mb:2}}>rima@rimafinance.com</Typography> */}
          <Button size="small" sx={{color:'black'}} onClick={() => window.location = 'mailto:rima@rimafinance.com'}>
            rima@rimafinance.com
          </Button>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
          <BusinessIcon />
          <Typography variant='body1' sx={{display:'flex',mx:1,fontWeight:600}}>Address:</Typography>
          {/* <Typography variant='body1' sx={{display:'flex',mt:2,mb:2}}>Taya Hatun Mahallesi Tarakçılar sok. Yüksek han No 4 FATİH/İSTANBUL</Typography> */}
          <Button size="small" sx={{color:'black'}} >
            Taya Hatun Mahallesi Tarakçılar sok. Yüksek han No 4 FATİH/İSTANBUL
          </Button>
        </Box>
        <CardActions disableSpacing>
          <IconButton aria-label="WhatsApp" sx={{'&:hover': { color: '#25D366' }}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
            <WhatsAppIcon  />
          </IconButton>
          <IconButton aria-label="Telegram" sx={{'&:hover': { color: '#2CA5E0' }}} onClick={()=>(window.open("https://t.me/rimafinans", "_blank"))}>
            <TelegramIcon />
          </IconButton>
          <IconButton aria-label="Instagram" sx={{'&:hover': { color: '#FD1D1D' }}}>
            <InstagramIcon  />
          </IconButton>
        </CardActions>
      </CardContent>
  </Card>  
);
}

export default ContactInfoCard;