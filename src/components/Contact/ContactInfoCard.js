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
import { useTranslation } from 'react-i18next';

function ContactInfoCard() {
  const { t } = useTranslation('translation');
  return ( 
    <>
      <Card sx={{ borderRadius:2,elevation:8 ,display:{xs:'none',md:'flex'},flexDirection:'column',width:'100%' }} variant='outlined'>
      {/* <CardActionArea> */}
      
        <CardContent sx={{display: 'flex', flexDirection: 'column', }}>
          {/* <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography> */}
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
            <CallIcon  sx={{ color:'ContactPage.icon.default'}}/>
            <Typography variant='body1' color="ContactPage.text.main" sx={{display:'flex',mx:1,fontWeight:600}}>{t('Contact.Phone')+':'}</Typography>
            {/* <Typography variant='body1' sx={{display:'flex',mt:2,mb:2}}>+90 554 197 1171</Typography> */}
            {/* <Typography variant='body1' sx={{display:'flex',mt:2,mb:2}}>+90 (212) 830 39 09</Typography> */}
            <Button size="small" sx={{color:'ContactPage.text.main',direction:'ltr'}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
              +90 554 197 1171
            </Button>
            <Button size="small" sx={{color:'ContactPage.text.main',direction:'ltr'}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
              +90 (212) 830 39 09
            </Button>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
            <MailIcon  sx={{ color:'ContactPage.icon.default'}}/>
            <Typography variant='body1' color="ContactPage.text.main" sx={{display:'flex',mx:1,fontWeight:600}}>{t('Contact.Email')+':'}</Typography>
            <Button size="small" sx={{color:'ContactPage.text.main'}} onClick={() => window.location = 'mailto:rima@rimafinance.com'}>
              rima@rimafinance.com
            </Button>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1}}>
            <BusinessIcon sx={{ color:'ContactPage.icon.default'}}/>
            <Typography variant='body1' color="ContactPage.text.main" sx={{display:'flex',mx:1,fontWeight:600}}>{t('Contact.Address')+':'}</Typography>
            {/* <Typography variant='body1' sx={{display:'flex',mt:2,mb:2}}>Taya Hatun Mahallesi Tarakçılar sok. Yüksek han No 4 FATİH/İSTANBUL</Typography> */}
            <Button size="small" sx={{color:'ContactPage.text.main'}} >
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
      <Card sx={{borderRadius:2,elevation:8,mt:1, display:{xs:'flex',md:'none'}}} variant='outlined'>
          <CardContent>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',p:1}}>

              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1,}}>
                <CallIcon fontSize='small' sx={{ color:'ContactPage.icon.default'}}/>
                <Typography variant='body1' color="ContactPage.text.main" sx={{display:'flex',mx:1,fontSize:12}}>{t('Contact.Phone')+':'}</Typography>
                <Box >
                  <Button size="small" sx={{color:'ContactPage.text.main',fontSize:10,direction:'ltr'}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
                    +90 554 197 1171
                  </Button>
                  <Button size="small" sx={{color:'ContactPage.text.main',fontSize:10,direction:'ltr'}} onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
                    +90 (212) 830 39 09
                  </Button>
                </Box>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1,justifyContent: 'flex-start',}}>
                <MailIcon fontSize='small' sx={{ color:'ContactPage.icon.default'}}/>
                <Typography variant='body1' sx={{display:'flex',mx:1,fontSize:12}}>{t('Contact.Email')+':'}</Typography>
                <Button size="small" sx={{color:'ContactPage.text.main',fontSize:10}} onClick={() => window.location = 'mailto:rima@rimafinance.com'}>
                  rima@rimafinance.com
                </Button>
              </Box>
              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',p:1,justifyContent: 'flex-start',}}>
                <BusinessIcon fontSize='small' sx={{ color:'ContactPage.icon.default'}}/>
                <Typography variant='body1' sx={{display:'flex',mx:1,fontSize:12}}>{t('Contact.Address')+':'}</Typography>
                {/* <Typography  sx={{color:'black',fontSize:10,display:'flex',alignItems:'flex-start',justifyContent:'flex-start'}} >
                  Taya Hatun Mahallesi Tarakçılar sok. Yüksek han No 4 FATİH/İSTANBUL
                </Typography> */}
                <span style={{fontSize:10,color:'ContactPage.text.main'}}>Taya Hatun Mahallesi Tarakçılar sok. Yüksek han No 4 FATİH/İSTANBUL</span>
              </Box>
          
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-evenly',flexDirection:'row',flexGrow:1,}}>

              <IconButton aria-label="WhatsApp" sx={{  color: '#25D366'}}  onClick={()=>(window.open("https://api.whatsapp.com/message/36WV3CP6SQO4I1?autoload=1&app_absent=0", "_blank"))}>
                <WhatsAppIcon  />
              </IconButton>
              <IconButton aria-label="Telegram" sx={{  color: '#2CA5E0'}}  onClick={()=>(window.open("https://t.me/rimafinans", "_blank"))}>
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