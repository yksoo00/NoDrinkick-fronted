import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // useHistory를 추가로 import 합니다.
import axios from 'axios';

const BluetoothDetail = () => {
  const { deviceId } = useParams();
  const [deviceDetail, setDeviceDetail] = useState(null);
  const history = useHistory(); // 페이지 이동을 위한 useHistory 훅 사용

  useEffect(() => {
    const fetchDeviceDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bluetooth-data/search?deviceId=${deviceId}`);
        setDeviceDetail(response.data[0]);
      } catch (error) {
        console.error('세부 정보를 불러오는 중 문제가 발생했습니다:', error);
      }
    };
    
    fetchDeviceDetail();
  }, [deviceId]);

  const deleteDeviceData = async () => {
    if(deviceDetail && deviceDetail.id) {
      try {
        await axios.delete(`http://localhost:8080/bluetooth-data/${deviceDetail.id}`);
        alert('데이터가 성공적으로 삭제되었습니다.');
        history.push('/'); // 삭제 후 메인 페이지로 이동하거나, 원하는 대로 수정하세요.
      } catch (error) {
        console.error('데이터 삭제 중에 문제가 발생했습니다:', error);
      }
    }
  };

  if (!deviceDetail) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <h1>Device Details</h1>
      <p>Device ID: {deviceDetail.deviceId}</p>
      <p>Data: {deviceDetail.data}</p>
      <p>Received At: {deviceDetail.receivedAt}</p>
      <button onClick={deleteDeviceData}>Delete Data</button> {/* 삭제 버튼 추가 */}
    </div>
  );
};

export default BluetoothDetail;
