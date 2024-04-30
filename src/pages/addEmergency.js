import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <h2>비상연락망 추가</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label>
                    <input type="text" name="name" value={contactInfo.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>전화번호:</label>
                    <input type="text" name="phoneNum" value={contactInfo.phoneNum} onChange={handleChange} required />
                </div>
                <div>
                    <label>음성 메시지:</label>
                    <input type="text" name="voiceMessage" value={contactInfo.voiceMessage} onChange={handleChange} />
                </div>
               
                <button type="submit">추가하기</button>
            </form>
        </div>
    );
}

export default EmergencyContactForm;
