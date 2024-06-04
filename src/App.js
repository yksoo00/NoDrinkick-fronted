  import React, { useEffect } from 'react';
  import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
  import Home from './pages/home';
  import myPage from './pages/myPage';
  import LoginForm from './pages/loginform';
  import AddMemberForm from './pages/addMemberForm';
  import Main from './pages/main';
  import AddEmergency from './pages/addEmergency';
  import notice from './pages/notice';
  import use from './pages/use';
  import Payment from './pages/payment'; // 수정된 부분
  import PaymentResult from './pages/success';
  import Fail from './pages/fail';
  import NoticeDetail from './pages/NoticeDetail'; 
  import UserRecord from './pages/UserRecord';
  import Emergency from './pages/Emergency';
  import Bluetooth from './pages/Bluetooth';
  import BluetoothDetail from './pages/BluetoothDetails';

  import './styles/App.css';

  function App() {
    useEffect(() => {
      const checkToken = () => {
        const currentPath = window.location.pathname;
        // '/home' 및 '/LoginForm' 경로에서는 토큰 체크를 건너뜁니다.
        if (currentPath !== '/home' && currentPath !== '/loginform' && currentPath !== '/addmemberform') {
          const jwtToken = localStorage.getItem('jwtToken');
          if (!jwtToken) {
            // 토큰이 없으면 홈 페이지로 리다이렉트
            window.location.href = "/home";
          } else {
            // 토큰 디코딩 및 만료 시간 확인
            const decodedToken = decodeJwtToken(jwtToken);
            const expirationTime = decodedToken.exp * 1000; // 초 단위이므로 밀리초로 변환
            const currentTime = Date.now();
            if (currentTime > expirationTime) {
              // 토큰이 만료되었으면 로그인 페이지로 리다이렉트하고 토큰 삭제
              localStorage.removeItem('jwtToken');
              window.location.href = "/LoginForm";
            }
          }
        }
      };
    
      checkToken(); // 컴포넌트 마운트 시 한 번 체크
    
      const intervalId = setInterval(checkToken, 1000); // 1초 간격으로 체크
    
      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }, []);
    

    return (
      <Router>
        <Switch>
          <Route path="/myPage" component={myPage} />
          <Route path="/main" component={Main} />
          <Route path="/home" component={Home} />
          <Route path="/LoginForm" component={LoginForm} />
          <Route path="/AddMemberForm" component={AddMemberForm} />
          <Route path="/AddEmergency" component={AddEmergency} />
          <Route path="/UserRecord" component={UserRecord} />
          <Route path="/notice" component={notice} />
          <Route path="/NoticeDetail/:noticeId" component={NoticeDetail} />
          <Route path="/use" component={use} />
          <Route path="/Emergency" component={Emergency} />
          <Route path="/Bluetooth" component={Bluetooth} />
          <Route path="/payment" component={Payment} /> 
          <Route path="/success" component={PaymentResult} />
          <Route path="/fail" component={Fail} />
          <Route path="/detail/:deviceId" component={BluetoothDetail} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    );
  }

  // JWT 토큰 디코딩 함수
  function decodeJwtToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  export default App;