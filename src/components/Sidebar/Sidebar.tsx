import React from 'react';

import { Path } from 'constants/routes';

import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';

import { Box } from '../UI/Box/Box';
import { Link } from '../UI/Link/Link';
import { Typography } from '../UI/Typography/Typography';

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
  profileInfo: { name: string };
  linkedItems: SidebarLinkedItem[];
  actionItems: SidebarActionItem[];
  selected: string;
  onActionItemClick: (item: SidebarActionItem) => void;
};

export default function Sidebar({ linkedItems, actionItems, profileInfo, onActionItemClick, selected }: Props) {
  const handleBottomItemClick = (item: SidebarActionItem) => () => {
    onActionItemClick(item);
  };

  const isSelectedItem = (item: SidebarLinkedItem) => selected === item.path;

  return (
    <div>
      <Drawer anchor='left' variant='permanent'>
        <Box sx={boxSx}>
          <List>
            <Typography sx={typographySx} variant='h5'>
              {profileInfo.name}
            </Typography>
          </List>

          <List sx={{ marginTop: '15px' }}>
            {linkedItems.map(item => (
              <Link key={item.path} href={`/${item.path}`} sx={{ textDecoration: 'none', userSelect: 'none' }}>
                <ListItemButton sx={isSelectedItem(item) ? listItemSelected : {}} selected={isSelectedItem(item)}>
                  <ListItemText primary={item.label} sx={listItemTextSx} />
                </ListItemButton>
              </Link>
            ))}
          </List>

          <List sx={{ marginTop: 'auto' }}>
            {actionItems.map(item => (
              <ListItemButton key={item.action} onClick={handleBottomItemClick(item)}>
                <ListItemText sx={listItemTextSx} primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
