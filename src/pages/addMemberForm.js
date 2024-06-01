import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/addMemberForm.css'
import { useHistory } from 'react-router-dom'; 
import MainImageB from '../assets/Main.png';
import Logo2 from '../assets/Logo2.png';
import Logo2_Dark from '../assets/Logo2_Dark.png';
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

    const [imageFile, setImageFile] = useState(null);

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const memberDto = {
            name: userInfo.name,
            username: userInfo.username,
            password: userInfo.password,
            phoneNum: userInfo.phoneNum,
            email: userInfo.email,
            license: userInfo.license === "true"
        };

        const formData = new FormData();
        formData.append('imgFile', imageFile);
        formData.append('memberDto', new Blob([JSON.stringify(memberDto)], { type: 'application/json' }));

        try {

            const response = await axios.post('/members/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // 요청의 Content-Type 설정
                }
            });
            console.log('회원가입 성공:', response.data);
            //const response = await axios.post('http://asda/mypageupload',imagefile)
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
        <div className={`Logo-Text ${darkModeEnabled ? 'dark-mode' : ''}`}>NO <br></br>DRINKICK</div>
        {darkModeEnabled ? (
        <img src={Logo2_Dark} alt="Logo2_Dark" className="Logo2_Dark" />
      ) : (
        <img src={Logo2} alt="Logo2" className="Logo2" />
      )}


            <div><DarkMode onChange={toggleDarkMode} darkModeEnabled={darkModeEnabled} /></div>

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
                        <input type="file" 
                            name="image"
                            onChange={handleFileChange}
                            className="input-field"
                            placeholder="사용자 얼굴 사진 경로"/>
                    </div>
                
                <button  className={`Signupbutton ${darkModeEnabled ? 'dark-mode' : ''}`} type="submit">회원가입</button>
                <button  className={`HomeButton ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={handleRedirectToHome}>홈화면</button>
            </form>

            </div>
        </div>
    );
}

export default SignUpPage;