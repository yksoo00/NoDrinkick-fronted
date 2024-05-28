import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import sendMessageToAll from '../services/Emergency';
import '../styles/emergency.css';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { fa1 } from '@fortawesome/free-solid-svg-icons';
import { fa2 } from '@fortawesome/free-solid-svg-icons';
import { fa3 } from '@fortawesome/free-solid-svg-icons';

function EmergencyContactsList() {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [open, setOpen] = useState(false);


    const toggleDrawer = () => {
        setOpen(!open);
    };

    const history = useHistory();

    const handleClickPage = (pageName) => {
        let path;
        switch (pageName) {
            case '마이페이지':
                path = '/myPage';
                break;
            case 'SOS 추가':
                path = '/addEmergency';
                break;
            case 'SOS 목록':
                path = '/Emergency';
                break;
            case '이용약관':
                path = '/use';
                break;
            case '공지사항':
                path = '/notice';
                break;
            case '설정':
                path = '/set';
                break;
            case '이용기록':
                path = '/usagerecord';
                break;
            default:
                path = '/';
                break;
        }
        history.push(path);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/emergency-contacts');
            setContacts(response.data);
        } catch (error) {
            console.error("비상 연락망 조회 중 오류가 발생했습니다.", error);
        }
    };

    const handleSendMessage = async () => {
        try {
            // 선택된 연락처에 대해서만 메시지 전송
            for (const contactId of selectedContacts) {
                const contact = contacts.find(contact => contact.id === contactId);
                if (contact) {
                    await sendSmsToContact(contact.phoneNum, contact.message);
                }
            }
            // 메시지 전송 후 선택된 연락처 초기화
            setSelectedContacts([]);
        } catch (error) {
            console.error("메시지 전송 중 오류가 발생했습니다.", error);
        }
    };

    const sendSmsToContact = async (phoneNum, message) => {
        try {
            await axios.post('http://localhost:8080/send-sms', { toPhoneNumber: phoneNum, message: message });
            console.log(`메시지가 성공적으로 전송되었습니다. 수신자: ${phoneNum}`);
        } catch (error) {
            console.error(`메시지 전송 실패: ${error.message}`);
        }
    };

    const handleDeleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/emergency-contacts/${id}`);
            // 삭제 후에 연락처 목록을 다시 불러오기
            fetchContacts();
        } catch (error) {
        console.error("연락처 삭제 중 오류가 발생했습니다.", error);
        }
    };

    const handleCheckboxChange = (id) => {
        // 선택된 카드의 id 목록을 관리
if (selectedContacts.includes(id)) {
            setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
        } else {
            setSelectedContacts([...selectedContacts, id]);
        }
    };

    return (
        <div className="emergency-container">
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: 9999, backgroundColor: '#2d2c28' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontFamily: 'Pretendard-Bold', textAlign: 'center' }} component="div">비상연락망 목록</Typography>
                    </Box>
                    <Box>
                        <IconButton color="inherit" onClick={() => history.push('/main')}>
                            <FontAwesomeIcon icon={faHouse} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <List>
                    {['마이페이지', '이용기록', 'SOS 추가', 'SOS 목록', '이용약관', '공지사항'].map((text, index) => (
                        <ListItem
                            button
                            key={text}
                            sx={{ width: 150, paddingTop: index === 0 ? 10 : 3, paddingBottom: 3, display: 'flex', alignItems: 'center', textAlign: 'center' }}
                            onClick={() => handleClickPage(text)}
                        >
                            <ListItemIcon>
                                {text === '마이페이지' && <FontAwesomeIcon icon={faUser} style={{ marginLeft: 3 }} />}
                                {text === '이용기록' && <FontAwesomeIcon icon={faClipboard} style={{ marginLeft: 4 }} />}
                                {text === 'SOS 추가' && <FontAwesomeIcon icon={faUserPlus} style={{ marginLeft: 3 }} />}
                                {text === 'SOS 목록' && <FontAwesomeIcon icon={faAddressBook} style={{ marginLeft: 3 }} />}
                                {text === '이용약관' && <FontAwesomeIcon icon={faCircleInfo} style={{ marginLeft: 3 }} />}
                                {text === '공지사항' && <FontAwesomeIcon icon={faBell} style={{ marginLeft: 3 }} />}
                            </ListItemIcon>
                            <Typography variant="body1" sx={{ marginLeft: -1.5, fontSize: 15, fontFamily: 'Pretendard-Black', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                {text}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <div className="emergency-content">
                <div className="card-container">
                     {contacts.map((contact, index) => (
                        <div key={contact.id} className="card">
                            <div className="card-icon">
                                {index === 0 && <span><FontAwesomeIcon icon={fa1} /></span>}
                                {index === 1 && <span><FontAwesomeIcon icon={fa2} /></span>}
                                {index === 2 && <span><FontAwesomeIcon icon={fa3} /></span>}
                            </div>
                            <div className="card-content">
                                <h3>{contact.name}</h3>
                                <p1>{contact.phoneNum}</p1>
                                <p2>{contact.message}</p2>
                            </div>
                            <input
                                type="checkbox"
                                checked={selectedContacts.includes(contact.id)}
                                onChange={() => handleCheckboxChange(contact.id)}
                            />
                            <button className="delete-button" onClick={() => handleDeleteContact(contact.id)}>연락처 삭제</button>
                        </div>
                    ))}
                </div>
                <button
                    className="send-button"
                    style={{
                        backgroundColor: selectedContacts.length > 0 ? '#FFD700' : '#8A8A8A',
                        color: selectedContacts.length > 0 ? '#000000' : '#FFFFFF',
                        cursor: selectedContacts.length > 0 ? 'pointer' : 'not-allowed'
                    }}
                    onClick={handleSendMessage}
                    disabled={selectedContacts.length === 0}
                >
                    설정 연락처에 메시지 전송
                </button>
                <button className="send-Allbutton" onClick={sendMessageToAll}>모든 연락처에 메시지 전송</button>
            </div>
        </div>
    );
}

export default EmergencyContactsList;
