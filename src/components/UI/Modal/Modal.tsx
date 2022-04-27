import React, { ReactNode } from 'react';
import { Modal as MUIModal } from '@mui/material';

import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

const sx = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '690px',
    padding: '24px',
    bgcolor: 'background.default',
  },
  title: {
    marginBottom: '10px',
  },
  body: {
    marginBottom: '20px',
  },
  acceptBtn: {
    marginRight: '10px',
  },
};

export type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  body?: ReactNode;
  actions?: ReactNode;
  acceptText?: string;
  closeText?: string;
  formId?: string;
  onAccept?: () => void;
  onClose: () => void;
}

export function Modal({
  isOpen,
  title,
  description,
  body,
  actions,
  acceptText = 'Принять',
  closeText = 'Отменить',
  formId,
  onAccept,
  onClose,
}: ModalProps) {
  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <Box sx={sx.modal}>
        <Typography sx={sx.title} variant="body2" color="primary">{title}</Typography>

        <Box sx={sx.body}>
          {
            body || <Typography variant="body1">{description}</Typography>
          }
        </Box>

        <Box>
          {
            actions || (
              <>
                {
                  onAccept ? (
                    <Button
                      size="small"
                      sx={sx.acceptBtn}
                      onClick={onAccept}
                    >
                      {acceptText}
                    </Button>
                  ) : !!formId && (
                    <Button
                      type="submit"
                      form={formId}
                      size="small"
                      sx={sx.acceptBtn}
                    >
                      {acceptText}
                    </Button>
                  )
                }
                <Button variant="outlined" size="small" onClick={onClose}>
                  {closeText}
                </Button>
              </>
            )
          }
        </Box>
      </Box>
    </MUIModal>
  );
}
