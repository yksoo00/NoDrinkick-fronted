import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SendMessageButton() {
    const sendMessageToAll = async () => {
        try {
            const response = await axios.post('/emergency-contacts/sendSNS');
            alert(response.data);
        } catch (error) {
            alert("메시지 전송 중 오류가 발생했습니다: " + error.response.data);
        }
    };

    return (
        <button onClick={sendMessageToAll}>모든 연락처에 메시지 전송</button>
    );
}

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

    return (
        <div>
            <h2>비상 연락망 목록</h2>
            <SendMessageButton />
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
