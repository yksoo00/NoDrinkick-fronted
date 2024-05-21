import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/use.css';
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
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faClipboard,
  faUserPlus,
  faAddressBook,
  faCircleInfo,
  faBell
} from '@fortawesome/free-solid-svg-icons';

const termsData = {
  1: {
    title: "1조. 정의",
    content: [
      "1. “노드링킥”이라 함은 애플리케이션을 통해 “개인형 이동수단 공유 서비스”를 제공하는 서비스입니다.",
      "2. “개인형 이동수단”은 전동킥보드와 전기자전거를 통칭합니다.",
      "3.“회원”이라 함은 서비스에 접속하여 본 약관에 따라 제공하는 서비스를 이용하는 고객을 말합니다."
    ]
  },
  2: {
    title: "2조. 회원가입 및 이용계약의 성립",
    content: [
      "1. 「개인정보 수집 및 이용 동의」, 「개인정보 제3자 제공 동의」, 「위치정보 이용약관」에 대하여 동의 절차를 완료함으로써 회원가입신청을 합니다.",
      "2. 회원이 되고자 하는 자의 가입신청에 대하여 서비스 이용 승인을 원칙으로 합니다.",
      "3. 본인 명의의 휴대전화번호를 보유하고 있는 경우에만 이용 신청이 가능합니다."
    ]
  },
  3: {
    title: "3조. 계정 및 정보의 관리",
    content: [
      "1. 회원은 1개의 계정을 가지며 그 계정은 회원이 이용 신청 시 기입한 본인인증 정보로 합니다.",
      "2. 어떠한 경우에도 본인의 계정을 타인에게 양도하면 안됩니다.",
      "3. 회원의 정보가 유출됨으로 인하여 발생하는 손실이나 손해에 대하여는 회원 본인이 그에 대한 책임을 부담합니다."
    ]
  },
  4: {
    title: "4조. 서비스 이용제한",
    content: [
      "1. 음주 운전 적발시 서비스가 이용제한 될 수 있습니다.",
      "2. 위조 면허증 사용시 서비스가 이용제한 될 수 있습니다.",
      "3. 타인의 아이디를 사용할 경우 서비스가 제한 될 수 있습니다.",
      "4. 얼굴 인식 3회 오류시 서비스가 제한 될 수 있습니다."
    ]
  }
};

function TermsOfUse() {
  const [alignment, setAlignment] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const history = useHistory();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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

  const fetchSectionContent = (section) => {
    setSelectedSection(termsData[section]);
  };

  return (
    <div className="terms-container">
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 9999, backgroundColor: '#2d2c28' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontFamily: 'Pretendard-Bold', textAlign: 'center' }} component="div">이용약관</Typography>
          </Box>
          <Box>
            <IconButton color="inherit" onClick={() => history.push('/main')}>
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
              <Typography variant="body1" sx={{ marginLeft: -1.5, fontSize: 15, fontFamily: 'Pretendard-Black', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className="MainBOX">
      <div className="buttons-container">
      <Stack direction="row" spacing={2}>
        {[1, 2, 3, 4].map((number) => (
          <ToggleButton
            key={number}
            value={number.toString()}
            onClick={() => fetchSectionContent(number)}
            sx={{
              color: '#000000',
              fontSize: 12,
              fontFamily: 'Pretendard-Black',
              width: 50,
              borderColor: '#000000',
              marginTop: -50
            }}
            className={selectedSection && selectedSection.title.includes(`${number}조`) ? 'active' : ''}
          >
            {`${number}`}
          </ToggleButton>
        ))}
      </Stack>
    </div>
        {selectedSection && (
          <div className="section-content">
            <h7 className="Zo">{selectedSection.title}</h7>
            <ul>
              {selectedSection.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TermsOfUse;
