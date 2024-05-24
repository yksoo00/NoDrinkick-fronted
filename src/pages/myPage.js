import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/myPage.css';
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
import { faHouse, faUser, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell } from '@fortawesome/free-solid-svg-icons';

function UserList() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    localStorage.getItem('darkModeEnabled') === 'true'
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://13.125.168.244:8080/members/info');
        setUsers([response.data]); // 응답 데이터를 배열에 감싸기
      } catch (error) {
        console.error('API 서버오류', error);
      }
    };

    fetchUser();
  }, []);

  // 토큰없이 접속 시 제한

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/');
    }
  }, [history]);

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

  return (
    <div className="terms-container">
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
            <Typography variant="h6" sx={{fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease'}} component="div"> 마이페이지 </Typography>
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
              sx={{ width: 150, paddingTop: index === 0 ? 10 : 3, paddingBottom:3, display: 'flex', alignItems: 'center', textAlign: 'center' }}
              onClick={() => handleClickPage(text)}
            >
              <ListItemIcon>
                {text === '마이페이지' && <FontAwesomeIcon icon={faUser} style={{marginLeft:3}} />}
                {text === '이용기록' && <FontAwesomeIcon icon={faClipboard} style={{marginLeft:4}} />}
                {text === 'SOS 추가' && <FontAwesomeIcon icon={faUserPlus} style={{marginLeft:3}} />}
                {text === 'SOS 목록' && <FontAwesomeIcon icon={faAddressBook} style={{marginLeft:3}} />}
                {text === '이용약관' && <FontAwesomeIcon icon={faCircleInfo} style={{marginLeft:3}} />}
                {text === '공지사항' && <FontAwesomeIcon icon={faBell} style={{marginLeft:3}} />}
              </ListItemIcon>
              <Typography variant="body1" sx={{marginLeft:-1.5, fontSize: 15, fontFamily: 'Pretendard-Bold', display: 'flex', alignItems: 'center', textAlign: 'center' }}>{text}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      <Box>
        <div className="myPage">
          {users.map((user) => (
            <div key={user.username} className="user-info-container">
              <div className="user-info-all">
                <div className="user-info">
                  <img src={user.imagePath} alt="프로필 사진" className="User-Image" />
                  <div className="UserText">
                    <p>{user.name} 님<br />환영합니다</p>
                  </div>
                </div>
                <div className="user-profile_details">
                  <p className="user-profile_detail-text">
                    {user.username} <br /><br />
                    {user.email} <br /><br />
                    {user.phoneNum}
                  </p>
                  <button className="user-profile__edit-button">수정</button>
                </div>
              </div>

              <div className="license-all">
                <div className="license-details-item">
                  <img src={user.licenseImage} alt="Driver's License" className="license-image" />
                </div>

                <div className="license-details-verification">
                  <p>인증여부 : {user.license ? 'YES' : 'NO'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default UserList;