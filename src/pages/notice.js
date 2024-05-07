import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/notice.css';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNotices = async () => {
    const response = await axios.get('/notices');
    setNotices(response.data);
  };

  const searchNotices = async () => {
    if (!searchTerm) {
      fetchNotices();
    } else {
      const response = await axios.get(`/notices/search?query=${searchTerm}`);
      setNotices(response.data);
    }
  };

  const handleCreate = async () => {
    const title = prompt("공지사항 제목을 입력하세요");
    const content = prompt("공지사항 내용을 입력하세요");
    if (title && content) {
      await createNotice({ title, content });
    }
  };

  const createNotice = async (notice) => {
    await axios.post('/notices', notice);
    fetchNotices();
  };

  const handleDelete = async (noticeId) => {
    await deleteNotice(noticeId);
  };

  const deleteNotice = async (noticeId) => {
    await axios.delete(`/notices/${noticeId}`);
    fetchNotices();
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>
      <h1 className="h10">공지사항 목록</h1>
      <div className="search-bar">
        <input 
          type="text"
          className="search-input" 
          placeholder="검색어" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="button5" onClick={searchNotices}>검색</button>
      </div>
      <button className="button6" onClick={handleCreate}>공지사항 추가</button>
      <ul>
        {notices.map(notice => (
          <li key={notice.id}>{notice.title}</li>
        ))}
      </ul>
    </div>
  );

}

export default Notices;
