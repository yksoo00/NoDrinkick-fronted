import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoImage from '../assets/Logo2_Dark.png';
import '../styles/main.css';
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
import Button from '@mui/material/Button';
import LogoDrawer from './rent';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faUser, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Userinfo from '../component/userinfo';

const Main = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [map, setMap] = useState(null);
  const [darkModeEnabled, setDarkModeEnabled] = useState(localStorage.getItem('darkModeEnabled') === 'true');
  const [logoMarker, setLogoMarker] = useState(null);
  const [userRole, setUserRole] = useState('');

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
  }, [darkModeEnabled]);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
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
      case '관리자':
        path = '/Admin';
        break;

      default:
        path = '/';
        break;
    }
    history.push(path);
  };

  const fetchGpsData = async () => {
    try{
    const response = await axios.get('http://13.125.168.244:8080/gps');
    return response.data;
  }catch (error) {
    console.error('API 서버오류', error);
    throw error;
  }
};

  useEffect(() => {
    if (map) {
      map.setLevel(zoomLevel);
    }
  }, [map, zoomLevel]);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8890b2115cdd425f5e165d52a1aa021&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(async () => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.380833, 126.928333),
          level: zoomLevel,
        };
        const newMap = new window.kakao.maps.Map(container, options);

        try {
          const gpsData = await fetchGpsData();
          console.log(gpsData);
  
          // gpsData를 gpsId별로 그룹화
          const groupedData = gpsData.reduce((acc, data) => {
            if (!acc[data.gpsId]) {
              acc[data.gpsId] = [];
            }
            acc[data.gpsId].push(data);
            return acc;
          }, {});
  
          console.log(groupedData);
  
          // 상태에 저장할 마커 배열
          const markers = [];
  
          // gpsId별로 그룹화된 데이터에 대해 반복하여 로고 마커 생성
          Object.keys(groupedData).forEach(gpsId => {
            groupedData[gpsId].forEach(data => {
              console.log('ID:', data.id, 'gpsId:', data.gpsId, 'Latitude:', data.latitude, 'Longitude:', data.longitude);
  
              // 위도와 경도 값의 유효성 검사
              const latitude = parseFloat(data.latitude);
              const longitude = parseFloat(data.longitude);
              if (isNaN(latitude) || isNaN(longitude)) {
                console.error('유효하지 않은 좌표 값:', data);
                return;
              }
  
              // 각 킥보드의 위치 정보를 사용하여 로고 마커의 위치 생성
              const logoPosition = new window.kakao.maps.LatLng(longitude, latitude);
  
              // 로고 마커 이미지 크기 및 이미지 생성
              const logoImageSize = new window.kakao.maps.Size(40, 40);
              const logoMarkerImage = new window.kakao.maps.MarkerImage(LogoImage, logoImageSize);
  
              // 로고 마커 생성
              const logoMarker = new window.kakao.maps.Marker({
                position: logoPosition,
                image: logoMarkerImage,
              });
  
              // 로고 마커를 지도에 추가
              logoMarker.setMap(newMap);
  
              // 로고 마커 클릭 이벤트 처리
              window.kakao.maps.event.addListener(logoMarker, 'click', function () {
                handleMenuToggle();
              });
  
              // 생성된 로고 마커를 배열에 추가
              markers.push(logoMarker);
            });
          });
  
          // 상태에 마커 배열 저장
          setLogoMarker(markers);
  
        } catch (error) {
          console.error('Error fetching GPS data:', error);
        }

        const markerPosition = new window.kakao.maps.LatLng(37.380833, 126.928333);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(newMap);

        window.kakao.maps.event.addListener(newMap, 'zoom_changed', function () {
          setZoomLevel(newMap.getLevel());
        });

        setMap(newMap);

        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('qr') === 'true') {
          handleMenuToggle();
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [location.search, zoomLevel]);

  const handleRent = async() => {
    try{
    const gpsData = await fetchGpsData();
    const newCenter = new window.kakao.maps.LatLng(gpsData[0].longitude, gpsData[0].latitude);
    map.setCenter(newCenter);
    }catch (error) {
      console.error('Error fetching GPS data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/loginform');
    } else {
      const user = JSON.parse(atob(token.split('.')[1]));
      setUserRole(user.role);
    }
  }, [history]);

  return (
    <div>
      <div className={`dark-mode-toggle ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
        <FontAwesomeIcon
          icon={darkModeEnabled ? faMoon : faSun}
          size="2x"
          style={darkModeEnabled ? { color: '#FFFFFF' } : { color: '#000000' }}
        />
      </div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: 9999,
          backgroundColor: darkModeEnabled ? '#F2F2F2' : '#2d2c28',
          transition: 'background-color 0.5s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2, color: darkModeEnabled ? '#2d2c28' : '#FFFFFF' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: 12, fontFamily: 'Pretendard-Bold', textAlign: 'center', color: darkModeEnabled ? '#2d2c28' : '#FFFFFF', transition: 'color 0.5s ease' }} component="div"> 노드링킥 </Typography>
          </Box>
          <Box />
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
          {['마이페이지', '이용기록', 'SOS 추가', 'SOS 목록', '이용약관', '공지사항', ...(userRole === 'ADMIN' ? ['관리자'] : [])].map((text, index) => (
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
                {text === '관리자' && <FontAwesomeIcon icon={faPerson} style={{ marginLeft: 3 }} />}
              </ListItemIcon>
              <Typography variant="body1" sx={{ marginLeft: -1.5, fontSize: 15, fontFamily: 'Pretendard-Bold', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <LogoDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Box id="map" className="map"></Box>

      <Box sx={{ position: 'fixed', bottom: '3%', left: '50%', transform: 'translate(-50%)', zIndex: 999 }}>
        <Button
          className="Rent-Button"
          variant="contained"
          color="primary"
          onClick={handleRent}
          sx={{
            right: '1px',
            backgroundColor: darkModeEnabled ? '#F2F2F2' : '#2d2c28',
            height: '10vh',
            width: '700px',
            transition: 'background-color 0.5s ease',
            zIndex: 1,
            opacity: '0.95',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Pretendard-Bold',
              fontSize: '12px',
              color: darkModeEnabled ? '#2d2c28' : '#FFFFFF',
              transition: 'color 0.5s ease',
            }}
          >
            가까운 킥보드 타러가기
          </Typography>
        </Button>
      </Box>
      <Userinfo />
    </div>
  );
};

export default Main;
