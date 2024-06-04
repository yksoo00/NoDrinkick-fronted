import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button'; 
import Typography from '@mui/material/Typography';
import KickBoardImage from '../assets/KickBoard.png';
import '../styles/Rent.css';
import Test from '../component/test'
import React, { useState, useEffect } from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { faFaceLaugh } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 정의
import { useMediaQuery } from '@mui/material';
import { sendEmergencyMessage } from'../services/rent';
import { fetchUserData } from '../services/userService';
function Rent({ open, onClose }) {
 
  let [Alc, setAlc] = useState(false); 
  const [memberInfo, setMemberInfo] = useState({}); // 회원 정보 상태 추가
  const [ws, setWs] = useState(null);
  const [wsMessages, setWsMessages] = useState([]); // WebSocket 메시지 상태 추가
  const [isTestOpen, setisTestOpen] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:1440px) and (max-height:1440px)');

  const handleStartTest = () => {
    fetchMemberInfoAndConnect();
    setisTestOpen(false);
  };


  const fetchMemberInfoAndConnect = async () => {
    try {
      const memberInfo = await fetchUserData();
      setMemberInfo(memberInfo);

      const username = encodeURIComponent(memberInfo.username); // 회원 정보 중 username 추출

      const wsUrl = `ws://192.168.42.197:8765/ws?username=${username}`;
      const newWs = new WebSocket(wsUrl);

      newWs.onopen = () => console.log("WebSocket 연결 성공");

      sendNumber();
      newWs.onmessage = (event) => {
        console.log("서버로부터 받은 메시지:", event.data);
        setWsMessages(prevMessages => [...prevMessages, event.data]); // 새로운 메시지를 상태에 추가

        if (event.data === "33") {
          sendMessageToAll();
        }

        if(event.data === "5"){
          Alc = true;
          setAlc(Alc);
        }
      };

      setWs(newWs);
    } catch (error) {
      console.error('API 호출 또는 WebSocket 연결 중 오류 발생:', error);
    }
  };

  const sendNumber = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send('1');
    } else {
      console.error('WebSocket이 연결 상태가 아닙니다.');
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

           }, }}
      >
        <div className='Rent-All'>
        <div className="Box-1">
         <img className="KickBoardImage" src={KickBoardImage} alt="KickBoardImage" />
            <h2 className="KickBoardName">노드링킥 1</h2>
              </div>
                <div className="Test-Both">
                <Button className="Face" style={{backgroundColor: '#e8e8e8', marginBottom:'20px', marginLeft: '20px', marginRight: '10px', padding:'20px' }} onClick={() => setisTestOpen(true)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFaceLaugh} style={{fontSize: '25px', color:'#000000', marginRight:'20px'}} />
            <FontAwesomeIcon icon={faBeerMugEmpty} style={{fontSize: '25px', color:'#000000'}} />
            </div>
            <label className="Face-Test">{Alc ? '인증 성공' : '인증 실패'}</label> 
          </Button>


                    <Button className="Bell" style={{backgroundColor: '#e8e8e8' , marginBottom:'20px', marginRight: '20px', marginLeft: '10px', padding:'20px'}}>
                    <FontAwesomeIcon icon={faBell} style={{fontSize: '25px', color:'#000000'}}></FontAwesomeIcon>
                        <label className="Bell-Text">벨 울리기</label>
                    </Button>
                </div>
                </div>
                <Button
        variant="contained"
        style={{
          left: isLargeScreen ? '27.5%' :'5%',
          backgroundColor: '#2d2c28',
          color: '#ffffff',
          height: '10vh',
          width: isLargeScreen ? '44.2vw' : '90vw'
        }}
      >
          <Typography variant="h6" sx={{fontFamily: 'Pretendard-Bold', fontSize : '20px' }}>대여하기</Typography>
        </Button>

      </SwipeableDrawer>
      <Test
        isOpen={isTestOpen}
        onClose={() => setisTestOpen(false)}
        onStartTest={handleStartTest}
        />
    </div>
  );
}

export default Rent;