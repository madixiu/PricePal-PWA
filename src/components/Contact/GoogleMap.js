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
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d500.64168809717034!2d28.968668621797395!3d41.01246846666801!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab993bcd07255%3A0x7c7c061923787f3b!2zVGF5YSBIYXR1biwgVGFyYWvDp8SxbGFyIENkLiBObzoxNiBEOjI2LCAzNDEyMCBGYXRpaC_EsHN0YW5idWwsIFTDvHJraXll!5e0!3m2!1sen!2srs!4v1716816235120!5m2!1sen!2srs"
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d500.64168809717034!2d28.968668621797395!3d41.01246846666801!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab993bcd07255%3A0x7c7c061923787f3b!2zVGF5YSBIYXR1biwgVGFyYWvDp8SxbGFyIENkLiBObzoxNiBEOjI2LCAzNDEyMCBGYXRpaC_EsHN0YW5idWwsIFTDvHJraXll!5e0!3m2!1sen!2srs!4v1716816235120!5m2!1sen!2srs"
          width={'100%'}
          height={windowHeight*0.2}
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