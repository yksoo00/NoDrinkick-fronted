import axios from 'axios';

const getContacts = async () => {
  try {
    const response = await axios.get('http://13.125.168.244:8080/emergency-contacts');
    return response.data;
  } catch (error) {
    console.error("비상 연락망 조회 중 오류가 발생했습니다.", error);
    throw error;
  }
};

const deleteContact = async (id) => {
  try {
    await axios.delete(`http://13.125.168.244:8080/emergency-contacts/${id}`);
  } catch (error) {
    console.error("연락처 삭제 중 오류가 발생했습니다.", error);
    throw error;
  }
};

const sendMessageToAll = async () => {
  try {
    const response = await axios.post('http://13.125.168.244:8080/emergency-contacts/sendSNS');
    alert(response.data);
  } catch (error) {
    alert("메시지 전송 중 오류가 발생했습니다: " + error.response.data);
  }
};

export { getContacts, deleteContact, sendMessageToAll };