import React, { useState } from 'react';
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

  const handleEvent = (event) => {
    if (event.data === "5") {
      setAlc(true); // event.data가 "5"이면 Alc를 true로 변경
    }
  };

  window.addEventListener("message", handleEvent);

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
                <Button className="Face" style={{backgroundColor: '#e8e8e8', marginBottom:'20px', marginLeft: '20px', marginRight: '10px', padding:'20px' }}>
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