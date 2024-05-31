import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userinfo.css';

const Userinfo = () => {
    const [users, setUsers] = useState([]);

 
useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://api.nodrinkick.com/members/info');
        setUsers([response.data]); 
      } catch (error) {
        console.error('API 서버오류', error);
      }
    };

    fetchUser();
  }, []);

  
return (
<div className="Userinfo-container">
{users.map((user) => (
  <div key={user.username} className="Userinfo">
    <p><span style={{ color: 'yellow' }}>{user.name}</span> 님 환영합니다</p>
    <p>대여 상태 : X</p>
    </div>
    ))}
</div>
)

}

export default Userinfo;