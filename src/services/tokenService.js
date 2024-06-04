// tokenService.js

import axios from 'axios';

const removeToken = () => {
  // 로컬 스토리지에서 토큰 제거
  localStorage.removeItem('jwtToken');

  // axios의 기본 헤더에서 토큰 제거
  delete axios.defaults.headers.common['Authorization'];

  console.log('JWT 토큰이 제거되었습니다.');
};

const checkTokenExpiration = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    console.log('토큰이 없습니다.');
    return;
  }

  // 토큰 디코딩
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.log('유효하지 않은 토큰입니다.');
    return;
  }

  const payload = JSON.parse(atob(tokenParts[1]));
  if (!payload.exp) {
    console.log('만료 시간이 없는 토큰입니다.');
    return;
  }

  // 만료 시간 확인
  const expirationTime = new Date(payload.exp * 1000);
  const currentTime = new Date();

  if (expirationTime < currentTime) {
    console.log('토큰이 만료되었습니다.');
    removeToken();
  } else {
    console.log('토큰이 아직 유효합니다.');
  }
};

// Axios 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    checkTokenExpiration(); // 요청 전에 토큰 만료 체크
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

export { removeToken, checkTokenExpiration };