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
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell } from '@fortawesome/free-solid-svg-icons';

function Admin() {
  const history = useHistory();
  const [open, setOpen] = useState(false); // 좌측 메뉴 상태
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 상태
  const [darkModeEnabled, setDarkModeEnabled] = useState(localStorage.getItem('darkModeEnabled') === 'true');

  // 사용자 목록을 불러오는 useEffect
  const fetchFalseList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/members/falselist');
      console.log(response.data); // API 응답 데이터 콘솔에 출력
      setUsers(response.data);
    } catch (error) {
      console.error('API 서버오류', error);
    }
  };

  // 사용자 목록을 불러오는 useEffect
  useEffect(() => {
    fetchFalseList();
  }, []);

  // 다크 모드 설정을 위한 useEffect
  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

  // 사용자 인증 체크를 위한 useEffect
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/');
    }
  }, [history]);

  // 좌측 메뉴 toggle 함수
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // 페이지 이동 처리 함수
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

  // 사용자 선택 처리 함수
  const handleSelectUser = (user) => {
    console.log('사용자 선택:', user); // 선택된 사용자 정보 확인용 로그
    setSelectedUser(user);
  };

  // 사용자 라이센스 승인 처리 함수
  const handleApproveUser = async () => {
    try {
      if (selectedUser && selectedUser.memberId) {
        await axios.patch(`http://localhost:8080/members/${selectedUser.memberId}`, {
          license: true, // 라이센스를 true로 업데이트
        });
        setSelectedUser(null); // 선택된 사용자 초기화
        fetchFalseList(); // 사용자 목록을 다시 불러오거나 다른 작업을 수행할 수 있습니다.
      } else {
        console.error('선택된 사용자가 없습니다.');
      }
    } catch (error) {
      console.error('회원 정보 업데이트 오류:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#e8e8e8', paddingTop: '80px' }}> {/* 상단에 여백 추가 */}
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
            <Typography variant="h6" sx={{ fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease' }} component="div"> 관리자 </Typography>
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
              sx={{ width: 150, paddingTop: 1, paddingBottom: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }} // padding을 줄여 간격을 좁힘
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
      <div className="Admin">
        {/* 사용자 목록 렌더링 */}
        {users.map((user) => (
          <div className="Records" key={user.memberId} onClick={() => handleSelectUser(user)}>
            <Checkbox
              checked={selectedUser && selectedUser.memberId === user.memberId} // 선택된 사용자에 따라 체크 여부 설정
              readOnly // 읽기 전용 설정
            />
            <Typography variant="body1">
              {user.name} ({user.email})
            </Typography>
            {user.license ? (
              <span style={{ color: 'green' }}>Approved</span>
            ) : (
              <span style={{ color: 'red' }}>Pending Approval</span>
            )}
            {/* 라이센스 이미지 표시 */}
            {user.licenseImage && <img src={user.licenseImage} alt="License" width={100} />}
          </div>
        ))}
        {/* 선택된 사용자가 있을 경우, 승인 버튼 렌더링 */}
        {selectedUser && (
          <div className="SelectedUser">
            <Typography variant="body1">
              선택된 사용자: {selectedUser.name} ({selectedUser.email})
            </Typography>
            <Button onClick={handleApproveUser}>
              Approve License
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
