import React, { useState, useEffect } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button'; 
import Typography from '@mui/material/Typography';
import KickBoardImage from '../assets/KickBoard.png';
import '../styles/Rent.css';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { faFaceLaugh } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Rent({ open, onClose }) {

  const [Alc, setAlc] = useState(false); // Alc 상태 추가 및 초기값 설정
  const [disabled, setDisabled] = useState(true); // Button disabled state

  const handleEvent = (event) => {
    if (event.data === "5") {
      setAlc(true); // event.data가 "5"이면 Alc를 true로 변경
    }
  };

  useEffect(() => {
    if (Alc) {
      setDisabled(false); // 인증 성공시 버튼 활성화
    }
  }, [Alc]);

  useEffect(() => {
    window.addEventListener("message", handleEvent);
    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, []);

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
          }, 
        }}
      >
        <div className="Box-1">
          <img className="KickBoardImage" src={KickBoardImage} alt="KickBoardImage" />
          <h2 className="KickBoardName">노드링킥 1</h2>
        </div>
        <div className="Test-Both">
          <Button className="Face" style={{backgroundColor: '#e8e8e8', marginBottom:'20px', marginLeft: '20px', marginRight: '10px', padding:'20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faFaceLaugh} style={{fontSize: '25px', color:'#000000', marginRight:'20px'}} />
              <FontAwesomeIcon icon={faBeerMugEmpty} style={{fontSize: '25px', color:'#000000'}} />
            </div>
            <label className="Face-Test">{Alc ? '인증 성공' : '인증 실패'}</label> 
          </Button>
          <Button className="Bell" style={{backgroundColor: '#e8e8e8', marginBottom:'20px', marginRight: '20px', marginLeft: '10px', padding:'20px'}}>
            <FontAwesomeIcon icon={faBell} style={{fontSize: '25px', color:'#000000'}} />
            <label className="Bell-Text">벨 울리기</label>
          </Button>
        </div>
    
        <Button 
          variant="contained" 
          onClick={() => setAlc(!Alc)} 
          style={{ 
            backgroundColor: '#2d2c28', 
            color: '#ffffff',
            width: '90vw',
            height :'20vw',
            marginLeft: '5%',
            fontFamily: 'Pretendard-SemiBold'
          }}
        >
          {Alc ? '인증 실패로 변경' : '인증 성공으로 변경'}
        </Button>
      </SwipeableDrawer>
    </div>
  );
}

export default Rent;
