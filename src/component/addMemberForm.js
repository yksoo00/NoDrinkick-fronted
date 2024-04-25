import React from 'react';

function AddMemberForm() {
  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>회원 가입</h2>
      </div>
      <h4 className="mb-3">회원 정보 입력</h4>
      <form action="" method="post">
        <div>
          <label htmlFor="">로그인 ID</label>
          <input type="text" id="loginId" name="loginId" className="form-control" />

          <label htmlFor="name">이름</label>
          <input type="text" id="name" name="name" className="form-control" />

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" className="form-control" />

          <label htmlFor="phoneNum">전화번호</label>
          <input type="text" id="phoneNum" name="phoneNum" className="form-control" />

          <label htmlFor="email">이메일</label>
          <input type="text" id="email" name="email" className="form-control" />
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col">
            <button className="w-100 btn btn-primary btn-lg" type="submit">회원 가입</button>
          </div>
          <div className="col">
            <button className="w-100 btn btn-secondary btn-lg" onClick={() => { window.location.href = '/'; }} type="button">취소</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddMemberForm;
