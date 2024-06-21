import React from 'react';
import { Box } from '@mui/material';
import DashboardPanel from '../components/Dashboard/DashboardPanel';
import DashboardMobile from '../components/Dashboard/DashboardMobilePanel';
import LoadingSpinner from '../components/LoadingSpinner';
function Dashboard() {
  const [loading,setLoading] = React.useState(true)
  const [ExcessData,setExcessData] = React.useState(null)




  React.useEffect(() => {
    // if (ExcessData  === null)
    getData();
  },[]);

  async function getData() {
   const response =  await fetch(`${process.env.REACT_APP_BASE_URL}excess`);
   const data = await response.json();
   const updatedObj = Object.fromEntries(Object.entries(data).map(([key, value]) => {
    if (key === 'AUDIRR')
      return [key,value]
    else if (key === 'AUD') {
      return ['AUDIRR', { ...value, code: 'AUDIRR' }];
    }
    return [key, value];
  }));
  //  console.log(updatedObj);

   setExcessData(updatedObj);
   setLoading(false);
  }





  return ( 
    <>
      <Box id="DashboardPanel" sx={{display:{md:'flex',xs:'none',flexDirection:'column'}}} height={'100%'} overflow={'auto'}>
        {loading ? <LoadingSpinner /> :
          <DashboardPanel ExcessData={ExcessData} loading={loading} />
        }  
      </Box> 
      <Box id="DashboardMobilePanel" sx={{display:{md:'none',xs:'flex'},flex:1,flexDirection:'column'}}>
        {loading ? <LoadingSpinner /> :
          <DashboardMobile ExcessData={ExcessData} loading={loading}/>
        }     
      </Box>
    </>
  );
}

export default Dashboard;