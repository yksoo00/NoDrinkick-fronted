import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userinfo.css';

const Userinfo = () => {
    const [users, setUsers] = useState([]);
    const [darkModeEnabled, setDarkModeEnabled] = useState(
      localStorage.getItem('darkModeEnabled') === 'true'
    );

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://13.125.168.244:8080/members/info');
                setUsers([response.data]);
            } catch (error) {
                console.error('API 서버오류', error);
            }
        };

        fetchUser();
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

    return (
        <div className={`Userinfo-container ${darkModeEnabled ? 'dark-mode' : ''}`}>
            {users.map((user) => (
                <div key={user.username} className="Userinfo">
                    <p>
                        <span style={{ color: user.role === 'ADMIN' ? 'red' : 'yellow' }}>
                            {user.name}
                        </span> 님 환영합니다
                    </p>
                    <p>대여 상태 : X</p>
                </div>
            ))}
        </div>
    );
}

export default Userinfo;
