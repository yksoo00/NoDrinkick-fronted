import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button'; 
import Typography from '@mui/material/Typography';
import KickBoardImage from '../assets/KickBoard.png';
import '../styles/Rent.css';

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
            height: 700,
            borderTopLeftRadius: '20px', 
            borderTopRightRadius: '20px', 

           }, }}
      >
        <div className="Box-1">
         <img className="KickBoardImage" src={KickBoardImage} alt="KickBoardImage" />
            <h2 className="KickBoardName">킥보드이름</h2>
              </div>

          <div className="Face">
           <h2 className="Face-Text">얼굴인식</h2>
             <label className="Face-Test">인증완료</label>
               </div>


         <div className="Alchol">
            <h2 className="Alchol-Text">음주측정</h2>
            <label className="Alchol-Test">인증완료</label>
              </div>

              <Button variant="contained" style={{left:'5%', backgroundColor: '#2d2c28', color: '#ffffff', height:'10vh' ,width: '90vw' }} >
          <Typography variant="h6" sx={{fontFamily: 'Pretendard-Bold' }}>대여하기</Typography>
        </Button>

      </SwipeableDrawer>
    </div>
  );
}