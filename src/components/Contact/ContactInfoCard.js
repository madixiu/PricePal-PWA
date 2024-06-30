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
  const typographyStyle = {
    display:'flex',
    mx:1,
    fontWeight:600,
    fontFamily:'Vazir'
  };
  const typographyMobileStyle = {
    display:'flex',
    mx:1,
    fontSize:12,
    fontFamily:'Vazir'
  };
  return ( 
    <>
      <Card sx={{ borderRadius:2,elevation:8 ,display:{xs:'none',md:'flex'},flexDirection:'column',marginInlineEnd:2,justifyContent: 'center', }} variant='outlined'>
      {/* <CardActionArea> */}
      
        <CardContent sx={{display: 'flex', flexDirection: 'column',flex:1,justifyContent:'space-evenly' }}>
          {/* <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography> */}
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
            <CallIcon sx={{fontSize:'1.2rem'}}/>
            <Typography variant='body1' sx={typographyStyle}>تلفن:</Typography>
            <Button size="small" sx={{direction:'ltr',color:'#000'}} onClick={()=>(window.open("https://api.whatsapp.com/send/?phone=905318608573&text&type=phone_number&app_absent=0", "_blank"))}>
              +90 (531) 860 8573
            </Button>
            {/* <Button size="small" sx={{direction:'ltr'}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
              +905318608573
            </Button> */}
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
            <MailIcon sx={{fontSize:'1.2rem'}}/>
            <Typography variant='body1' sx={typographyStyle}>ایمیل:</Typography>
            <Button size="small" sx={{color:'#000'}} onClick={() => window.location = 'mailto:info@istapex.com'}>
              info@istapex.com
            </Button>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
            <BusinessIcon sx={{fontSize:'1.2rem'}}/>
            <Typography variant='body1' sx={typographyStyle}>آدرس:</Typography>
            {/* <Typography variant='body1' sx={{display:'flex',mt:2,mb:2}}>Taya Hatun Mahallesi Tarakçılar sok. Yüksek han No 4 FATİH/İSTANBUL</Typography> */}
            <Button size="small" sx={{color:'#000'}}>
              CUMHURİYET MAH., GÜRPINAR YOLU CAD., BEYKENT İŞ MERKEZI, NO. 348, BÜYÜKÇEKMECE, İSTANBUL            
            </Button>
          </Box>
          <CardActions disableSpacing>
            <IconButton aria-label="WhatsApp" sx={{'&:hover': { color: '#25D366' }}} onClick={()=>(window.open("https://api.whatsapp.com/send/?phone=905318608573&text&type=phone_number&app_absent=0", "_blank"))}>
              <WhatsAppIcon  />
            </IconButton>
            <IconButton aria-label="Telegram" sx={{'&:hover': { color: '#2CA5E0' }}} onClick={()=>(window.open("https://t.me/istapp2", "_blank"))}>
              <TelegramIcon />
            </IconButton>
            <IconButton aria-label="Instagram" sx={{'&:hover': { color: '#FD1D1D' }}}>
              <InstagramIcon  />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
      <Card sx={{borderRadius:2,elevation:8,mt:1, display:{xs:'flex',md:'none'}}} variant='outlined'>
          <CardContent sx={{p:1}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start'}}>

              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1,}}>
                <CallIcon fontSize='small' />
                <Typography variant='body1' sx={typographyMobileStyle}>تلفن:</Typography>
                <Box >
                  <Button size="small" sx={{fontSize:10,direction:'ltr',color:'#000'}} onClick={()=>(window.open("https://api.whatsapp.com/send/?phone=905318608573&text&type=phone_number&app_absent=0", "_blank"))}>
                    +90 (531) 860 8573
                  </Button>
                  {/* <Button size="small" sx={{fontSize:10,direction:'ltr'}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
                    +905318608573
                  </Button> */}
                </Box>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1,justifyContent: 'flex-start',}}>
                <MailIcon fontSize='small' />
                <Typography variant='body1' sx={typographyMobileStyle}>ایمیل:</Typography>
                <Button size="small" sx={{fontSize:10,color:'#000'}} onClick={() => window.location = 'mailto:info@istapex.com'}>
                  info@istapex.com
                </Button>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1,justifyContent: 'flex-start',}}>
                <BusinessIcon fontSize='small' />
                <Typography variant='body1' sx={typographyMobileStyle}>آدرس:</Typography>
                {/* <Typography  sx={{color:'black',fontSize:10,display:'flex',alignItems:'flex-start',justifyContent:'flex-start'}} >
                  Taya Hatun Mahallesi Tarakçılar sok. Yüksek han No 4 FATİH/İSTANBUL
                </Typography> */}
                <span style={{fontSize:10,color:'ContactPage.text.main'}}>CUMHURİYET MAH., GÜRPINAR YOLU CAD., BEYKENT İŞ MERKEZI, NO. 348, BÜYÜKÇEKMECE, İSTANBUL</span>
              </Box>
          
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-evenly',flexDirection:'row',flexGrow:1,}}>

              <IconButton aria-label="WhatsApp" sx={{  color: '#25D366'}}  onClick={()=>(window.open("https://api.whatsapp.com/send/?phone=905318608573&text&type=phone_number&app_absent=0", "_blank"))}>
                <WhatsAppIcon  />
              </IconButton>
              <IconButton aria-label="Telegram" sx={{  color: '#2CA5E0'}}  onClick={()=>(window.open("https://t.me/istapp2", "_blank"))}>
                <TelegramIcon />
              </IconButton>
              <IconButton aria-label="Instagram" sx={{color: '#FD1D1D' }}>
                <InstagramIcon  />
              </IconButton>
            </Box>
          
        </CardContent>
      </Card>  
    </>
  );
}

export default ContactInfoCard;