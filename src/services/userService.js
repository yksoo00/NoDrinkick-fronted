import axios from 'axios';
import { removeToken } from './loginService';

export const fetchUserData = async () => {
  try {
    const response = await axios.get('http://13.125.168.244:8080/members/info');
    return response.data;
  } catch (error) {
    console.error('API 서버오류', error);
    throw error;
  }
};

export const checkLoginId = async (username) => {
  try {
    const response = await axios.get(`http://13.125.168.244:8080/members/check?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('로그인 ID 확인 오류:', error); 
    throw error;
  }
};


export const updateUserProfile = async (memberId, editedUserData) => {
  try {
    const response = await axios.patch(`http://13.125.168.244:8080/members/${memberId}`, editedUserData);
    return response.data;
  } catch (error) {
    console.error('회원 정보 업데이트 오류:', error);
    throw error;
  }
};

export const uploadUserImage = async (memberId, selectedFile) => {
  if (!selectedFile) {
    throw new Error('파일을 선택해주세요.');
  }

  const formData = new FormData();
  formData.append('imgFile', selectedFile); // 변수명 오타 수정

  try {
    const response = await axios.patch(`http://13.125.168.244:8080/members/img/${memberId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('프로필 사진 업데이트 오류:', error);
    throw error;
  }
};

export const deleteUser = async (memberId) => {
  try {
    await axios.delete(`http://13.125.168.244:8080/members/${memberId}`);
    removeToken();
  } catch (error) {
    console.error('회원 탈퇴 오류:', error);
    throw error;
  }
};

export const fetchUserProfileImage = async (memberId) => {
  try {
    const response = await axios.get(`http://13.125.168.244:8080/api/files/profile/${memberId}`);
    return response.data; // 이미지 경로를 반환
  } catch (error) {
    console.error('프로필 이미지 가져오기 오류:', error);
    throw error;
  }
};

export const fetchLicenseImage = async (memberId) => {
  try {
    const response = await axios.get(`http://13.125.168.244:8080/api/files/license/${memberId}`);
    return response.data; // 이미지 경로를 반환
  } catch (error) {
    console.error('운전면허 이미지 가져오기 오류:', error);
    throw error;
  }
};