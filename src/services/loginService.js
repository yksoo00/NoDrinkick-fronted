import axios from 'axios';

const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post('/login', formData);
    const { token } = response.data;

    // 토큰을 로컬 스토리지, 메모리, 쿠키 등에 저장
    localStorage.setItem('jwtToken', token);

    // 모든 요청에 대해 토큰을 헤더에 추가
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 로그인 성공
    return token;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('로그인에 실패했습니다.');
  }
};

export default login;
