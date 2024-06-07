import React, { useState, useEffect } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KickBoardImage from '../assets/KickBoard.png';
import '../styles/Rent.css';
import Test from '../component/test'; 
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBeerMugEmpty, faFaceLaugh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from '@mui/material';
import { sendEmergencyMessage } from '../services/rent';
import { fetchUserData } from '../services/userService';
import axios from 'axios';

function Rent({ open, onClose, gpsId }) { // id props 추가
  const [Alc, setAlc] = useState(false);
  const [face, setFace] = useState(false);
  const [memberInfo, setMemberInfo] = useState({});
  const [ws, setWs] = useState(null);
  const [wsMessages, setWsMessages] = useState([]);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [returnAlc, setReturnAlc] = useState(false);
  const [returnFace, setReturnFace] = useState(false);
  const [AuthState, setAuthState] = useState(false); // 인증 상태를 관리합니다.
  const isLargeScreen = useMediaQuery('(min-width:1440px) and (max-height:1440px)');
  const [AuthRentState, setAuthRentState] = useState(false); 
  const [gpsData, setGpsData] = useState([]);

  useEffect(() => {
    fetchUserData().then(userData => {
      setMemberInfo(userData);
    }).catch(error => {
      console.error('사용자 정보 가져오기 오류', error);
    });

    fetchRentState();
    fetchGpsData();
  }, []);

  const fetchRentState = async () => {
    try {
      const response = await axios.get('http://13.125.168.244:8080/rent');
      setAuthRentState(response.data);
    } catch (error) {
      console.error('API 서버 오류', error);
    }
  };

  const fetchGpsData = async () => {
    try {
      const response = await axios.get('http://13.125.168.244:8080/gps');
      setGpsData(response.data);
    } catch (error) {
      console.error('API 서버오류', error);
    }
  };

  const handleWebSocketMessage = (data) => {
    console.log("서버로부터 받은 메시지:", data);
    setWsMessages(prevMessages => [...prevMessages, data]);

    switch(data) {
      case "33":
        sendMessageToAll();
        break;
      case "5":
        setAlc(true);
        break;
      case "2":
        setFace(true);
        break;
      case "20":
        setReturnAlc(true);
        break;
      case "50":
        setReturnFace(true);
        break;
      default:
        break;
    }
  };

  const sendMessageToAll = async () => {
    try {
      const response = await sendEmergencyMessage();
      alert(response);
    } catch (error) {
      alert(error.message);
    }
  };

  const ReturnKickBoard = () => {
    setIsTestOpen(true);
  };
  
  const handleFaceButtonClick = () => {
    setIsTestOpen(true);
  };

  const handleStartTest = () => {
    setIsTestOpen(false);
  };

  const isLicenseValid = memberInfo.license === true;

  return (
    <div>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={() => {}}
        sx={{ 
          '& .MuiDrawer-paper': { 
            height: 400,
            borderTopLeftRadius: '20px', 
            borderTopRightRadius: '20px',
          }
        }}
      >
        <div className='Rent-All'>
          <div className="Box-1">
            <img className="KickBoardImage" src={KickBoardImage} alt="KickBoardImage" />
            <h2 className="KickBoardName">{gpsId}</h2> {/* 수정된 부분 */}
          </div>
          <div className="Test-Both">
            <Button 
              className="Face" 
              style={{backgroundColor: '#e8e8e8', marginBottom:'20px', marginLeft: '20px', marginRight: '10px', padding:'20px' }} 
              onClick={handleFaceButtonClick}
              disabled={AuthRentState || !isLicenseValid}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faFaceLaugh} style={{fontSize: '25px', color:'#000000', marginRight:'20px'}} />
                <FontAwesomeIcon icon={faBeerMugEmpty} style={{fontSize: '25px', color:'#000000'}} />
              </div>
              <label className="Face-Test" style={{ color: AuthRentState || !isLicenseValid ? 'red' : '#000000' }}>
                {AuthRentState ? '대여 중 입니다' : (!isLicenseValid ? '면허증 등록이 필요합니다' : '대여하기')}
              </label>
            </Button>
            <Button className="Bell" style={{backgroundColor: '#e8e8e8', marginBottom:'20px', marginRight: '20px', marginLeft: '10px', padding:'20px'}}
              disabled={AuthRentState}>
              <FontAwesomeIcon icon={faBell} style={{fontSize: '25px', color:'#000000'}}></FontAwesomeIcon>
              <label className="Bell-Text">{AuthRentState ? 'X' : '벨 울리기'}</label>
            </Button>
          </div>
        </div>
        <Button
          variant="contained"
          style={{
            left: isLargeScreen ? '27.5%' :'5%',
            backgroundColor: AuthRentState ? '#2d2c28' : '#e8e8e8',
            color: '#ffffff',
            height: '10vh',
            width: isLargeScreen ? '44.2vw' : '90vw'
          }}
          disabled={!AuthRentState}
        >
          <Typography variant="h6" onClick={ReturnKickBoard} sx={{fontFamily: 'Pretendard-Bold', fontSize : '20px' }}>반납하기</Typography>
        </Button>
      </SwipeableDrawer>
      <Test
        isOpen={isTestOpen}
        onClose={() => setIsTestOpen(false)}
        onStartTest={handleStartTest}
        setAuthState={setAuthState}
        ws={ws}
        handleWebSocketMessage={handleWebSocketMessage}
      />
    </div>
  );
}

export default Rent;
