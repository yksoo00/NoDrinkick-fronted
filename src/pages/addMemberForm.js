import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/addMemberForm.css'
import { useHistory } from 'react-router-dom'; 
import MainImageB from '../assets/Main.png';
import FullLogoImage from '../assets/FullLogo.png';
import DarkModeFullLogoImage from '../assets/darkmode-FullLogo.png';
import DarkMode from '../component/darkmode'; 

function SignUpPage() {
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

    const [userInfo, setUserInfo] = useState({
        name: '',
        username: '',
        password: '',
        phoneNum: '',
        email: '',
        license: false,
        imagePath: ''
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://13.125.168.244:8080/members/add', userInfo);
            console.log('회원가입 성공:', response.data);
            window.location.href = '/home';
        } catch (error) {
            console.error('회원가입 에러:', error.response.data);
            // 에러 처리 로직
        }
    };

    const handleRedirectToHome = () => {
        history.push('/home'); 
      };

    return (
        <div className="signup-container">
        <img src={MainImageB} alt="Main" className="main-imageB" />
        {darkModeEnabled ? (
        <img src={DarkModeFullLogoImage} alt="DarkModeFullLogoImage" className="DarkmodeFullLogoImage" />
      ) : (
        <img src={FullLogoImage} alt="FullLogoImage" className="FullLogoImage" />
      )}

        <div><DarkMode onChange={toggleDarkMode} darkModeEnabled={darkModeEnabled} />
      </div>

        <div className={`transparent-shapeB ${darkModeEnabled ? 'dark-mode' : ''}`}>
            <h2 className={`registerText ${darkModeEnabled ? 'dark-mode' : ''}`}> 회원가입</h2>
            <form className={`signup-form ${darkModeEnabled ? 'dark-mode' : ''}`} onSubmit={handleSubmit}>
                <div>
                    <input type="text" 
                    name="name" 
                    value={userInfo.name} 
                    onChange={handleChange} required 
                    className="input-field"
                    placeholder="Name"/>
                </div>
                <div>
                    <input type="text" 
                    name="username" 
                    value={userInfo.username} 
                    onChange={handleChange} required 
                    className="input-field"
                    placeholder="ID"
                    />
                </div>
                <div>
                    <input type="password" 
                    name="password" 
                    value={userInfo.password} 
                    onChange={handleChange} required 
                    className="input-field"
                    placeholder="Password"/>
                </div>
                <div>
                    <input type="text" 
                    name="phoneNum" 
                    value={userInfo.phoneNum} 
                    onChange={handleChange} required 
                    className="input-field"
                    placeholder="PhoneNumber ( - 제외 )"/>
                </div>
                <div>
                    <input type="email" 
                    name="email" 
                    value={userInfo.email} 
                    onChange={handleChange}
                    className="input-field"
                    placeholder="E-mail" />
                </div>
                <div>
                    <input type="text" 
                    name="imagePath" 
                    value={userInfo.imagePath} 
                    onChange={handleChange} 
                    className="input-field"
                    placeholder="사용자 얼굴 사진 경로"/>
                </div>
                <div>
                    <label className={`license ${darkModeEnabled ? 'dark-mode' : ''}`}>운전면허 인증 유무</label>
                    <select 
                    name="license" 
                    value={userInfo.license} 
                    onChange={handleChange}
                    className={`select-field ${darkModeEnabled ? 'dark-mode' : ''}`}
                    >
                        <option className={`option ${darkModeEnabled ? 'dark-mode' : ''}`} value="false">미인증</option>
                        <option className={`option ${darkModeEnabled ? 'dark-mode' : ''}`} value="true">인증</option>
                    </select>
                </div>
                <button  className={`Signupbutton ${darkModeEnabled ? 'dark-mode' : ''}`} type="submit">회원가입</button>
                <button  className={`HomeButton ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={handleRedirectToHome}>홈화면</button>
            </form>
            </div>
        </div>
    );
}

export default SignUpPage;