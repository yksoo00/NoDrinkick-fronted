import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NoticePage() {
  // 공지사항 목록을 저장할 상태
  const [notices, setNotices] = useState([]);

  // 컴포넌트가 마운트될 때 공지사항 데이터를 로드
  useEffect(() => {
    fetchNotices();
  }, []);

  // API 요청을 보내서 공지사항 데이터를 가져오는 함수
  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notices');
      console.log(response.data);
      setNotices(response.data); // 상태 업데이트
    } catch (error) {
      console.error('공지사항을 불러오는 중 오류가 발생했습니다', error);
    }
  };

  return (
    <div>
      <h1>공지사항</h1>
      <ul>
        {notices.map(notice => (
          <li key={notice.noticeId}>
            <h2>{notice.title}</h2>
            <p>작성일: {notice.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoticePage;
