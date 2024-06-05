import axios from 'axios';

export const sendEmergencyMessage = async () => {
  try {
    const response = await axios.post('http://13.125.168.244:8080/emergency-contacts/sendSNS');
    return response.data;
  } catch (error) {
    throw new Error('메시지 전송 중 오류가 발생했습니다: ' + error.response.data);
  }
};
