import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Test({ isOpen, onClose, onStartTest }) {
  
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '20px',
        width: '80%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h5" id="auth-modal-title" sx={{ fontSize: 20, fontFamily: 'Pretendard-Bold', marginBottom: '20px', textAlign: 'center' }}>
          인증을 진행해주세요
        </Typography>
        <Button variant="contained" onClick={() => onStartTest("5")} sx={{ backgroundColor: '#2d2c28', fontSize: 12, fontFamily: 'Pretendard-Bold', width: '50%', marginTop: 'auto' }}>
  인증 시작
</Button>
      </div>
    </Modal>
  );
}

export default Test;
