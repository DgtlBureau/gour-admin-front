import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '../UI/Typography/Typography';
import { Path } from '../../constants/routes';

const boxSx = {
  width: 210,
  background: '#25262D',
  height: '100%',
  padding: '0 15px',
  display: 'flex',
  flexDirection: 'column',
};

const typographySx = {
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.5px',
  color: '#778192',
  margin: '0',
  padding: '15px 15px',
  borderBottom: ' 1px solid #393A42',
};

const listItemTextSx = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '15px',
  lineHeight: '22px',
  color: '#778192',
};

const listItemSelected = {
  bgcolor: '#393A42 !important',
  borderRadius: '4px',
  transition: 'all 0.5s',
};

export type SidebarLinkedItem = {
  path: Path;
  label: string;
};

export type SidebarActionItem = {
  action: string;
  label: string;
};

type Props = {
  profileInfo: { name: string; lastName: string };
  linkedItems: SidebarLinkedItem[];
  actionItems: SidebarActionItem[];
  defaultSelected: string;
  onLinkedItemClick: (item: SidebarLinkedItem) => void;
  onActionItemClick: (item: SidebarActionItem) => void;
};

export default function Sidebar({
  linkedItems,
  actionItems,
  profileInfo,
  onLinkedItemClick,
  onActionItemClick,
  defaultSelected,
}: Props) {
  const [selected, setSelected] = useState<string>(defaultSelected);

  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  const handleItemClick = (item: SidebarLinkedItem) => () => {
    setSelected(item.path);
    onLinkedItemClick(item);
  };

  const handleBottomItemClick = (item: SidebarActionItem) => () => {
    onActionItemClick(item);
  };

  const isSelectedItem = (item: SidebarLinkedItem) => selected === item.path;

  return (
    <div>
      <Drawer anchor="left" variant="permanent">
        <Box sx={boxSx} role="presentation">
          <List>
            <Typography sx={typographySx} variant="h5">
              {profileInfo.name}
              &nbsp;
              {profileInfo.lastName}
            </Typography>
          </List>
          <List sx={{ marginTop: '15px' }}>
            {linkedItems.map(item => (
              <ListItem
                sx={isSelectedItem(item) ? listItemSelected : {}}
                selected={isSelectedItem(item)}
                button
                key={item.path}
                onClick={handleItemClick(item)}
              >
                <ListItemText primary={item.label} sx={listItemTextSx} />
              </ListItem>
            ))}
          </List>
          <List sx={{ marginTop: 'auto' }}>
            {actionItems.map(item => (
              <ListItem button key={item.action} onClick={handleBottomItemClick(item)}>
                <ListItemText sx={listItemTextSx} primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
