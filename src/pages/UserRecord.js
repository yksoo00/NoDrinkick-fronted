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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell } from '@fortawesome/free-solid-svg-icons';

function UserRecord() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [darkModeEnabled, setDarkModeEnabled] = useState(localStorage.getItem('darkModeEnabled') === 'true');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://13.125.168.244:8080/members/info');
        setUsers([response.data]);
      } catch (error) {
        console.error('API 서버오류', error);
      }
    };
    fetchUser();
  }, []);



  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('JWT 토큰이 없습니다');
          return;
        }
        const response = await axios.get('http://13.125.168.244:8080/record/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecords(response.data);
      } catch (error) {
        console.error('API 서버오류', error);
      }
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
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
    <div style={{ backgroundColor: '#e8e8e8' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 9999, backgroundColor: darkModeEnabled ? '#F2F2F2' : '#2d2c28', transition: 'background-color 0.5s ease' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2, color: darkModeEnabled ? '#2d2c28' : '#FFFFFF' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease' }} component="div">
              이용기록
            </Typography>
          </Box>
          <Box />
          <Box>
            <IconButton color="inherit" onClick={() => history.push('/main')} style={{ color: darkModeEnabled ? '#000000' : '#ffffff' }}>
              <FontAwesomeIcon icon={faHouse} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} sx={{ zIndex: 999 }}>
        <List>
          {['마이페이지', '이용기록', 'SOS 추가', 'SOS 목록', '이용약관', '공지사항'].map((text, index) => (
            <ListItem button key={text} sx={{ width: 150, paddingTop: index === 0 ? 10 : 3, paddingBottom: 3, display: 'flex', alignItems: 'center', textAlign: 'center' }} onClick={() => handleClickPage(text)}>
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
            <p><span>{user.name}</span>님 이용기록</p>
          </div>
        ))}
      </div>
      <div className="Record-Full">
        <table className="Record-Table">
          <thead>
            <tr>
              <th>인덱스</th>
              <th>총 이동 거리</th>
              <th>지불 비용</th>
              <th>빌린 시각</th>
              <th>반납 시각</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record.recordId}>
                <td>{index + 1}</td>
                <td>{record.totalDistance}</td>
                <td>{record.price}</td>
                <td>{new Date(record.rentTime).toLocaleString()}</td>
                <td>{new Date(record.returnTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserRecord;
