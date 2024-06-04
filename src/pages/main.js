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
import LogoDrawer from './Rent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboard, faUserPlus, faAddressBook, faCircleInfo, faBell, faSun, faMoon, } from '@fortawesome/free-solid-svg-icons';
import Userinfo from '../component/userinfo';

const Main = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [map, setMap] = useState(null);
  const [darkModeEnabled, setDarkModeEnabled] = useState(localStorage.getItem('darkModeEnabled') === 'true');
  const [logoMarker, setLogoMarker] = useState(null);

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

      default:
        path = '/';
        break;
    }
    history.push(path);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=a8890b2115cdd425f5e165d52a1aa021&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.380833, 126.928333),
          level: zoomLevel,
        };
        const newMap = new window.kakao.maps.Map(container, options);

        const LogoPosition = new window.kakao.maps.LatLng(37.38131763, 126.9288372);
        const LogoImageSize = new window.kakao.maps.Size(40, 40);
        const LogoMarkerImage = new window.kakao.maps.MarkerImage(LogoImage, LogoImageSize);
        const LogoMarker = new window.kakao.maps.Marker({
          position: LogoPosition,
          image: LogoMarkerImage,
        });
        LogoMarker.setMap(newMap);

        const markerPosition = new window.kakao.maps.LatLng(37.380833, 126.928333);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(newMap);

        window.kakao.maps.event.addListener(newMap, 'zoom_changed', function () {
          setZoomLevel(newMap.getLevel());
        });

        window.kakao.maps.event.addListener(LogoMarker, 'click', function () {
          handleMenuToggle();
        });

        setMap(newMap);
        setLogoMarker(LogoMarker);

        // URL 파라미터 확인하여 LogoDrawer 활성화
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('qr') === 'true') {
          handleMenuToggle();
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map) {
      map.setLevel(zoomLevel);
    }
  }, [map, zoomLevel]);

  const handleRent = () => {
    // 새로운 중심 좌표
    const newCenter = new window.kakao.maps.LatLng(37.38131763, 126.9288372);
    
    // 지도의 중심 좌표 변경
    map.setCenter(newCenter);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      history.push('/loginform');
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