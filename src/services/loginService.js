import axios from 'axios';

const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // 로그인 요청 및 응답 헤더에서 JWT 토큰 추출
    const response = await axios.post('http://13.125.168.244:8080/login', formData);
    let token = response.headers['authorization'] || response.headers['Authorization'];

    // 'Bearer ' 접두사 제거 (있을 경우)
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    console.log(token);


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

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default login;
