import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button'; 
import Typography from '@mui/material/Typography';
import KickBoardImage from '../assets/KickBoard.png';
import '../styles/Rent.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios를 import합니다.
import { Link } from 'react-router-dom';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { faFaceLaugh } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 정의
function Rent({ open, onClose }) {
 
  let [Alc, setAlc] = useState(false); 
  const [memberInfo, setMemberInfo] = useState({}); // 회원 정보 상태 추가
  const [ws, setWs] = useState(null);
  const [wsMessages, setWsMessages] = useState([]); // WebSocket 메시지 상태 추가


    const fetchMemberInfoAndConnect = async () => {
      try {
        const response = await axios.get('/members/info');
        const memberInfo = response.data;
        setMemberInfo(memberInfo); // 회원 정보 상태 설정

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
      const response = await axios.post('http://13.125.168.244:8080/emergency-contacts/sendSNS');
      alert(response.data);
    } catch (error) {
      alert("메시지 전송 중 오류가 발생했습니다: " + error.response.data);
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
            height: 430,
            borderTopLeftRadius: '20px', 
            borderTopRightRadius: '20px', 

           }, }}
      >

        <div className="Box-1">
         <img className="KickBoardImage" src={KickBoardImage} alt="KickBoardImage" />
            <h2 className="KickBoardName">노드링킥 1</h2>
              </div>
                <div className="Test-Both">
                <Button className="Face" style={{backgroundColor: '#e8e8e8', marginBottom:'20px', marginLeft: '20px', marginRight: '10px', padding:'20px' }}onClick={fetchMemberInfoAndConnect}>
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

              <Button variant="contained"  style={{left:'5%', backgroundColor: '#2d2c28', color: '#ffffff', height:'10vh' ,width: '90vw' }} >
          <Typography variant="h6" sx={{fontFamily: 'Pretendard-Bold' }}>대여하기</Typography>
        </Button>

      </SwipeableDrawer>
    </div>
  );
}

export default Rent;