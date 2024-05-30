import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/noticeDetail.css';

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);
  const [editedNotice, setEditedNotice] = useState({ title: '', content: '' });
  const history = useHistory();

  const fetchNotice = async () => {
    try {
      const response = await axios.get(`/notices/${noticeId}`);
      setNotice(response.data);
    } catch (error) {
      console.error('Error fetching notice details:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/notices/${noticeId}`, editedNotice);
      // 수정된 공지사항 정보를 다시 불러와 화면에 반영
      fetchNotice();
      // 수정 후 입력 폼 초기화
      setEditedNotice({ title: '', content: '' });
      // 수정이 완료되면 Notice 페이지로 이동
      history.push('/notice');
    } catch (error) {
      console.error('Error editing notice:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/notices/${noticeId}`);
      // 삭제가 완료되면 Notice 페이지로 이동
      history.push('/notice');
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, [noticeId]);

  if (!notice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notice-detail">
      <h1>{notice.title}</h1>
      <p>{notice.content}</p>
      <p>{new Date(notice.createdAt).toLocaleDateString()}</p>

      <div className="edit-form">
        <input
          type="text"
          placeholder="수정할 제목"
          value={editedNotice.title}
          onChange={(e) => setEditedNotice({ ...editedNotice, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="수정할 내용"
          value={editedNotice.content}
          onChange={(e) => setEditedNotice({ ...editedNotice, content: e.target.value })}
        />
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
};

export default NoticeDetail;
