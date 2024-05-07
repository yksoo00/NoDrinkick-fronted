import React, { useState } from 'react';
import '../styles/addEmergency.css';
import axios from 'axios';

import BackImage from '../assets/Main2.png'; // 이미지를 가져옵니다.

import addEmergencyContact from '../services/addEmergency.js';


function AddEmergency() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNum: '',
        voiceMessage: '',
        countryCode: '+82'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^0/, formData.countryCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedPhoneNum = formatPhoneNumber(formData.phoneNum);

        try {
            await addEmergencyContact({ ...formData, phoneNum: formattedPhoneNum });
            alert('저장되었습니다!');
            setFormData({ name: '', phoneNum: '', voiceMessage: '', countryCode: '+82' });
        } catch (error) {
            console.error('비상 연락망 추가 에러:', error);
            alert('저장에 실패했습니다.');
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

export default AddEmergency;
