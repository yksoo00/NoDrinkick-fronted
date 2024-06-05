import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUserData, fetchLicenseImage } from '../services/userService';
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
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../styles/Admin.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell } from '@fortawesome/free-solid-svg-icons';

function Admin() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [darkModeEnabled, setDarkModeEnabled] = useState(localStorage.getItem('darkModeEnabled') === 'true');
  const [userData, setUserData] = useState(null);
  const [licenseImages, setLicenseImages] = useState({});

  const fetchData = async () => {
    try {
      const userData = await fetchUserData();
      setUserData(userData);
      console.log(userData.role);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
  };

  const fetchFalseList = async () => {
    try {
      const response = await axios.get('http://13.125.168.244:8080/members/falselist');
      console.log(response.data);
      setUsers(response.data);

      const images = await Promise.all(
        response.data.map(async (user) => {
          if (user.license === false) {
            const image = await fetchLicenseImage(user.memberId);
            return { memberId: user.memberId, image };
          }
          return { memberId: user.memberId, image: null };
        })
      );

      const imagesMap = images.reduce((acc, cur) => {
        acc[cur.memberId] = cur.image;
        return acc;
      }, {});

      setLicenseImages(imagesMap);
    } catch (error) {
      console.error('API 서버오류', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log(userData);
      if (userData.role === 'ADMIN') {
        fetchFalseList();
      } else {
        history.push('/main');
      }
    }
  }, [userData, history]);

  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

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

  const handleSelectUser = (user) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.some((u) => u.memberId === user.memberId)) {
        return prevSelected.filter((u) => u.memberId !== user.memberId);
      } else {
        return [...prevSelected, user];
      }
    });
  };

  const handleApproveSelectedUsers = async () => {
    try {
      await Promise.all(
        selectedUsers.map(async (user) => {
          await axios.patch(`http://13.125.168.244:8080/members/${user.memberId}`, {
            license: true,
          });
        })
      );
      setSelectedUsers([]);
      fetchFalseList();
    } catch (error) {
      console.error('회원 정보 업데이트 오류:', error);
    }
  };

  return (
    <div className="AdminContainer">
      <CssBaseline />
      <AppBar position="fixed" sx={{
        zIndex: 9999,
        backgroundColor: darkModeEnabled ? '#F2F2F2' : '#2d2c28',
        transition: 'background-color 0.5s ease'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2, color: darkModeEnabled ? '#2d2c28' : '#FFFFFF' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: 18, fontFamily: 'Pretendard-Bold', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease' }} component="div"> 관리자 </Typography>
          </Box>
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
          {['마이페이지', '이용기록', 'SOS 추가', 'SOS 목록', '이용약관', '공지사항'].map((text) => (
            <ListItem
              button
              key={text}
              sx={{ width: '100%', paddingTop: 1, paddingBottom: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}
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
              <Typography variant="body1" sx={{ marginLeft: 1, fontSize: 15, fontFamily: 'Pretendard-Bold' }}>
                {text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className="Admin">
        <div className="AdminContent">
          {users.map((user) => (
            <div className="Records" key={user.memberId} onClick={() => handleSelectUser(user)}>
              <Checkbox
                checked={selectedUsers.some((u) => u.memberId === user.memberId)}
                readOnly
                sx={{ marginLeft: -2 }} // 조정
              />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                {user.name} ({user.username})
              </Typography>
              {user.license ? (
                <span className="status-approved">Approved</span>
              ) : (
                <span className="status-pending">Pending Approval</span>
              )}
              {licenseImages[user.memberId] && <img src={licenseImages[user.memberId]} alt="License" className="license-image" />}
            </div>
          ))}
        </div>
        {selectedUsers.length > 0 && (
          <div className="SelectedUser">
          <h2>선택된 사용자</h2>
          <div className="user-list">
            {selectedUsers.map((user, index) => (
              <p key={index}>{user.name}</p>
            ))}
          </div>
          <button onClick={handleApproveSelectedUsers}>Approve Selected Licenses</button>
        </div>
        )}
      </div>
    </div>
  );
  
  
}
export default Admin;
