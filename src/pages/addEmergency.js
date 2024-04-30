import React, { useState } from 'react';
import '../styles/addEmergency.css';
import axios from 'axios';
import BackImage from '../assets/Main2.png'; // 이미지를 가져옵니다.

function EmergencyContactForm() {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        phoneNum: '',
        voiceMessage: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({
            ...contactInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 입력 값 검증 로직 추가 가능
        try {
            const response = await axios.post('http://localhost:8080/emergency-contacts', contactInfo);
            if (response && response.data) {
                console.log('Emergency contact added successfully:', response.data);
            }
        } catch (error) {
            console.error('Error adding emergency contact:', error);
        }
        
    };
    
    
    return (
        <div className="background1">
            <div className="container1">
                <h3>비상연락망 추가</h3>
                <form1 onSubmit={handleSubmit}>
                    <div>
                        <label1>이름:</label1>
                        <input type="text" name="name" value={contactInfo.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label1>전화번호:</label1>
                        <input type="text" name="phoneNum" value={contactInfo.phoneNum} onChange={handleChange} required />
                    </div>
                    <div>
                        <label1>메시지:</label1>
                        <input type="text" name="voiceMessage" value={contactInfo.voiceMessage} onChange={handleChange} />
                    </div>
                
                    <button1 type="submit">추가하기</button1>
                </form1>
            </div>
        </div>
    );
}

export default EmergencyContactForm;
