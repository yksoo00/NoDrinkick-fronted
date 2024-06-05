import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { sendEmergencyMessage } from '../services/rent';
import { fetchUserData, fetchUserProfileImage } from '../services/userService';

function Test({ isOpen, onClose, setAuthState }) {
  const [showMessage, setShowMessage] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showBreathMessage, setShowBreathMessage] = useState(false);
  const [showFaceRecognitionMessage, setShowFaceRecognitionMessage] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [returnAlc, setReturnAlc] = useState(false);
  const [returnFace, setReturnFace] = useState(false);
  const [Alc, setAlc] = useState(false);
  const [face, setFace] = useState(false);
  const [faceMessage, setfaceMessage] = useState(false);
  const [memberInfo, setMemberInfo] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [wsMessages, setWsMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [buttonText, setButtonText] = useState("인증시작");

  const handleWebSocketMessage = (data) => {
    console.log("서버로부터 받은 메시지:", data);
    setWsMessages(prevMessages => [...prevMessages, data]);

    switch (data) {
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

  const fetchMemberInfoAndConnect = async () => {
    try {
      const memberInfo = await fetchUserData();
      setMemberInfo(memberInfo);
      const username = encodeURIComponent(memberInfo.username);
      const wsUrl = `ws://192.168.15.197:8765/ws?username=${username}`;
      const newWs = new WebSocket(wsUrl);
      newWs.onopen = () => console.log("WebSocket 연결 성공");
      newWs.onmessage = (event) => handleWebSocketMessage(event.data);

      setWs(newWs);

      // Fetch profile image URL
      const imageUrl = await fetchUserProfileImage(memberInfo.memberId);
      setProfileImageUrl(imageUrl);
    } catch (error) {
      console.error('API 호출 또는 WebSocket 연결 중 오류 발생:', error);
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

  const handleStartAuth = () => {
    if (buttonText === "확인") {
      onClose(); // 확인 버튼일 때는 모달을 닫음
    } else {
      sendNumber(); // 다른 동작 수행
      setShowMessage(true);
      setCountdown(3);
      setIsButtonDisabled(true);
    }
  };

  const sendNumber = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send('1');
    } else {
      console.error('WebSocket이 연결 상태가 아닙니다.');
    }
  };

  useEffect(() => {
    let timer;
    if (showMessage && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (showMessage && countdown === 0) {
      setShowMessage(false);
      setShowBreathMessage(true);
      setCountdown(5);
    } else if (showBreathMessage && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (showBreathMessage && countdown === 0) {
      setShowBreathMessage(false);
      setCountdown(18); // 얼굴 인식을 위한 타이머 설정
      setShowFaceRecognitionMessage(true);
    } else if (showFaceRecognitionMessage && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (showFaceRecognitionMessage && countdown === 0) {
      setShowFaceRecognitionMessage(false);
      setIsButtonDisabled(false);
    } else if (faceMessage && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (faceMessage && countdown === 0) {
      setAuthState(true); // 인증 성공 상태 변경
      setfaceMessage(false);
      setIsButtonDisabled(false);
    }

    return () => clearTimeout(timer);
  }, [showMessage, showBreathMessage, showFaceRecognitionMessage, countdown, Alc, face]);

  useEffect(() => {
    fetchMemberInfoAndConnect();
  }, []);

  useEffect(() => {
    if (Alc) {
      const timer = setTimeout(() => {
        setShowFaceRecognitionMessage(true);
        setCountdown(18);
        setAlc(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [Alc]);

  useEffect(() => {
    if (face) {
      setShowFaceRecognitionMessage(false); // 얼굴 인식 화면을 숨김
      setfaceMessage(true);
      setFace(false);
      setButtonText("확인");
      setIsButtonDisabled(false);
    }
  }, [face]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '20px',
        width: '80%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        <Typography variant="h5" id="auth-modal-title" sx={{ fontSize: 20, fontFamily: 'Pretendard-Bold', marginBottom: '20px', textAlign: 'center' }}>
          인증을 진행 중
        </Typography>
        {showMessage && (
          <>
            <Typography variant="body1" sx={{ position: 'absolute', fontSize: 14, fontFamily: 'Pretendard-Bold', top: '120px', textAlign: 'center' }}>
              <span style={{ color: 'red' }}>3초</span> 후에 음주센서에 <span style={{ color: 'red' }}>5초</span> 동안 입김을 불어주세요
            </Typography>
            <Typography variant="body1" sx={{ position: 'absolute', fontSize: 100, fontFamily: 'Pretendard-Bold', top: '150px', textAlign: 'center' }}>
              {countdown}
            </Typography>
          </>
        )}
        {showBreathMessage && (
          <>
            <Typography variant="body1" sx={{ position: 'absolute', fontSize: 14, fontFamily: 'Pretendard-Bold', top: '120px', textAlign: 'center' }}>
              <span style={{ color: 'red' }}>5초</span> 동안 <span style={{ color: 'red' }}>음주 측정</span>을 진행해주세요
            </Typography>
            <Typography variant="body1" sx={{ position: 'absolute', fontSize: 100, fontFamily: 'Pretendard-Bold', top: '150px', textAlign: 'center' }}>
              {countdown}
            </Typography>
          </>
        )}
        {Alc && !showFaceRecognitionMessage && (
          <>
            <Typography variant="body1" sx={{ position: 'absolute', fontSize: 14, fontFamily: 'Pretendard-Bold', top: '200px', textAlign: 'center' }}>
              <span style={{ color: 'green' }}>음주 측정에 성공했습니다. <br></br> 잠시 후에 얼굴 인식을 시작합니다.</span>
            </Typography>
          </>
        )}
        {showFaceRecognitionMessage && (
          <>
            <Typography variant="body1" sx={{ position: 'absolute', fontSize: 14, fontFamily: 'Pretendard-Bold', top: '80px', textAlign: 'center' }}>
              <span style={{ color: 'red' }}>얼굴 인식을 진행 중입니다.<br></br> 카메라에 얼굴을 인식해주세요</span>
            </Typography>
            <Typography variant="body1" sx={{ position: 'absolute', fontSize: 100, fontFamily: 'Pretendard-Bold', top: '120px', textAlign: 'center' }}>
              {countdown}
            </Typography>
            <img
              src={profileImageUrl}
              alt="회원 사진"
              style={{
                position: 'absolute',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                top: '250px'
              }}
            />
          </>
        )}
        {faceMessage && (
          <>
            <Typography variant="body1" sx={{ position: 'absolute', fontSize: 14, fontFamily: 'Pretendard-Bold', top: '200px', textAlign: 'center' }}>
              <span style={{ color: 'green' }}>얼굴 인식에 성공했습니다.</span>
            </Typography>
          </>
        )}
        <Button
          variant="contained"
          sx={{ backgroundColor: '#2d2c28', fontSize: 12, fontFamily: 'Pretendard-Bold', width: '50%', marginTop: 'auto' }}
          onClick={handleStartAuth}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
}

export default Test;

