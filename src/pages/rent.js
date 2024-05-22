import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button'; 
import Typography from '@mui/material/Typography';
import KickBoardImage from '../assets/KickBoard.png';
import '../styles/Rent.css';

import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { faFaceLaugh } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 정의

export default function Rent({ open, onClose }) {
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

        <div className="Box-1">
         <img className="KickBoardImage" src={KickBoardImage} alt="KickBoardImage" />
            <h2 className="KickBoardName">킥보드이름</h2>
              </div>
                <div className="Test-Both">
                    <Button className="Face" style={{backgroundColor: '#e8e8e8', marginBottom:'20px', marginLeft: '20px', marginRight: '10px', padding:'20px' }}>
                    <FontAwesomeIcon icon={faFaceLaugh} style={{fontSize: '25px', color:'#000000'}} ></FontAwesomeIcon>
                        <label className="Face-Test">인증 실패</label>
                    </Button>

                    <Button className="Alchol" style={{backgroundColor: '#e8e8e8' , marginBottom:'20px', marginRight: '20px', marginLeft: '10px', padding:'20px'}}>
                    <FontAwesomeIcon icon={faBeerMugEmpty} style={{fontSize: '25px', color:'#000000'}}></FontAwesomeIcon>
                        <label className="Alchol-Test">인증 실패</label>
                    </Button>
                </div>

              <Button variant="contained" style={{left:'5%', backgroundColor: '#2d2c28', color: '#ffffff', height:'10vh' ,width: '90vw' }} >
          <Typography variant="h6" sx={{fontFamily: 'Pretendard-Bold' }}>대여하기</Typography>
        </Button>

      </SwipeableDrawer>
    </div>
  );
}