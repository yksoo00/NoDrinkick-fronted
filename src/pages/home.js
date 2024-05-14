import React, { useState, useEffect } from 'react';
import AImage from '../assets/Logo.png';
import BImage from '../assets/Logo.png';
import BackImage from '../assets/Main.png';
import '../styles/App.css';
import '../styles/home.css'; 
import DarkMode from '../component/darkmode';

function Home() {
  const [showImage, setShowImage] = useState(true);
  const [showNodeKick, setShowNodeKick] = useState(true);
  const [showBackgroundShape, setShowBackgroundShape] = useState(false); 
  const [showBImage, setShowBImage] = useState(false);
  const [showCustomizedSwitch, setCustomizedSwitch] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    localStorage.getItem('darkModeEnabled') === 'true'
  );

  useEffect(() => {
    const timerToShowContent = setTimeout(() => {
      setShowNodeKick(false);
      setShowBackgroundShape(true);
      setShowBImage(true);
      setShowImage(false);
      setCustomizedSwitch(true);
    }, 2000);

    return () => {
      clearTimeout(timerToShowContent);
    };
  }, []);

  useEffect(() => {
    // darkModeEnabled에 따라 body 클래스를 업데이트합니다.
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // 다크 모드 상태를 localStorage에 저장합니다.
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <div className={`container text-center ${darkModeEnabled ? 'dark-mode' : ''}`} style={{ maxWidth: '1500px', position: 'relative' }}>
      {showBackgroundShape && (
        <div className={`background-shape ${darkModeEnabled ? 'dark-background' : ''}`}></div>
      )}
      <div className="image-container" style={{ position: 'absolute', top: '200px', left: '50%', transform: 'translateX(-50%)' }}>
        {showImage && <img src={AImage} alt="A" className="Logo-A" />}
      </div>
      <div className={`MainPage ${darkModeEnabled ? 'dark-mode' : ''}`} style={{ display: showImage ? 'none' : 'block' }}>
  <div className="Main">
          <h2>환영합니다</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
          <button className={`login-button ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={() => { window.location.href = '/loginform'; }}>
              로그인
            </button>
          </div>
          <div className="col-auto">
            <button className={`register-button ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={() => { window.location.href = '/addmemberform'; }}>
              회원 가입
            </button>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-container">
          {showBImage && <img src={BImage} alt="B" className="Logo-B" style={{ position: 'absolute', width: '50px', height: '50px', top: '350px', left: '62%' }} />}
          <h2 className={`text ${darkModeEnabled ? 'dark-mode' : ''}`}>노드링킥은 당신의 생명을 책임집니다</h2>
        </div>
      </div>
      {showBackgroundShape && <img src={BackImage} alt="C" className="back-image" />}
      {showCustomizedSwitch && (
        <DarkMode darkModeEnabled={darkModeEnabled} onChange={toggleDarkMode} />
      )}
    </div> 
  );
}

export default Home;
