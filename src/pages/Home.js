import React from 'react';
import { Box, Typography } from '@mui/material';
import CurrencyGrid from '../components/Home/CurrencyGrid';
import CurrencyTable from '../components/Home/CurrencyTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { sortDataArray } from '../misc/dateFixer';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Modal from '@mui/material/Modal';
function Home() {
  const [CurrencyData,setCurrencyData] = React.useState([])
  const [ModalOpen, setModalOpen] = React.useState(false);
  const [ModalText, setModalText] = React.useState('');
  const handleClose = () => setModalOpen(false);

  const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
  };
  function getCurrencyData() {
    fetch(`${process.env.REACT_APP_BASE_URL}pricev2`)
      .then(res => res.json())
      .then(data => {
        let tetherData = (data.parity)
        tetherData = tetherData.filter(item => item.code === 'USDIRRt')
        tetherData = tetherData[0];
        tetherData.slug = 'usdt'
        tetherData.code = 'USDTIRR'
        let CurrencyData = data.assets;
        CurrencyData.push(tetherData);
        CurrencyData = sortDataArray(CurrencyData);
        setCurrencyData(CurrencyData);
      })  
      .catch(err => console.error(err));
  }
  function getPromotionStatus() {
    fetch(`${process.env.REACT_APP_BASE_URL}promo_status`)
      .then(res => res.json())
      .then(data => {
         setModalOpen(data.enabled);
        //  setPromotionText(data.textvalue);
       })
      .catch(err => console.error(err));
  }
  function getPromotionText() {
    fetch(`${process.env.REACT_APP_BASE_URL}get_promo_text`)
      .then(res => res.json())
      .then(data => {
         setModalText(data.textvalue);
      })

  }
  // React.useEffect(() => {
  //   return () => {
  //     setModalCheck(false);
  //   };
  // }, []);
  React.useEffect(() => {
    const modalShown = sessionStorage.getItem('modalShown');
    if(!modalShown) {
      getPromotionStatus();
      getPromotionText();
      sessionStorage.setItem('modalShown', true);
    }
    
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
              <ErrorOutlineIcon sx={{color:'#aaa',fontSize:'1rem',marginInlineEnd:0.5}}/>
              <Typography sx={{fontSize: '1rem',color: '#aaa',fontWeight: 'normal'}}>
                نرخ ها صرفا جهت ملاحظه می باشد
              </Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
              <ErrorOutlineIcon sx={{color:'#aaa',fontSize:'1rem',marginInlineEnd:0.5}}/>
              <Typography sx={{fontSize: '1rem',color: '#aaa',fontWeight: 'normal'}}>
                نرخ ها اعلامی برای مبالغ هزار دلار (یا معادل آن) می باشد          
              </Typography>
            </Box>
          </Box>
            <Modal
              open={ModalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={ModalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  پیشنهاد ویژه
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 7 }}>
                  {ModalText}
                </Typography>
              </Box>
            </Modal> 
        <CurrencyTable CurrencyData={CurrencyData} />
      </Box>
      <Box id="HomeXS" sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flex:1 }}>
        {/* <CurrencyList CurrencyData={CurrencyData}/> */}
        <Box sx={{flex:1,p:0.5, }}>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>

            <ErrorOutlineIcon sx={{color:'#aaa',fontSize:'0.7rem',marginInlineEnd:0.5}}/>
            <Typography sx={{fontSize: '0.7rem',color: '#aaa',fontWeight: 'normal'}}>
              نرخ ها صرفا جهت ملاحظه می باشد
            </Typography>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>

            <ErrorOutlineIcon sx={{color:'#aaa',fontSize:'0.7rem',marginInlineEnd:0.5}}/>
            <Typography sx={{fontSize: '0.7rem',color: '#aaa',fontWeight: 'normal'}}>
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
