import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '../UI/Typography/Typography';

export type SidebarLinkedItem = {
  path: string;
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

  const handleItemClick = (item: SidebarLinkedItem) => () => {
    setSelected(item.path);
    onLinkedItemClick(item);
  };

  const handleBottomItemClick = (item: SidebarActionItem) => () => {
    onActionItemClick(item);
  };

  return (
    <div>
      <Drawer anchor="left" variant="permanent">
        <Box sx={{ width: 210 }} role="presentation">
          <List>
            <Typography sx={{ textAlign: 'center' }} variant="h5">
              {profileInfo.name}
              {' '}
              {profileInfo.lastName}
            </Typography>
          </List>
          <Divider />
          <List>
            {linkedItems.map(item => (
              <ListItem
                selected={selected === item.path}
                button
                key={item.path}
                onClick={handleItemClick(item)}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {actionItems.map(item => (
              <ListItem button key={item.action} onClick={handleBottomItemClick(item)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
