import React, { useState, useEffect } from 'react';

const Bluetooth = () => {
  const [bluetoothData, setBluetoothData] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // 기존 블루투스 데이터 가져오기 코드
    const fetchData = async () => {   try {
      const response = await fetch('http://localhost:8080/bluetooth-data');
      if (!response.ok) { 
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }
      const data = await response.json();
      setBluetoothData(data);
    } catch (error) {
      console.error('데이터를 불러오는 중 문제가 발생했습니다:', error);
    }};

    fetchData();

    // WebSocket 연결 설정
    const newWs = new WebSocket('ws://192.168.149.197:8765'); // 라즈베리파이 WebSocket 서버 주소

    // 연결이 성공적으로 열린 경우 실행될 이벤트 핸들러
    newWs.onopen = () => {
      console.log("WebSocket 연결 성공");
      // 연결이 성공적으로 완료되었으므로, 여기에서 필요한 초기 설정 작업을 수행할 수 있습니다.
    };

    // 메시지 수신 이벤트 핸들러
    newWs.onmessage = (event) => {
      console.log("서버로부터 받은 메시지:", event.data);
    };

    setWs(newWs);
  }, []);

  // 번호 1 보내기 이벤트 핸들러
  const sendNumber = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send('1');
    } else {
      console.error('WebSocket이 연결 상태가 아닙니다.');
    }
  };

  return (
    <div>
      <h1>블루투스 데이터 목록</h1>
      {/* 데이터 보여주는 UI 코드 */}
      <button onClick={sendNumber}>번호 1 보내기</button>
    </div>
  );
};

export default Bluetooth;
