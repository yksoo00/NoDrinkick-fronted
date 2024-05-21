import React, { useState, useEffect } from 'react';
import login from '../services/loginService.js';
import { useHistory } from 'react-router-dom';
import '../styles/loginform.css';
import MainImage from '../assets/Main.png';
import FullLogoImage from '../assets/FullLogo.png';
import DarkModeFullLogoImage from '../assets/darkmode-FullLogo.png';
import DarkMode from '../component/darkmode'; 

const LoginForm = () => {
  const history = useHistory();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    localStorage.getItem('darkModeEnabled') === 'true'
  );

  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await login(loginId, password);
      console.log('로그인 성공');
      window.location.href = '/main';
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인에 실패했습니다. 계정 정보를 확인해주세요.');
    }
  };

  const handleRedirectToRegister = () => {
    history.push('/addmemberform');
  };

  return (
    <div className="login-page">
      <img src={MainImage} alt="Main" className="main-image" />
      {darkModeEnabled ? (
        <img src={DarkModeFullLogoImage} alt="DarkModeFullLogoImage" className="DarkmodeFullLogoImage" />
      ) : (
        <img src={FullLogoImage} alt="FullLogoImage" className="FullLogoImage" />
      )}

      <div className="switch-container LoginDark">
        <DarkMode onChange={toggleDarkMode} darkModeEnabled={darkModeEnabled} />
      </div>

      <div className={`transparent-shape ${darkModeEnabled ? 'dark-mode' : ''}`}>
        <div className={`login-text ${darkModeEnabled ? 'dark-mode' : ''}`}>
          노드링킥에 오신 것을 환영합니다
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className={`input-field ${darkModeEnabled ? 'dark-mode' : ''}`}
              placeholder={darkModeEnabled ? 'ID' : 'ID'}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input-field ${darkModeEnabled ? 'dark-mode' : ''}`}
              placeholder="Password"
            />
          </div>
          <button className={`loginbutton ${darkModeEnabled ? 'dark-mode' : ''}`} type="submit">
            로그인
          </button>
        </form>
        <div className="register-text">
          <span className={`Q ${darkModeEnabled ? 'dark-mode' : ''}`}> 계정이 없으신가요?</span>
          <button className={`register-Button ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={handleRedirectToRegister}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
