import axios from 'axios';
 
    const sendMessageToAll = async () => {
        try {

            const response = await axios.post('http://13.125.168.244:8080/emergency-contacts/sendSNS');
            alert(response.data);
        } catch (error) {
            alert("메시지 전송 중 오류가 발생했습니다: " + error.response.data);
        }
    };

    export default sendMessageToAll;