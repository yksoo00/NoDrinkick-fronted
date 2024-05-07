import React, { useState, useEffect } from 'react';
import { KakaoMap, Marker } from 'react-kakao-maps';
import { useHistory } from 'react-router-dom';
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
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button'; 
import AddIcon from '@mui/icons-material/Add'; 
import RemoveIcon from '@mui/icons-material/Remove'; 
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LogoDrawer from './Logo';

const Main = () => {
  const [open, setOpen] = useState(false); // 좌측 메뉴 상태
  const [menuOpen, setMenuOpen] = useState(false); // 킥보드 메뉴의 상태
  const [zoomLevel, setZoomLevel] = useState(2);
  const [map, setMap] = useState(null);

  const history = useHistory();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen); 
  };

  // 대여하기 버튼 클릭 시 동작
  const handleRent = () => {
    // 대여 관련 동작 구현
    console.log("대여하기 버튼 클릭됨");
    // 여기서 원하는 동작을 수행하도록 코드를 추가하세요.
  };

  const handleClickPage = (pageName) => {
    let path;
    switch (pageName) {
      case '마이페이지':
        path = '/myPage';
        break;
      case '추가':
        path = '/addEmergency';
        break;
      case '비상연락망':
        path = '/Emergency';
        break;
      // 다른 페이지에 대한 경로도 이곳에 추가할 수 있습니다.
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
      <CssBaseline />
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2d2c28;' }}>
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
      >
        <List>
          {['마이페이지', '설정', '이용기록', '공지사항', '이용약관', '비상연락망'].map((text, index) => (
            <ListItem button key={text} sx={{ paddingTop: index === 0 ? 9 : 2, paddingBottom: 2, display: 'flex', justifyContent: 'center' }} onClick={() => handleClickPage(text)}>
              <Typography variant="body1" sx={{ fontFamily: 'Pretendard-Black', textAlign: 'center' }}>
                {text}
              </Typography>
            </ListItem>
          ))}
        </List>

      </Drawer>
      <LogoDrawer open={menuOpen} onClose={() => setMenuOpen(false)} /> 
      <Box id="map" className="map"></Box>
      <Box sx={{position: 'fixed', bottom: '85%', right: '1vw', zIndex: 3}}>
        <Button variant="contained" color="primary" className="zoom-button" style={{ borderTopLefttRadius: '10%', borderBottomLeftRadius: '10%', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', backgroundColor: '#2d2c28', minWidth: '2vw', Height:'2vh' }} onClick={() => setZoomLevel(zoomLevel + 1)}>
          <AddIcon />
        </Button>
        <Button variant="contained" color="primary" className="zoom-button" style={{ borderTopRightRadius: '10%', borderBottomRightRadius: '10%', borderBottomLeftRadius: '0%', borderTopLeftRadius: '0%', backgroundColor: '#2d2c28', minWidth: '2vw'}} onClick={() => setZoomLevel(zoomLevel - 1)}>
          <RemoveIcon />
        </Button>
      </Box>
      <Box sx={{position: 'fixed', bottom: '3%', left: '50%', transform: 'translate(-50%)', zIndex: 9999}}>
        <Button className="Rent-Button" variant="contained" color="primary" onClick={handleRent} style={{ right:'1px', backgroundColor: '#2d2c28', color: '#ffffff', height:'10vh', width:'700px'}} >
        <Typography variant="h6" sx={{fontFamily: 'Pretendard-Bold' }}>대여하기</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Main;
