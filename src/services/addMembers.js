import axios from 'axios';

const addMembers = async (formData) => {
    try {
        const response = await axios.post('http://13.125.168.244:8080/members/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('회원가입 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('회원가입 에러:', error.response?.data || error.message);
        throw new Error('회원가입에 실패했습니다.');
    }
};


export default addMembers;