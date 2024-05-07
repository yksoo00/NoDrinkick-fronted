import React, { useState, useEffect } from 'react';

import axios from 'axios'; // axios를 import합니다.
import { Link } from 'react-router-dom';

const Bluetooth = () => {
  const [bluetoothData, setBluetoothData] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // axios.get을 사용하여 API를 호출합니다.
        const response = await axios.get('http://localhost:8080/bluetooth-data');
        // axios는 기본적으로 response.data에 실제 데이터를 저장합니다.
        setBluetoothData(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 중 문제가 발생했습니다:', error);
      }
    };

    fetchData();

    const newWs = new WebSocket('ws://192.168.39.197:8765');

    newWs.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    newWs.onmessage = (event) => {
      console.log("서버로부터 받은 메시지:", event.data);
    };

    setWs(newWs);
  }, []);



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

      <ul>
        {bluetoothData.map((item, index) => (
          <li key={index}>
            <Link to={`/detail/${item.deviceId}`}>
          장치 ID: {item.deviceId}, 데이터: {item.data}, 받은 시간: {item.receivedAt}
        </Link>
      </li>
  ))}
</ul>

      <button onClick={sendNumber}>번호 1 보내기</button>
    </div>
  );
};

export default Bluetooth;
