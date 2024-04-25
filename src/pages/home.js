import React, { useState, useEffect } from 'react';
import '../App.css';
import AImage from '../images/Logo.png';
import BImage from '../images/Logo.png';
import BackImage from '../images/Main.png';
import '../css/home.css';

function Home() {
  const [showImage, setShowImage] = useState(true);
  const [showNodeKick, setShowNodeKick] = useState(true);
  const [showBackgroundShape, setShowBackgroundShape] = useState(false);
  const [showBImage, setShowBImage] = useState(false);

  useEffect(() => {
    const timerToShowNodeKick = setTimeout(() => {
      setShowNodeKick(true);
    }, 2000);

    const timerToHideNodeKick = setTimeout(() => {
      setShowNodeKick(false);
    }, 2000);

    const timerToShowBackgroundShape = setTimeout(() => {
      setShowBackgroundShape(true);
    }, 2000);

    const timerToShowBImage = setTimeout(() => {
      setShowBImage(true);
    }, 2000);

    const timerToHideImage = setTimeout(() => {
      setShowImage(false);
    }, 2000);

    return () => {
      clearTimeout(timerToShowNodeKick);
      clearTimeout(timerToHideNodeKick);
      clearTimeout(timerToShowBackgroundShape);
      clearTimeout(timerToShowBImage);
      clearTimeout(timerToHideImage);
    };
  }, []);


  return (


    <div className="container text-center" style={{ maxWidth: '1500px', position: 'relative' }}>
      {showBackgroundShape && <div className="background-shape"></div>}
      <div className="image-container" style={{ position: 'absolute', top: '200px', left: '50%', transform: 'translateX(-50%)' }}>
      {showImage && <img src={AImage} alt="A" style={{ width: '200px', animation: 'loadEffect1 0.7s ease-in-out' }} />}
        {showNodeKick && (
           <div className="logo" style={{ padding: '21px', borderRadius: '10px', marginTop: '-30px' }}>
           노드링킥
         </div>
        )}
      </div>
      <div className="MainPage" style={{ display: showImage ? 'none' : 'block' }}>
        <div className="Main">
          <h2>환영합니다</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <button className="login-button" onClick={() => { window.location.href = '/loginform'; }}>
              로그인
            </button>
          </div>
          <div className="col-auto">
            <button className="register-button" onClick={() => { window.location.href = '/members/add'; }}>
            회원 가입
        </button>
      </div>
    </div>
    <hr className="my-4" />
    <div className="text-container">
    {showBImage && <img src={BImage} alt="B" style={{ position: 'absolute', width:'50px', height:'50px', top: '350px', left:'62%'  }} />}
    <h2 className="text">노드링킥은 당신의 생명을 책임집니다</h2>
        </div>
      </div>
      {showBackgroundShape && <img src={BackImage} alt="C" className="back-image" />}
    </div>
  );
}

export default Home;
