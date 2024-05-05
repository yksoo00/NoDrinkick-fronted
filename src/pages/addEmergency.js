import React, { useState } from 'react';
import axios from 'axios';

const SaveForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNum: '',
        voiceMessage: '',
        countryCode: '+82' // 기본 국가 코드를 한국(+82)으로 설정
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatPhoneNumber = (phoneNumber) => {
        // 국내 전화번호 형식(010-xxxx-xxxx)을 국제 전화번호 형식(+8210xxxxxxx)으로 변경
        return phoneNumber.replace(/^0/, formData.countryCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 전화번호 형식 변환
        const formattedPhoneNum = formatPhoneNumber(formData.phoneNum);

        try {
            // 변환된 전화번호를 포함하여 서버에 데이터 전송
            await axios.post('/emergency-contacts', { ...formData, phoneNum: formattedPhoneNum });
            alert('저장되었습니다!');
            // 폼 리셋
            setFormData({ name: '', phoneNum: '', voiceMessage: '', countryCode: '+82' });
        } catch (error) {
            console.error(error);
            alert('저장에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="이름" required />
            {/* 전화번호 입력 */}
            <input type="text" name="phoneNum" value={formData.phoneNum} onChange={handleChange} placeholder="전화번호" required />
            <textarea name="voiceMessage" value={formData.voiceMessage} onChange={handleChange} placeholder="메세지 내용" required />
            <button type="submit">저장하기</button>
        </form>
    );
};

export default SaveForm;
