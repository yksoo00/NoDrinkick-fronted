import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BatteryIcon from '@mui/icons-material/BatteryFull';
import BellIcon from '@mui/icons-material/Notifications';

export default function LogoDrawer({ open, onClose }) {
  const list = (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BatteryIcon />
            </ListItemIcon>
            <ListItemText primary="킥보드 이름 : 노드링킥 1" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BellIcon />
            </ListItemIcon>
            <ListItemText primary="벨 울리기 " />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={() => {}}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
