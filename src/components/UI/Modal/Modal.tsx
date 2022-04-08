import React, { ReactNode } from 'react';
import { Modal as MUIModal } from '@mui/material';

import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

const sx = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '690px',
    padding: '24px',
    bgcolor: 'background.paper',
  },
  title: {
    marginBottom: '10px',
  },
  body: {
    marginBottom: '20px',
  },
};

export type ModalProps = {
  title: string;
  isOpen: boolean;
  body: ReactNode;
  actions: ReactNode;
  onClose: () => void;
}

export function Modal({
  title,
  body,
  isOpen,
  actions,
  onClose,
}: ModalProps) {
  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <Box sx={sx.modal}>
        <Typography sx={sx.title} variant="body2" color="primary">{title}</Typography>

        <Box sx={sx.body}>{body}</Box>

        <Box>{actions}</Box>
      </Box>
    </MUIModal>
  );
}
