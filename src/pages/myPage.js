import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/myPage.css';
import { fetchUserData, updateUserProfile, uploadUserImage, deleteUser, fetchUserProfileImage, fetchLicenseImage } from '../services/userService';
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
import { faHouse, faUser, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell, faSave, faTimes, faCamera } from '@fortawesome/free-solid-svg-icons';
import { removeToken } from '../services/loginService';

function UserList() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [licenseImageUrl, setLicenseImageUrl] = useState('');
  const history = useHistory();
  const [darkModeEnabled, setDarkModeEnabled] = useState(localStorage.getItem('darkModeEnabled') === 'true');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setEditedUserData(data);

        // Fetch profile image and license image
        const imageUrl = await fetchUserProfileImage(data.memberId);
        setProfileImageUrl(imageUrl);

        const licenseImgUrl = await fetchLicenseImage(data.memberId);
        setLicenseImageUrl(licenseImgUrl);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Update body class based on dark mode
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
    const paths = {
      '마이페이지': '/myPage',
      'SOS 추가': '/addEmergency',
      'SOS 목록': '/Emergency',
      '이용약관': '/use',
      '공지사항': '/notice',
      '이용기록': '/UserRecord',
    };
    history.push(paths[pageName] || '/');
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
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      const data = await updateUserProfile(userData.memberId, editedUserData);
      setUserData(data);
      setIsEditing(false);
      alert('회원 정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('Error updating profile:', error);
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

      // Update profile image URL
      const imageUrl = await fetchUserProfileImage(userData.memberId);
      setProfileImageUrl(imageUrl);

      const uploadData = new FormData();
      uploadData.append('file', selectedFile);
      uploadData.append('id', data.username);

      // Send additional upload request
      await axios.post('http://127.0.0.1:8080/mypageUpload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error uploading profile image:', error);
      alert('프로필 사진 업데이트 중 오류가 발생했습니다.');
      setIsUploading(false);
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
      console.error('Error deleting user:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/loginform');
    }
  }, [history]);

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
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2, color: darkModeEnabled ? '#2d2c28' : '#FFFFFF' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease' }} component="div">마이페이지</Typography>
          </Box>
          <Box />
          <Box>
            <IconButton color="inherit" onClick={() => history.push('/main')} style={{ color: darkModeEnabled ? '#000000' : '#ffffff' }}>
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

      <Box>
        <div className="myPage">
          <div className="user-info-container">
            <div className="user-info-all">
              <div className="user-info">
                <img src={profileImageUrl} alt="프로필 사진" className="User-Image" />
                <div className="UserText">
                  <p className='UserText2'>{editedUserData.name} 님<br />환영합니다</p>
                </div>
                <div className='LogoutAndEdit'>
                  <button onClick={handleEditImage} className="profile-edit-button"><FontAwesomeIcon icon={faCamera} /> 프로필 사진 수정</button>
                  <button className="user-logout-button" onClick={handleLogout}>로그아웃</button>
                  <button className='ExitButton' onClick={() => setShowConfirmation(true)}>회원 탈퇴</button>
                </div>
              </div>
              <div className="user-profile_details">
                {isEditing ? (
                  <div className='user-profile_details-all'>
                    <input type="text" name="email" value={editedUserData.email} onChange={handleInputChange} />
                    <input type="text" name="phoneNum" value={editedUserData.phoneNum} onChange={handleInputChange} />
                    <input type="password" name="password" value={editedUserData.password} onChange={handleInputChange} />
                    <div className='StoreAndCancelButton'>
                      <button className="StoreEdit" onClick={handleSaveProfile}><FontAwesomeIcon icon={faSave} /> 저장</button>
                      <button className="CancelEdit" onClick={handleCancelEdit}><FontAwesomeIcon icon={faTimes} /> 취소</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>ID : {editedUserData.username} <br /><br />
                      이메일 : {editedUserData.email} <br /><br />
                      전화번호 : {editedUserData.phoneNum}</p>
                    <button className="user-profile-edit-button" onClick={handleEditProfile}>수정</button>
                  </div>
                )}
              </div>
            </div>
            <div className="license-all">
              <div className="license-details-item">
                <img src={licenseImageUrl} alt="Driver's License" className="license-image" />
              </div>
              <div className="picture-all">
                <div className="license-details-verification">
                  <p>인증여부 : {editedUserData.license ? 'YES' : 'NO'}</p>
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
              <>
                <div className="overlay" />
                <div className="confirmation-popup">
                  <div className="confirmation-popup-text">정말로 탈퇴하시겠습니까?</div>
                  <div className="Exit-confirmation">
                    <button className='ExitYesButton' onClick={handleWithdrawal}>예</button>
                    <button className='ExitNoButton' onClick={() => setShowConfirmation(false)}>아니요</button>
                  </div>
                </div>
              </>
            )}
            {isUploading && (
              <>
                <div className="overlay" />
                <div className="profile-edit-popup">
                  <div className="profile-edit-popup-content">
                    <h2>프로필 사진 수정</h2>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <div className="profile-edit-popup-buttons">
                      <button onClick={handleUploadImage}><FontAwesomeIcon icon={faSave} /> 저장</button>
                      <button onClick={handleCancelUpload}><FontAwesomeIcon icon={faTimes} /> 취소</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default UserList;
