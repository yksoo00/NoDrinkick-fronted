import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../component/darkmode.css'

function DarkMode({ onChange, darkModeEnabled }) {
  const toggleDarkMode = () => {
    onChange(!darkModeEnabled);
  };

  return (
    <div className={`dark-mode-toggle ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
      <FontAwesomeIcon
        icon={darkModeEnabled ? faMoon : faSun}
        size="2x"
        style={darkModeEnabled ? { color: '#FFFFFF' } : { color: '#000000' }} // 아이콘의 색을 변경
      />
    </div>
  );
}

export default DarkMode;
