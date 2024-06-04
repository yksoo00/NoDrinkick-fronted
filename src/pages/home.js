import React, { useState, useEffect } from 'react';
import Logo2 from '../assets/Logo2.png';
import Logo2_Dark from '../assets/Logo2_Dark.png';
import video from '../assets/Animation.mp4';
import '../styles/App.css';
import '../styles/home.css';
import DarkMode from '../component/darkmode';

function Home() {
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

  return (
    <div className={`HomeContainer ${darkModeEnabled ? 'dark-mode' : ''}`}>
      <div className={`ImageAndShape ${darkModeEnabled ? 'dark-mode' : ''}`}>
      <img className="HomeImage" src="https://s3.ap-northeast-2.amazonaws.com/nodrinkick.com/Animation.gif" alt="Animation" />
        <div className={`HomeShape ${darkModeEnabled ? 'dark-mode' : ''}`}>
          <div className={`HomeText ${darkModeEnabled ? 'dark-mode' : ''}`}>노드링킥에 오신 것을 환영합니다</div> 
          <button className={`HomeLoginButton ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={() => { window.location.href = '/loginform'; }}>로그인</button>
          <button className={`HomeSignUpButton ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={() => { window.location.href = '/addmemberform'; }}>회원 가입</button>
        </div>
      </div>
      <DarkMode darkModeEnabled={darkModeEnabled} onChange={toggleDarkMode} />
      <div className="LogoAndText">
        {darkModeEnabled ? (
          <img src={Logo2_Dark} alt="Logo2_Dark" className="HomeLogo2_Dark" />
        ) : (
          <img src={Logo2} alt="Logo2" className="HomeLogo2" />
        )}
        <div className={`HomeLogo-Text2 ${darkModeEnabled ? 'dark-mode' : ''}`}>
          NO <br /> DRINKICK
        </div>
      </div>
    </div>
  );
}

export default Home;
