import axios from 'axios';

const addMembers = async (userInfo) => {
    try {
        const response = await axios.post('http://localhost:8080/members/add', userInfo);
        console.log('회원가입 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('회원가입 에러:', error.response.data);
        throw new Error('회원가입에 실패했습니다.');
    }
};

export default addMembers;