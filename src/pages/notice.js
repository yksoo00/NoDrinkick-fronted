import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/notice.css';
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

import { removeToken } from '../services/loginService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 정의
import { faUser } from '@fortawesome/free-solid-svg-icons'; //마이페이지 아이콘
import { faHouse } from '@fortawesome/free-solid-svg-icons'; //마이페이지 아이콘
import { faClipboard } from '@fortawesome/free-solid-svg-icons'; //이용내역 아이콘
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; //비상연락망 추가 아이콘
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'; //비상연락망 목록 아이콘
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'; //이용약관 아이콘
import { faBell } from '@fortawesome/free-solid-svg-icons'; //이용약관 아이콘
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Notices = () => {
  const [open, setOpen] = useState(false); 
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    localStorage.getItem('darkModeEnabled') === 'true'
  );
  const history = useHistory();

  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

  const fetchNotices = async () => {
    const response = await axios.get('http://13.125.168.244:8080/notices');
    setNotices(response.data);
  };

  const handleCreate = async () => {
    if (newNotice.title && newNotice.content) {
      await createNotice(newNotice);
    }
  };

  const createNotice = async (notice) => {
    await axios.post('http://13.125.168.244:8080/notices', notice);
    fetchNotices();
    setIsModalOpen(false);
    setNewNotice({ title: '', content: '' });
  };

  const handleTitleClick = (noticeId) => {
    history.push(`/noticedetail/${noticeId}`);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
      case '이용기록':
        path = '/UserRecord';
        break;                         
        
      default:
        path = '/';
        break;
    }
    history.push(path);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/loginform');
    }
  }, [history]);

  return (
    <div style={{
      backgroundColor: '#e8e8e8',
      minHeight: '100vh', 
      display: 'flex',
  }}>
    <AppBar position="fixed" sx={{
      zIndex: 9999,
      backgroundColor: darkModeEnabled ? '#F2F2F2' : '#2d2c28',
      transition: 'background-color 0.5s ease'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2,  color: darkModeEnabled ? '#2d2c28' : '#FFFFFF'}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease'}} component="div"> 공지사항 </Typography>
        </Box>
        <Box />
        <Box>
        <IconButton 
        color="inherit" 
        onClick={() => history.push('/main')}
        style={{ color: darkModeEnabled ? '#000000' : '#ffffff' }}
      >
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
      sx={{zIndex: 999}}
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
              <Typography variant="body1" sx={{ marginLeft: -1.5, fontSize: 15, fontFamily: 'Pretendard-Bold', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {text}
              </Typography>
            </ListItem>
          ))}
      
        </List>
      </Drawer>
      <div>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>공지사항 추가하기</button>
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <input 
              className="notice-title"
              type="text"
              placeholder="제목" 
              value={newNotice.title} 
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
            />
            <input 
              className="notice-text"
              type="text"
              placeholder="내용" 
              value={newNotice.content} 
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
            />
          </div>
          <button className="notice-addbutton" onClick={handleCreate}>추가</button>
        </div>
      )}

<div className="Full-notice">
          {notices.map((notice, index) => (
            <div className="notice-button" key={notice.id} onClick={() => handleTitleClick(notice.noticeId)}>
              <span className="notice-number">{index + 1}</span>
              <span>{notice.title}</span>
              <div className="notice-username-full">
                <div key={notice.username} className="notice-username">
                  <p><span style={{ color: 'yellow' }}>{notice.username}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notices;

