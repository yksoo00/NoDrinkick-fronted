import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]); // 사용자 데이터 상태 관리

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 API 호출
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:8080/notices');
        setUsers(response.data); // API로부터 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error("API 에러:", error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 넘겨주어 컴포넌트 마운트 시 단 한 번만 실행되도록 함

  return (
    <div>
      <h1>사용자 목록</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li> // 각 사용자 이름을 리스트 아이템으로 렌더링
        ))}
      </ul>
    </div>
  );
}

export default UserList;
