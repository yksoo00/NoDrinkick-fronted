import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/addEmergency.css';
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
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons'; 
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; 
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'; 
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'; 
import { faBell } from '@fortawesome/free-solid-svg-icons'; 
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';



import addEmergencyContact from '../services/addEmergency.js';

function AddEmergency() {

    const history = useHistory();

    const [open, setOpen] = useState(false); // 좌측 메뉴 상태
    const [darkModeEnabled, setDarkModeEnabled] = useState(
        localStorage.getItem('darkModeEnabled') === 'true'
      );

      
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
    

  // 토큰없이 접속 시 제한

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

    const [formData, setFormData] = useState({
        name: '',
        phoneNum: '',
        message: '',
        countryCode: '+82'
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^0/, formData.countryCode);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formattedPhoneNum = formatPhoneNumber(formData.phoneNum);
  
      try {
          await addEmergencyContact({ ...formData, phoneNum: formattedPhoneNum });
          alert('저장되었습니다!');
          setFormData({ name: '', phoneNum: '', message: '', countryCode: '+82' });
          history.push('/emergency'); // 추가 성공 후 페이지 이동
      } catch (error) {
          console.error('비상 연락망 추가 에러:', error);
          alert('저장에 실패했습니다.');
      }
  };

  const handleLogout = () => {
    removeToken();
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

    return (
        <div style={{
            backgroundColor: '#e8e8e8',
            minHeight: '100vh', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
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
            <Typography variant="h6" sx={{fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease'}} component="div"> 비상연락망 추가 </Typography>
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

            <div className="SOS-BOX">
                <form onSubmit={handleSubmit}>
                <div className="SOS-Label">
                  <label htmlFor="name" className="InputLabel"> 저장이름
                     <FontAwesomeIcon icon={faUser} className="SOS-Icon1" />
                 </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange} required
                        className="SOS-Input"
                        placeholder="Name"
                     />
                     </div>
                    <div className="SOS-Label">
                        <label htmlFor="phoneNum" className="InputLabel">수신 전화번호 (- 제외)
                        <FontAwesomeIcon icon={faPhone} className= "SOS-Icon2" />
                        </label>
                        <input
                            type="text"
                            id="phoneNum"
                            name="phoneNum"
                            value={formData.phoneNum}
                            onChange={handleChange}
                            required
                            className="SOS-Input"
                            placeholder="PhoneNum"
                        />
                    </div>
                    <div className="SOS-Label">
                        <label htmlFor="message" className="InputLabel">SOS 메시지
                        <FontAwesomeIcon icon={faEnvelope} className= "SOS-Icon3" />
                        </label>
                        <input
                            type="text"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="SOS-Input"
                            placeholder="MessageText"
                        />
                    </div>
                    <button type="submit" className="SOSButton">추가하기</button>
                </form>
            </div>
        </div>
    );
}

export default AddEmergency;
