import React from 'react';
// import CurrencyTable from '../components/Home/CurrencyTable'
import { Box } from '@mui/material';
import CurrencyList from '../components/Home/CurrencyList';
import CurrencyTableV2 from '../components/Home/CurrencyTableV2';
import LoadingSpinner from '../components/LoadingSpinner';
function Home() {
  const [CurrencyData,setCurrencyData] = React.useState([])

  function getCurrencyData() {
    fetch(`${process.env.REACT_APP_BASE_URL}pricev2`).then(res => res.json()).then(data => {
      setCurrencyData(data)
    }).catch(err => console.log(err))
  }
  React.useEffect(() => {
    if (CurrencyData.length === 0)
      getCurrencyData()
  }, [CurrencyData])
  return ( 
    <>
     <Box id="HomeXS" sx={{px: 2,pt:2,display:{xs:'none',md:'flex',flexDirection:'column'}}}>
      {/* <CurrencyTable /> */}
      {CurrencyData.length === 0 ? <LoadingSpinner />  : <CurrencyTableV2 CurrencyData={CurrencyData.assets} />}
    </Box>
    <Box sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flexWrap:'nowrap'}}>
      <CurrencyList />
    </Box>
    {/* <Box sx={{p: 1,pb:7,display:{xs:'flex',md:'none',flexDirection:'column'}}}>
      <CurrencyTable />
    </Box> */}
    </>
   );
}

export default Home;
