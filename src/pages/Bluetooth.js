// Bluetooth.js
import React, { useState, useEffect } from 'react';

const Bluetooth = () => {
  const [bluetoothData, setBluetoothData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/bluetooth-data');
        if (!response.ok) { 
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        setBluetoothData(data);
      } catch (error) {
        console.error('데이터를 불러오는 중 문제가 발생했습니다:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>블루투스 데이터 목록</h1>
      {bluetoothData.length > 0 ? (
        <ul>
          {bluetoothData.map((data) => (
            <li key={data.id}>
              장치 ID: {data.deviceId}, 데이터: {data.data}, 수신 시간: {data.receivedAt}
            </li>
          ))}
        </ul>
      ) : (
        <p>가용한 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default Bluetooth;
