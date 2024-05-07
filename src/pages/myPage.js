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
  }, []);

  // 돌아가기 버튼 클릭 핸들러
  const handleBackButtonClick = () => {
    // 이전 페이지로 돌아가는 로직을 여기에 구현합니다.
    // 예: window.history.back();
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <img src={user.profilePicture} alt="프로필 사진" /> {/* 사진 */}
          <p>이름: {user.name}</p> {/* 이름 */}
          <p>아이디: {user.id}</p> {/* 아이디 */}
          <p>전화번호: {user.phone}</p> {/* 전화번호 */}
          <p>이메일: {user.email}</p> {/* 이메일 */}
          <p>운전면허 인증 여부: {user.licenseVerified ? '인증됨' : '미인증'}</p> {/* 운전면허 인증 여부 */}
        </div>
      ))}
      <button onClick={handleBackButtonClick}>돌아가기</button> {/* 돌아가기 버튼 */}
    </div>
  );
}

export default UserList;
