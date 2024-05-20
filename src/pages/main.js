import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { KakaoMap, Marker } from 'react-kakao-maps';
import LogoImage from '../assets/Logo.png';
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
import AddIcon from '@mui/icons-material/Add'; 
import RemoveIcon from '@mui/icons-material/Remove'; 

import QrScanner from 'react-qr-scanner'; // Import QR scanner

import LogoDrawer from './Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 정의
import { faUser } from '@fortawesome/free-solid-svg-icons'; //마이페이지 아이콘
import { faClipboard } from '@fortawesome/free-solid-svg-icons'; //이용내역 아이콘
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; //비상연락망 추가 아이콘
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'; //비상연락망 목록 아이콘
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'; //이용약관 아이콘
import { faBell } from '@fortawesome/free-solid-svg-icons'; //이용약관 아이콘
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const [open, setOpen] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const [zoomLevel, setZoomLevel] = useState(2);
  const [map, setMap] = useState(null);
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    localStorage.getItem('darkModeEnabled') === 'true'
  );

  const [qrScannerOpen, setQrScannerOpen] = useState(false); // State for QR scanner
  const [qrResult, setQrResult] = useState(null); // State to store QR scan result

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

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const history = useHistory();

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

  const handleRent = () => {
    setQrScannerOpen(true); // Open the QR scanner
  };

  const handleScan = (data) => {
    if (data) {
      setQrResult(data);
      setQrScannerOpen(false); // Close the QR scanner
      console.log("QR Code Result:", data);
      // Perform any additional actions with the scanned data
    }
  };

  const handleError = (err) => {
    console.error(err);
    setQrScannerOpen(false); // Close the QR scanner on error
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
          level: zoomLevel
        };
        const newMap = new window.kakao.maps.Map(container, options);

        const LogoPosition = new window.kakao.maps.LatLng(37.38131763, 126.9288372);
        const LogoImageSize = new window.kakao.maps.Size(50, 50);
        const LogoMarkerImage = new window.kakao.maps.MarkerImage(LogoImage, LogoImageSize);
        const LogoMarker = new window.kakao.maps.Marker({
          position: LogoPosition,
          image: LogoMarkerImage,
        });
        LogoMarker.setMap(newMap);

        // 클릭 이벤트 리스너 추가
        window.kakao.maps.event.addListener(LogoMarker, 'click', function() {
          handleMenuToggle(); // 메뉴 토글 핸들러 호출
        });

        const markerPosition = new window.kakao.maps.LatLng(37.380833, 126.928333);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(newMap);

        setMap(newMap);

        window.kakao.maps.event.addListener(newMap, 'zoom_changed', function() {
          setZoomLevel(newMap.getLevel());
        });
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

  return (
    <div>
      <div className={`dark-mode-toggle ${darkModeEnabled ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
        <FontAwesomeIcon
          icon={darkModeEnabled ? faMoon : faSun}
          size="2x"
          style={darkModeEnabled ? { color: '#FFFFFF' } : { color: '#000000' }} // 아이콘의 색을 변경
        />
      </div>
      <CssBaseline />
      <AppBar position="fixed" sx={{zIndex: 9999, backgroundColor: '#2d2c28;' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6"sx={{ fontFamily: 'Pretendard-Bold', textAlign: 'center' }} component="div">노드링킥</Typography>
          </Box>
          <Box />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{zIndex: 2}}
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
              <Typography variant="body1" sx={{marginLeft:-1.5, fontSize: 15, fontFamily: 'Pretendard-Black', display: 'flex', alignItems: 'center', textAlign: 'center' }}>{text}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <LogoDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Box id="map" className="map"></Box>
      <Box sx={{position: 'fixed', bottom: '84.5%', right: '1vw', zIndex: 3}}>
        <Button variant="contained" color="primary" className="zoom-button" style={{ borderTopLeftRadius: '10%', borderBottomLeftRadius: '10%', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', backgroundColor: '#2d2c28', minWidth: '2vw', height: '3.55vh' }} onClick={() => setZoomLevel(zoomLevel + 1)}>
          <AddIcon />
        </Button>
        <Button variant="contained" color="primary" className="zoom-button" style={{ borderTopRightRadius: '10%', borderBottomRightRadius: '10%', borderBottomLeftRadius: '0%', borderTopLeftRadius: '0%', backgroundColor: '#2d2c28', minWidth: '2vw' }} onClick={() => setZoomLevel(zoomLevel - 1)}>
          <RemoveIcon />
        </Button>
      </Box>
      <Box sx={{position: 'fixed', bottom: '3%', left: '50%', transform: 'translate(-50%)', zIndex: 9999}}>
        <Button className="Rent-Button" variant="contained" color="primary" onClick={handleRent} style={{ right: '1px', backgroundColor: '#2d2c28', color: '#ffffff', height: '10vh', width: '700px' }} >
          <Typography variant="h6" sx={{fontFamily: 'Pretendard-Bold' }}>대여하기</Typography>
        </Button>
      </Box>
      {qrScannerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }}>
          <div style={{ width: '300px', height: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
      <Button className="CloseButton" onClick={() => setQrScannerOpen(false)} style={{ height:'50px', width: '260px', backgroundColor: '#2d2c28', color: '#FFFFFF', fontSize: 15, fontFamily: 'Pretendard-Black', marginTop: '10px', left: '50%', transform: 'translateX(-50%)' }}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;