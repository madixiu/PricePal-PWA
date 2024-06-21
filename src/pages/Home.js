import React from 'react';
import { Box } from '@mui/material';
import CurrencyGrid from '../components/Home/CurrencyGrid';
import CurrencyTable from '../components/Home/CurrencyTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { sortDataArray } from '../misc/dateFixer';
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
      <Box id="HomeXS" sx={{px: 2,pt:2,display:{xs:'none',md:'flex',flexDirection:'column'}}}>
        <CurrencyTable CurrencyData={CurrencyData} />
      </Box>
      <Box sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flex:1,backgroundColor: '#efefef', }}>
        {/* <CurrencyList CurrencyData={CurrencyData}/> */}
        <CurrencyGrid CurrencyData={CurrencyData}/>
      </Box>
      </>
    );
}

export default Home;
