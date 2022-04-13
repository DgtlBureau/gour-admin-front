import React, { CSSProperties } from 'react';
import { Dialog } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Typography } from '../../UI/Typography/Typography';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

const containerSx: CSSProperties = {
  width: '400px',
  padding: '25px',
};

export function ProductDeletePopup({ isOpen, onCancel, onSubmit }: Props) {
  return (
    <Dialog open={isOpen}>
      <Box sx={containerSx}>
        <Typography variant="body1" sx={{ margin: '0 0 20px 0' }}>
          Вы хотите удалить этот товар?
        </Typography>
        <Button onClick={onSubmit} sx={{ margin: '0 015px 0 0 ' }}>
          Удалить
        </Button>
        <Button onClick={onCancel}>Отмена</Button>
      </Box>
    </Dialog>
  );
}
