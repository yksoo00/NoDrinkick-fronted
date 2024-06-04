import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/UserRecord.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

import { removeToken } from '../services/loginService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons'; 
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; 
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'; 
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'; 
import { faBell } from '@fortawesome/free-solid-svg-icons'; 
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function UserRecord() {

    const history = useHistory();

    const [open, setOpen] = useState(false); // 좌측 메뉴 상태
    const [users, setUsers] = useState([]);
    const [records, setrecords] = useState([]);
    const [darkModeEnabled, setDarkModeEnabled] = useState(
        localStorage.getItem('darkModeEnabled') === 'true'
      );

      useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get('http://localhost:8080/members/info');
            setUsers([response.data]); 
          } catch (error) {
            console.error('API 서버오류', error);
          }
        };
    
        fetchUser();
      }, []);

      // 백엔드에서 받아오기 
      const fetchRecords = async () => {
        const response = await axios.get('http://localhost:8080/records');
        setrecords(response.data);
      };

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

      useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          history.push('/');
        }
      }, [history]);


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

    return (
        <div style={{
            backgroundColor: '#e8e8e8', 
        }}>
            <CssBaseline />
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
            <Typography variant="h6" sx={{fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease'}} component="div"> 이용기록 </Typography>
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
        sx={{ zIndex: 999 }}
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

          <div className="Record-userinfo-container">
          {users.map((user) => (
            <div key={user.username} className="Record-userinfo-area">
              <p><span>{user.name}</span> 님 환영합니다</p>
              </div>
                 ))}
          </div>
          <div className="Record-Full">
          {records.map((record) => (
             <div className="Records" key={record.id}>
                 </div>
             ))}
          </div>
      </div>
    )

}

export default UserRecord;