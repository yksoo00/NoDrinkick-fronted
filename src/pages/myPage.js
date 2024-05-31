import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUserData, updateUserProfile, uploadUserImage, deleteUser } from '../services/userService';
import { removeToken } from '../services/loginService';
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
import { faHouse, faUser, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell, faSignOutAlt, faBook, faSave, faTimes, faCamera } from '@fortawesome/free-solid-svg-icons';

function UserList() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const history = useHistory();
  const [darkModeEnabled, setDarkModeEnabled] = useState(localStorage.getItem('darkModeEnabled') === 'true');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setEditedUserData(data);
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/');
    }
  }, [history]);

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

  const handleLogout = () => {
    removeToken();
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditedUserData({ 
      ...editedUserData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSaveProfile = async () => {
    try {
      const data = await updateUserProfile(userData.memberId, editedUserData);
      setUserData(data);
      setIsEditing(false);
      alert('회원 정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('회원 정보 업데이트 오류:', error);
      alert('회원 정보 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUserData(userData);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    try {
      const data = await uploadUserImage(userData.memberId, selectedFile);
      setUserData(data);
      setEditedUserData(data);
      setIsUploading(false);
      alert('프로필 사진이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('프로필 사진 업데이트 오류:', error);
      alert('프로필 사진 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleEditImage = () => {
    setIsUploading(true);
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setSelectedFile(null);
  };

  const handleWithdrawal = async () => {
    try {
      await deleteUser(userData.memberId);
      alert('회원 탈퇴가 성공적으로 이루어졌습니다.');
      history.push('/'); 
    } catch (error) {
      console.error('회원 탈퇴 오류:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="terms-container">
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 9999, backgroundColor: darkModeEnabled ? '#F2F2F2' : '#2d2c28', transition: 'background-color 0.5s ease' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2, color: darkModeEnabled ? '#2d2c28' : '#FFFFFF' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease' }} component="div">
              마이페이지
            </Typography>
          </Box>
          <Box />
          <Box>
            <IconButton
              color="inherit"              onClick={() => history.push('/main')}
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
      <Box>
        <div className="myPage">
          <div className="user-info-container">
            <div className="user-info-all">
              <div className="user-info">
                <img src={editedUserData.imagePath} alt="프로필 사진" className="User-Image" />
                <div className="UserText">
                  <p>{editedUserData.name} 님<br />환영합니다</p>
                </div>
                <button onClick={handleEditImage} className="profile-edit-button"><FontAwesomeIcon icon={faCamera} /> 프로필 사진 수정</button>
              </div>
              <div className="user-profile_details">
                {isEditing ? (
                  <div>
                    <input type="text" name="email" value={editedUserData.email} onChange={handleInputChange} />
                    <input type="text" name="phoneNum" value={editedUserData.phoneNum} onChange={handleInputChange} />
                    <input type="password" name="password" value={editedUserData.password} onChange={handleInputChange} /> {/* 비밀번호 입력 필드 */}
                    <input type="checkbox" name="license" checked={editedUserData.license} onChange={handleInputChange} />
                    <button onClick={handleSaveProfile}><FontAwesomeIcon icon={faSave} /> 저장</button>
                    <button onClick={handleCancelEdit}><FontAwesomeIcon icon={faTimes} /> 취소</button>
                  </div>
                ) : (
                  <div>
                    <p>ID: {editedUserData.username} <br /><br />
                      이메일: {editedUserData.email} <br /><br />
                      전화번호: {editedUserData.phoneNum}</p>
                    <button className="user-profile__edit-button" onClick={handleEditProfile}>수정</button>
                  </div>
                )}
              </div>
            </div>
            <div className="license-all">
              <div className="license-details-item">
                <img src={editedUserData.licenseImage} alt="Driver's License" className="license-image" />
              </div>
              <div className="picture-all">
                <div className="license-details-verification">
                  <p>인증여부 : {editedUserData.license ? 'YES' : 'NO'}</p>
                </div>
                <div>
                  <button className="picture-button">운전면허증 등록</button>
                </div>
              </div>
            </div>
            {isUploading && (
              <div className="profile-image-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUploadImage}><FontAwesomeIcon icon={faSave} /> 수정하기</button>
                <button onClick={handleCancelUpload}><FontAwesomeIcon icon={faTimes} /> 취소</button>
              </div>
            )}
            {showConfirmation && (
              <div className="withdrawal-confirmation">
                <p>정말로 탈퇴하시겠습니까?</p>
                <button onClick={handleWithdrawal}>확인</button>
                <button onClick={() => setShowConfirmation(false)}>취소</button>
              </div>
            )}
            {!showConfirmation && (
              <button onClick={() => setShowConfirmation(true)}>탈퇴하기</button>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default UserList;
