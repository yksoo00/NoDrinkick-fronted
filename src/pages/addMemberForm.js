import React, { useState } from 'react';
import addMembers from '../services/addMembers';

function SignUpPage() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        username: '',
        password: '',
        phoneNum: '',
        email: '',
        license: false,
        imagePath: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
<<<<<<< HEAD
            const response = await addMembers(userInfo);
            console.log('회원가입 성공:', response);
            window.location.href = '/home';
=======
            const response = await axios.post('http://localhost:8080/members/add', userInfo);
            console.log('회원가입 성공:', response.data);
            window.location.href = '/home'
>>>>>>> dev-yeon,seo
        } catch (error) {
            console.error('회원가입 에러:', error);
            // 에러 처리 로직
        }
    }

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label>
                    <input type="text" name="name" value={userInfo.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>아이디:</label>
                    <input type="text" name="username" value={userInfo.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" name="password" value={userInfo.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>전화번호:</label>
                    <input type="text" name="phoneNum" value={userInfo.phoneNum} onChange={handleChange} required />
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
                </div>
                <div>
                    <label>운전면허 인증 유무:</label>
                    <select name="license" value={userInfo.license} onChange={handleChange}>
                        <option value="false">미인증</option>
                        <option value="true">인증</option>
                    </select>
                </div>
                <div>
                    <label>사용자 얼굴 사진 경로:</label>
                    <input type="text" name="imagePath" value={userInfo.imagePath} onChange={handleChange} />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default SignUpPage;