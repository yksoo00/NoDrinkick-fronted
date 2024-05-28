import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios를 import합니다.
import { Link } from 'react-router-dom';

const CombinedComponent = () => {
  const [bluetoothData, setBluetoothData] = useState([]);
  const [memberInfo, setMemberInfo] = useState({}); // 회원 정보 상태 추가
  const [ws, setWs] = useState(null);
  const [wsMessages, setWsMessages] = useState([]); // WebSocket 메시지 상태 추가

  useEffect(() => {
    const fetchBluetoothData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bluetooth-data');
        setBluetoothData(response.data);
      } catch (error) {
        console.error('블루투스 데이터를 불러오는 중 문제가 발생했습니다:', error);
      }
    };

    const fetchMemberInfoAndConnect = async () => {
      try {
        const response = await axios.get('http://localhost:8080/members/info');
        const memberInfo = response.data;
        setMemberInfo(memberInfo); // 회원 정보 상태 설정

        const username = encodeURIComponent(memberInfo.username); // 회원 정보 중 username 추출

        const wsUrl = `ws://192.168.42.197:8765/ws?username=${username}`;
        const newWs = new WebSocket(wsUrl);

        newWs.onopen = () => console.log("WebSocket 연결 성공");
        newWs.onmessage = (event) => {
          console.log("서버로부터 받은 메시지:", event.data);
          setWsMessages(prevMessages => [...prevMessages, event.data]); // 새로운 메시지를 상태에 추가

          if (event.data === "33") {
            sendMessageToAll();
          }
        };

        setWs(newWs);
      } catch (error) {
        console.error('API 호출 또는 WebSocket 연결 중 오류 발생:', error);
      }
    };

    fetchBluetoothData();
    fetchMemberInfoAndConnect();
  }, []);

  const sendNumber = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send('1');
    } else {
      console.error('WebSocket이 연결 상태가 아닙니다.');
    }
  };

  const sendMessageToAll = async () => {
    try {
      const response = await axios.post('http://localhost:8080/emergency-contacts/sendSNS');
      alert(response.data);
    } catch (error) {
      alert("메시지 전송 중 오류가 발생했습니다: " + error.response.data);
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

      {/* 회원 정보 출력 */}
      <div>
        <h2>회원 정보</h2>
        {memberInfo.username && (
          <p>
            사용자 이름: {memberInfo.username}<br />
            이메일: {memberInfo.email}
          </p>
        )}
      </div>

      {/* WebSocket 메시지 출력 */}
      <div>
        <h2>WebSocket 메시지</h2>
        <ul>
          {wsMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>

      <button onClick={sendNumber}>번호 1 보내기</button>
    </div>
  );
};

export default CombinedComponent;
