import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/notice.css';
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
import Button from '@mui/material/Button'; 

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
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [open, setOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    localStorage.getItem('darkModeEnabled') === 'true'
  );

  const history = useHistory();

  useEffect(() => {
    // darkModeEnabled에 따라 body 클래스를 업데이트합니다.
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // 다크 모드 상태를 localStorage에 저장합니다.
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

  const fetchNotices = async () => {
    const response = await axios.get('/notices');
    setNotices(response.data);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/');
    }
  }, [history]);

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
      case '가이드북':
        path = '/guidebook';
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

  const searchNotices = async () => {
    if (!searchTerm) {
      fetchNotices();
    } else {
      const response = await axios.get(`/notices/search?query=${searchTerm}`);
      setNotices(response.data);
    }
  };

  const handleCreate = async () => {
    const title = prompt("공지사항 제목을 입력하세요");
    const content = prompt("공지사항 내용을 입력하세요");
    if (title && content) {
      await createNotice({ title, content });
    }
  };

  const createNotice = async (notice) => {
    await axios.post('/notices', notice);
    fetchNotices();
  };

  const handleDelete = async (noticeId) => {
    await deleteNotice(noticeId);
  };

  const deleteNotice = async (noticeId) => {
    await axios.delete(`/notices/${noticeId}`);
    fetchNotices();
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleLogout = () => {
    removeToken();
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

  return (
    <div>
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
          <Typography variant="h6" sx={{fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease'}} component="div"> 이용약관 </Typography>
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
          {['마이페이지', '이용기록', 'SOS 추가', 'SOS 목록', '이용약관', '가이드북', '공지사항'].map((text, index) => (
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
                {text === '가이드북' && <FontAwesomeIcon icon={faBook} style={{ marginLeft: 3 }} />}
                {text === '공지사항' && <FontAwesomeIcon icon={faBell} style={{ marginLeft: 3 }} />}
              </ListItemIcon>
              <Typography variant="body1" sx={{ marginLeft: -1.5, fontSize: 15, fontFamily: 'Pretendard-Bold', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {text}
              </Typography>
            </ListItem>
          ))}
          <ListItem
            button
            key="로그아웃"
            sx={{ width: 150, paddingTop: 3, paddingBottom: 3, display: 'flex', alignItems: 'center', textAlign: 'center', position: 'absolute', bottom: -120 }}
            onClick={handleLogout}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ marginLeft: 3 }} />
            </ListItemIcon>
            <Typography variant="body1" sx={{ marginLeft: -1.5, fontSize: 15, fontFamily: 'Pretendard-Bold', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              로그아웃
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    <div>
      <h1 className="h10">공지사항 목록</h1>
      <div className="search-bar">
        <input 
          type="text"
          className="search-input" 
          placeholder="검색어" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="button5" onClick={searchNotices}>검색</button>
      </div>
      <button className="button6" onClick={handleCreate}>공지사항 추가</button>
      <ul>
        {notices.map(notice => (
          <li key={notice.id}>{notice.title}</li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Notices;
