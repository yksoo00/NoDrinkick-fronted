import React from 'react';

function LoginHome({ loginForm }) {
  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="py-5 text-center">
        <h2>홈 화면</h2>
      </div>
      {loginForm && loginForm.loginId && (
        <>
          <h4 className="mb-3">로그인: {loginForm.loginId}</h4>
          <button className="w-100 btn btn-secondary btn-lg" onClick={() => { window.location.href = '/mypage'; }}>마이 페이지</button>
        </>
      )}
      <hr className="my-4" />
      <div className="row">
        <div className="col">
          <button className="w-100 btn btn-secondary btn-lg" onClick={() => { window.location.href = '/NodrinKickMain'; }}>킥보드 타러가기</button>
        </div>
        <div className="col">
          <form action="/login/logout" method="post">
            <button className="w-100 btn btn-dark btn-lg" type="submit">로그아웃</button>
          </form>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}

export default LoginHome;
