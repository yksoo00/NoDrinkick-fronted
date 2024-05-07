import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sendMessageToAll from '../services/Emergency.js';

function EmergencyContactsList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('/emergency-contacts');
            setContacts(response.data);
        } catch (error) {
            console.error("비상 연락망 조회 중 오류가 발생했습니다.", error);
        }
    };

    const handleSendMessage = async () => {
        try {
            await sendMessageToAll();
            fetchContacts(); // 메시지를 보낸 후에 연락처 목록을 다시 불러옴
        } catch (error) {
            console.error("메시지 전송 중 오류가 발생했습니다.", error);
        }
    };

    return (
        <div>
            <h2>비상 연락망 목록</h2>
            <button onClick={handleSendMessage}>모든 연락처에 메시지 전송</button>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        이름: {contact.name}, 전화번호: {contact.phoneNum}, 메시지: {contact.voiceMessage}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmergencyContactsList;
