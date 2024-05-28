import axios from 'axios';

const addEmergencyContact = async (contactInfo) => {
    try {
        const response = await axios.post(`http://localhost:8080/emergency-contacts`, contactInfo);
        console.log('비상 연락망 추가 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('비상 연락망 추가 실패:', error);
        throw new Error('비상 연락망 추가에 실패했습니다.');
    }
};

export default addEmergencyContact;