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
  const [memberInfo, setMemberInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [licenseImageUrl, setLicenseImageUrl] = useState('');
  const [AuthRentState, setAuthRentState] = useState(false); 
  const history = useHistory();
  const [darkModeEnabled, setDarkModeEnabled] = useState(localStorage.getItem('darkModeEnabled') === 'true');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setEditedUserData(data);

        // 프로필 이미지를 가져와 설정합니다.
        const imageUrl = await fetchUserProfileImage(data.memberId);
        setProfileImageUrl(imageUrl);

        // 운전면허 이미지를 가져와 설정합니다.
        const licenseImgUrl = await fetchLicenseImage(data.memberId);
        setLicenseImageUrl(licenseImgUrl);
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchData();
  }, []);

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
      case '이용기록':
        path = '/UserRecord';
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
  
      // 업로드된 이미지로 프로필 이미지 URL을 다시 가져옴
      const imageUrl = await fetchUserProfileImage(userData.memberId);
      setProfileImageUrl(imageUrl);

      const uploadData = new FormData();
      uploadData.append('file', selectedFile); // 올바른 파일 변수로 대체하십시오.
      uploadData.append('id', data.username); // 업데이트된 사용자 데이터의 username을 사용합니다.
  
      // 추가 업로드 요청을 보냅니다.
      await axios.post('http://192.168.141.149:5000/mypageUpload', uploadData, {
        
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        
      }
    
    );
      
    } catch (error) {
      console.error('프로필 사진 업데이트 오류:', error);
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
      console.error('회원 탈퇴 오류:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };
  

  const fetchRentState = async () => {
    try {
      const response = await axios.get('http://13.125.168.244:8080/rent');
      setAuthRentState(response.data);
    } catch (error) {
      console.error('API 서버 오류', error);
    }
  };

  useEffect(() => {
    fetchRentState();
}, []);




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
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2, color: darkModeEnabled ? '#2d2c28' : '#FFFFFF'}}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease'}} component="div"> 마이페이지 </Typography>
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
          <button onClick={handleEditImage} className="profile-edit-button" disabled={AuthRentState}>
          <FontAwesomeIcon icon={faCamera} /> 프로필 사진 수정
          </button>
          <button className="user-logout-button" onClick={handleLogout}  >로그아웃</button>
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
       <div>
            </div>
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
        <div className="profile-edit-popup-title">프로필 사진 수정</div>
        <div className="profile-edit-popup-file-input">
          <label className="custom-file-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            파일 선택
          </label>
        </div>
        <div className="profile-edit-popup-buttons">
          <button className="profile-edit-popup-Yes" onClick={handleUploadImage}><FontAwesomeIcon icon={faSave} /> 저장</button>
          <button className="profile-edit-popup-No" onClick={handleCancelUpload}><FontAwesomeIcon icon={faTimes} /> 취소</button>
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