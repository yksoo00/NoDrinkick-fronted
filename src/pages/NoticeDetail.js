import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/noticeDetail.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; 
import { removeToken } from '../services/loginService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser, faHouse, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchNoticeDetail, editNotice, deleteNotice } from '../services/noticeDetailService';

const NoticeDetail = () => {
  const [open, setOpen] = useState(false); 
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);
  const [editedNotice, setEditedNotice] = useState({ title: '', content: '' });
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    localStorage.getItem('darkModeEnabled') === 'true'
  );
  const [userRole, setUserRole] = useState('');
  const history = useHistory();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

  const fetchNotice = async () => {
    try {
      const data = await fetchNoticeDetail(noticeId);
      setNotice(data);
    } catch (error) {
      console.error('Error fetching notice details:', error);
    }
  };

  const handleEdit = async () => {
    if (userRole !== 'ADMIN') {
      alert('관리자만 수정 가능합니다.');
      return;
    }
    try {
      await editNotice(noticeId, editedNotice);
      fetchNotice();
      setEditedNotice({ title: '', content: '' });
      history.push('/notice');
    } catch (error) {
      console.error('Error editing notice:', error);
    }
  };

  const handleDelete = async () => {
    if (userRole !== 'ADMIN') {
      alert('관리자만 삭제 가능합니다.');
      return;
    }
    try {
      await deleteNotice(noticeId);
      history.push('/notice');
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, [noticeId]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/loginform');
    } else {
      // Assuming the token has user information including role
      const user = JSON.parse(atob(token.split('.')[1]));
      setUserRole(user.role);
    }
  }, [history]);

  if (!notice) {
    return <div>Loading...</div>;
  }

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
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => history.push('/notice')} sx={{ mr: 2,  color: darkModeEnabled ? '#2d2c28' : '#FFFFFF'}}>
              <ArrowBackIcon />
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

      <div className="notice-detail">
        <div className="notice-detail-sub">
          <h1>{notice.title}</h1>
          <p className="date">{new Date(notice.createdAt).toLocaleDateString()}</p>
        </div>
        <p className="NoticeContent">{notice.content}</p>

        <div className="edit-form">
          <div className="edit-form-button">
            <input
              className="notice-detail-edit-title"
              type="text"
              placeholder="수정할 제목 (관리자용)"
              value={editedNotice.title}
              onChange={(e) => setEditedNotice({ ...editedNotice, title: e.target.value })}
              disabled={userRole !== 'ADMIN'}
            />
            <button 
              className="notice-edit-edit" 
              onClick={handleEdit}
              disabled={userRole !== 'ADMIN'}
              style={{ 
                cursor: userRole === 'ADMIN' ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s, border-color 0.3s',
              }}
            >
              수정
            </button>
            <button 
              className="notice-edit-delete" 
              onClick={handleDelete}
              disabled={userRole !== 'ADMIN'}
              style={{ 
                cursor: userRole === 'ADMIN' ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s, border-color 0.3s',
              }}
            >
              삭제
            </button>
          </div>
          <input
            className="notice-detail-edit-text"
            type="text"
            placeholder="수정할 내용 (관리자용)"
            value={editedNotice.content}
            onChange={(e) => setEditedNotice({ ...editedNotice, content: e.target.value })}
            disabled={userRole !== 'ADMIN'}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;

