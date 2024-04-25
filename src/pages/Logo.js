import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import BellIcon from '@mui/icons-material/Notifications';
import KickBoardImage from '../images/KickBoard.png';
import '../css/Logo.css'; 

function BellButton({ onClick }) {
  return (
    <ListItemButton
    className='BellButton'
      disableRipple
      onClick={onClick}
      sx={{
        backgroundColor: '#dededd',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // 부모 요소의 높이와 동일하게 설정
        width: '200px', // 원하는 너비 설정
        border: '2px solid #000', // border 스타일 추가
        borderRadius: '10px', // border radius 설정
        margin: '8px', // 마진 추가
      }}
    >
      <BellIcon />
      <Typography variant="h6" sx={{ fontFamily: 'Pretendard-Bold', textAlign: 'center', marginTop: '8px' }}>벨 울리기</Typography>
    </ListItemButton>
  );
}

function NoButton({ onClick }) {
  return (
    <ListItemButton
      className='NoButton'
      disableRipple
      onClick={onClick}
      sx={{
        backgroundColor: '#dededd',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // 부모 요소의 높이와 동일하게 설정
        width: '200px', // 원하는 너비 설정
        border: '2px solid #000', // border 스타일 추가
        borderRadius: '10px', // border radius 설정
        margin: '8px', // 마진 추가
      }}
    >
      <ClearIcon />
      <Typography variant="h6" sx={{ fontFamily: 'Pretendard-Bold', textAlign: 'center', marginTop: '8px' }}>여기 없어요</Typography>
    </ListItemButton>
  );
}

export default function LogoDrawer({ open, onClose }) {
  return (
    <div>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={() => {}}
        sx={{ '& .MuiDrawer-paper': { height: 400 } }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 4,
          }}
          role="presentation"
          onClick={onClose}
          onKeyDown={onClose}
        >
             <Box sx={{ marginLeft: '350px', marginRight: '20px'}}>
            <img className="KickBoardImage" src={KickBoardImage} alt="KickBoardImage" />
          </Box>
          <Box className="name" sx={{ marginTop:'5px', display: 'flex', flexDirection: 'column', height: '32vh' }}>
            <Typography variant="h6" sx={{ marginLeft:'1vw', fontFamily: 'Pretendard-Bold', marginBottom: '5px' }}>킥보드이름: NDK1</Typography>
            <Typography variant="h6" sx={{ marginLeft:'1vw', fontFamily: 'Pretendard-Bold', marginBottom: '5px' }}>배터리 잔량: 92%</Typography>
            <Box
            sx={{
            marginTop:'30px',
            display: 'flex',
            justifyContent: 'space-between',
            }}>
            <BellButton onClick={() => {}} />
            <NoButton onClick={() => {}} />
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
