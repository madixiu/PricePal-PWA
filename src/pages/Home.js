import React from 'react';
import { Box, Typography } from '@mui/material';
import CurrencyGrid from '../components/Home/CurrencyGrid';
import CurrencyTable from '../components/Home/CurrencyTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { sortDataArray } from '../misc/dateFixer';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
function Home() {
  const [CurrencyData,setCurrencyData] = React.useState([])

  function getCurrencyData() {
    fetch(`${process.env.REACT_APP_BASE_URL}pricev2`)
      .then(res => res.json())
      .then(data => {
        let CurrencyData = sortDataArray(data.assets);
        setCurrencyData(CurrencyData);
      })  
      .catch(err => console.log(err));
  }
  React.useEffect(() => {
    getCurrencyData(); // Fetch data initially

    // Set an interval to fetch data every 15 seconds
    const interval = setInterval(getCurrencyData, 15000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect only once
  if (CurrencyData.length === 0)
    return <LoadingSpinner />
  else
    return ( 
      <>
      <Box id="HomeMD" sx={{px: 2,pt:2,display:{xs:'none',md:'flex',flexDirection:'column'}}}>
          <Box sx={{flex:1,p:0.5,justifyContent: 'center', }}>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
              <ErrorOutlineIcon sx={{color:'#555',fontSize:'1rem',marginInlineEnd:0.5}}/>
              <Typography sx={{fontSize: '1rem',color: '#555',fontWeight: 'normal'}}>
                نرخ ها صرفا جهت ملاحظه می باشد
              </Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
              <ErrorOutlineIcon sx={{color:'#555',fontSize:'1rem',marginInlineEnd:0.5}}/>
              <Typography sx={{fontSize: '1rem',color: '#555',fontWeight: 'normal'}}>
                نرخ ها اعلامی برای مبالغ هزار دلار (یا معادل آن) می باشد          
              </Typography>
            </Box>
          </Box> 
        <CurrencyTable CurrencyData={CurrencyData} />
      </Box>
      <Box id="HomeXS" sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flex:1,backgroundColor: '#efefef', }}>
        {/* <CurrencyList CurrencyData={CurrencyData}/> */}
        <Box sx={{flex:1,p:0.5, }}>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>

            <ErrorOutlineIcon sx={{color:'#555',fontSize:'0.7rem',marginInlineEnd:0.5}}/>
            <Typography sx={{fontSize: '0.7rem',color: '#555',fontWeight: 'normal'}}>
              نرخ ها صرفا جهت ملاحظه می باشد
            </Typography>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>

            <ErrorOutlineIcon sx={{color:'#555',fontSize:'0.7rem',marginInlineEnd:0.5}}/>
            <Typography sx={{fontSize: '0.7rem',color: '#555',fontWeight: 'normal'}}>
              نرخ ها اعلامی برای مبالغ هزار دلار (یا معادل آن) می باشد          
            </Typography>
          </Box>
        </Box>    
        <CurrencyGrid CurrencyData={CurrencyData}/>
      </Box>
      </>
    );
}

export default Home;
