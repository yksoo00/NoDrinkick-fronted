import React, { useState, useEffect } from 'react';
import BackMp4 from '../assets/Main2_animation.mp4';
import '../styles/App.css';
import '../styles/home.css'; 
import DarkMode from '../component/darkmode';

function Home() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    localStorage.getItem('darkModeEnabled') === 'true'
  );

  useEffect(() => {
    // Update the body class based on darkModeEnabled
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Save the dark mode state to localStorage
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <div className={`home-container ${darkModeEnabled ? 'dark-mode' : ''}`} >
      <div className={`home-gif ${darkModeEnabled ? 'dark-mode' : ''}`}>
        <video autoPlay loop muted className="background-video">
          <source src={BackMp4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div> 
  );
}

export default Home;
