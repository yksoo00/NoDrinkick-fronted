import axios from 'axios';
import { removeToken } from './loginService';

export const fetchUserData = async () => {
  try {
    const response = await axios.get('/members/info');
    return response.data;
  } catch (error) {
    console.error('API 서버오류', error);
    throw error;
  }
};

export const updateUserProfile = async (memberId, editedUserData) => {
  try {
    const response = await axios.patch(`/members/${memberId}`, editedUserData);
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
  formData.append('imgFile', selectedFile);

  try {
    const response = await axios.patch(`/members/img/${memberId}`, formData, {
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
    await axios.delete(`/members/${memberId}`);
    removeToken();
  } catch (error) {
    console.error('회원 탈퇴 오류:', error);
    throw error;
  }
};