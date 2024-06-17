import React from 'react';
// import CurrencyTable from '../components/Home/CurrencyTable'
import { Box } from '@mui/material';
// import CurrencyList from '../components/Home/CurrencyList';
import CurrencyList from '../components/Home/CurrencyList';
import CurrencyTable from '../components/Home/CurrencyTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { sortDataArray } from '../misc/dateFixer';
function Home() {
  const [CurrencyData,setCurrencyData] = React.useState([])

  function getCurrencyData() {
    fetch(`${process.env.REACT_APP_BASE_URL}pricev2`).then(res => res.json()).then(data => {
      // console.log(data);
      let CurrencyData = sortDataArray(data.assets);
      setCurrencyData(CurrencyData)
    }).catch(err => console.log(err))
  }
  React.useEffect(() => {
    if (CurrencyData.length === 0)
      // return
      getCurrencyData()
  }, [CurrencyData])

  if (CurrencyData.length === 0)
    return <LoadingSpinner />
  else
    return ( 
      <>
      <Box id="HomeXS" sx={{px: 2,pt:2,display:{xs:'none',md:'flex',flexDirection:'column'}}}>
        <CurrencyTable CurrencyData={CurrencyData}/>
      </Box>
      <Box sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flexWrap:'nowrap'}}>
        <CurrencyList CurrencyData={CurrencyData}/>
      </Box>
      </>
    );
}

export default Home;
