import React from 'react';
import axios from 'axios';

function MyPage({ member }) {
  const handleDelete = async () => {
    try {
      await axios.get('/members/delete');
      // 회원 탈퇴 후 로그아웃 및 메인페이지로 이동
      window.location.href = '/login/logout';
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="py-5 text-center">
        <h2>마이 페이지</h2>
      </div>
      {member && member.imagePath ? (
        <img src={member.imagePath} alt="Member Image" width="300" height="350" />
      ) : (
        <form id="imageForm" encType="multipart/form-data" action="/upload" method="post">
          <input type="file" id="imageFile" name="imageFile" />
          <button type="submit">사진 등록</button>
        </form>
      )}
      <hr className="my-4" />
      <h4 className="mb-3">이름: {member.name}</h4>
      <hr className="my-4" />
      <h4 className="mb-3">아이디: {member.loginId}</h4>
      <hr className="my-4" />
      <h4 className="mb-3">전화번호: {member.phoneNum}</h4>
      <hr className="my-4" />
      <h4 className="mb-3">이메일: {member.email}</h4>
      <hr className="my-4" />
      <h4 className="mb-3">운전면허 인증 여부: {member.license ? '인증됨' : '인증되지 않음'}</h4>
      <hr className="my-4" />
      <div className="container" style={{ maxWidth: '600px' }}>
        <button className="w-100 btn btn-secondary btn-lg" onClick={() => { window.location.href = '/'; }}>돌아가기</button>
      </div>
      <hr className="my-4" />
      <div className="container" style={{ maxWidth: '300px' }}>
        <button className="w-100 btn btn-secondary btn-lg" onClick={handleDelete}>회원 탈퇴</button>
      </div>
    </div>
  );
}

export default MyPage;
