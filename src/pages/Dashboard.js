import React from 'react';
import { Box } from '@mui/material';
import DashboardPanel from '../components/Dashboard/DashboardPanel';
import DashboardMobile from '../components/Dashboard/DashboardMobilePanel';
import LoadingSpinner from '../components/LoadingSpinner';
function Dashboard() {
  const [loading,setLoading] = React.useState(true)
  const [ExcessData,setExcessData] = React.useState(
    {
      "EURIRR": {
          "code": "EURIRR",
          "buy": 0,
          "sell": 0
      },
      "USDIRR": {
          "code": "USDIRR",
          "buy": 0,
          "sell": 0
      }
  });



  React.useEffect(() => {
    if (ExcessData.USDIRR.buy === 0)
    getData();
  },[ExcessData]);

  async function getData() {
   const response =  await fetch(`${process.env.REACT_APP_BASE_URL}excess`);
   const data = await response.json();
   setExcessData(data);
   setLoading(false);
  }





  return ( 
    <>
      <Box id="DashboardPanel" sx={{display:{md:'flex',xs:'none'}}}>
        {loading ? <LoadingSpinner /> :
          <DashboardPanel  ExcessData={ExcessData} loading={loading} />
        }  
      </Box> 
      <Box id="DashboardMobilePanel" sx={{display:{md:'none',xs:'flex'},flexWrap:'nowrap',flex:1}}>
        {loading ? <LoadingSpinner /> :
          <DashboardMobile ExcessData={ExcessData} loading={loading}/>
        }     
      </Box>
    </>
  );
}

export default Dashboard;