import {useEffect,useState} from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
function GoogleMap() {
  // const [windowWidth, setWindowWidth] = useState(null);
  const [windowHeight, setWindowHeight] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
  
      // Optionally, you can also listen for window resize events and update dimensions accordingly:
      window.addEventListener('resize', () => {
        // setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      });
  
      // Don't forget to clean up the event listener when unmounting the component:
      return () => {
        window.removeEventListener('resize', () => {
          // setWindowWidth(window.innerWidth);
          setWindowHeight(window.innerHeight);
        });
      };
    }
  }, []);
  return (
    <>
    <Box sx={{display:{xs:'none',md:'flex',flexDirection:'column',flex:1}}}>
      <Card sx={{borderRadius:2}} variant='outlined'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.358252514907!2d28.627319!3d41.0174175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f003aacb281%3A0x82c467f977f846d7!2sResort%20M%20Bangkok!5e0!3m2!1sen!2sdk!4v1719246129864!5m2!1sen!2sdk"
          width={'100%'}
          height={windowHeight*0.4}
          style={{ border: 0,borderRadius:8 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        >
        </iframe>
      </Card>
  
    </Box>
    <Box sx={{pt:2,display:{xs:'flex',md:'none'},flexDirection:'column'}}>
      <Card sx={{borderRadius:2}} variant='outlined'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.358252514907!2d28.627319!3d41.0174175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f003aacb281%3A0x82c467f977f846d7!2sResort%20M%20Bangkok!5e0!3m2!1sen!2sdk!4v1719246129864!5m2!1sen!2sdk"
          width={'100%'}
          height={windowHeight*0.35}
          style={{ border: 0,borderRadius:8 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        >
        </iframe>
      </Card>
    </Box>
    
    </>
  );
}


export default GoogleMap;