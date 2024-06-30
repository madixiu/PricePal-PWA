import React from 'react';
import { Box, Typography } from '@mui/material';
import CurrencyGrid from '../components/Home/CurrencyGrid';
import CurrencyTable from '../components/Home/CurrencyTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { sortDataArray } from '../misc/dateFixer';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Modal from '@mui/material/Modal';
// import { setUpdateTime } from '../redux/updateTimeSlice'
// import { useDispatch } from 'react-redux';
import {formatTime2} from '../misc/dateFixer'
// import UpdateIcon from '@mui/icons-material/Update';

function Home() {
  const [CurrencyData,setCurrencyData] = React.useState([])
  const [ModalOpen, setModalOpen] = React.useState(false);
  const [ModalText, setModalText] = React.useState('');
  const [lastUpdateTime, setLastUpdateTime] = React.useState(null);
  const handleClose = () => setModalOpen(false);
  // const dispatch = useDispatch();

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
        let updateTime = CurrencyData.find(item => item.code === 'USDIRR').lastUpdate;
        updateTime = formatTime2(updateTime);
        setLastUpdateTime(updateTime);
        //! LINE BELLOW SHOULD BE REMOVED
        // dispatch(setUpdateTime(updateTime)); 
      })  
      .catch(err => console.error(err));
  }
  function getPromotionStatus() {
    fetch(`${process.env.REACT_APP_BASE_URL}promo_status`)
      .then(res => res.json())
      .then(data => {
         setModalOpen(data.enabled);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Typography sx={{fontSize: '1rem',color: '#555',fontWeight: 'normal',fontFamily:'Vazir'}}>
                نرخ ها صرفا جهت ملاحظه می باشد
              </Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
              <ErrorOutlineIcon sx={{color:'#555',fontSize:'1rem',marginInlineEnd:0.5}}/>
              <Typography sx={{fontSize: '1rem',color: '#555',fontWeight: 'normal',fontFamily:'Vazir'}}>
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
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily:'Vazir'}}>
                  پیشنهاد ویژه
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 7 ,fontFamily:'Vazir'}}>
                  {ModalText}
                </Typography>
              </Box>
            </Modal> 
        <CurrencyTable CurrencyData={CurrencyData} />
      </Box>



      <Box id="HomeXS" sx={{display:{xs:'flex',md:'none'},flexDirection:'column',flex:1,overflow:'hidden' }}>
        <Box sx={{display:'flex',px:1,justifyContent: 'flex-start',flexDirection:'row',alignItems:'center' }}>
          <Typography sx={{fontSize:'0.7rem',fontWeight:600,color:'#555',letterSpacing:'1px'}}>
            {lastUpdateTime}
          </Typography>
          {/* <UpdateIcon sx={{fontSize:'0.9rem'}}/> */}
        </Box>
        <Box sx={{ overflowY: 'auto', flex: 1 }}>
          <CurrencyGrid CurrencyData={CurrencyData} />
          <Box sx={{flex:1,p:0.5,mb:10 }}>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
              <ErrorOutlineIcon sx={{color:'#555',fontSize:'0.7rem',marginInlineEnd:0.5}}/>
              <Typography sx={{fontSize: '0.7rem',color: '#555',fontWeight: 'normal',fontFamily:'Vazir'}}>
                نرخ ها صرفا جهت ملاحظه می باشد
              </Typography>
            </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent: 'center',alignItems:'center'}}>
              <ErrorOutlineIcon sx={{color:'#555',fontSize:'0.7rem',marginInlineEnd:0.5}}/>
              <Typography sx={{fontSize: '0.7rem',color: '#555',fontWeight: 'normal',fontFamily:'Vazir'}}>
                نرخ ها اعلامی برای مبالغ هزار دلار (یا معادل آن) می باشد          
              </Typography>
            </Box>
          </Box>  
        </Box>
      </Box>
      </>
    );
}

export default Home;
