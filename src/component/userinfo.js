import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userinfo.css';

const Userinfo = () => {
    const [users, setUsers] = useState([]);
    const [darkModeEnabled, setDarkModeEnabled] = useState(
      localStorage.getItem('darkModeEnabled') === 'true'
    );
    const [AuthRentState, setAuthRentState] = useState(false); 

    const fetchRentState = async () => {
        try {
          const response = await axios.get('http://13.125.168.244:8080/rent');
          setAuthRentState(response.data); 
        } catch (error) {
          console.error('API 서버오류', error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/members/info');
                setUsers([response.data]);
            } catch (error) {
                console.error('API 서버오류', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        fetchRentState();
    }, []);

    useEffect(() => {
        if (darkModeEnabled) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkModeEnabled', darkModeEnabled);
    }, [darkModeEnabled]);

    useEffect(() => {
        // AuthRentState가 변경될 때마다 해당 작업 수행
        const checkRentState = async () => {
            await fetchRentState();
        };
        checkRentState();
    }, [AuthRentState]);

    return (
        <div className={`Userinfo-container ${darkModeEnabled ? 'dark-mode' : ''}`}>
            {users.map((user) => (
                <div key={user.username} className="Userinfo">
                    <p>
                        <span style={{ color: user.role === 'ADMIN' ? 'red' : 'yellow' }}>
                            {user.name}
                        </span> 님 환영합니다
                    </p>
                    <p>대여 상태 : {AuthRentState ? 'O' : 'X'}</p>
                </div>
            ))}
        </div>
    );
}

export default Userinfo;
