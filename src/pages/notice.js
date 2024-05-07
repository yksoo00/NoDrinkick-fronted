import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notices = () => {
  const [notices, setNotices] = useState([]);

  // 공지사항 목록 조회
  const fetchNotices = async () => {
    const response = await axios.get('/notices');
    setNotices(response.data);
  };

  // 공지사항 조회
  const fetchNotice = async (memberId) => {
    const response = await axios.get(`/notices/${memberId}`);
    console.log(response.data);
  };

  // 공지사항 생성
  const createNotice = async (notice) => {
    await axios.post('/notices', notice);
    fetchNotices(); // 목록 갱신
  };

  // 공지사항 수정
  const updateNotice = async (memberId, notice) => {
    await axios.put(`/notices/${memberId}`, notice);
    fetchNotices(); // 목록 갱신
  };

  // 공지사항 삭제
  const deleteNotice = async (memberId) => {
    await axios.delete(`/notices/${memberId}`);
    fetchNotices(); // 목록 갱신
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // 간단한 UI 예제
  return (
    <div>
      <h1>공지사항 목록</h1>
      <ul>
        {notices.map(notice => (
          <li key={notice.id}>{notice.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notices;
