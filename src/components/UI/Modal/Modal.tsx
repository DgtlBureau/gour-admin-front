import React, { CSSProperties, ReactNode } from 'react';
import { Modal as MUIModal, SxProps } from '@mui/material';

import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { modalStyles } from './Modal.styles';

export type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  acceptText?: string;
  closeText?: string;
  formId?: string;
  sx?: CSSProperties;
  onAccept?: () => void;
  onClose: () => void;
};

export function Modal({
  isOpen,
  title,
  description,
  children,
  actions,
  acceptText = 'Принять',
  closeText = 'Отменить',
  formId,
  sx = {},
  onAccept,
  onClose,
}: ModalProps) {
  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <Box sx={{ ...modalStyles.modal, ...sx }}>
        <Typography sx={modalStyles.title} variant="body2" color="primary">
          {title}
        </Typography>

        <Box sx={modalStyles.body}>
          {children || <Typography variant="body1">{description}</Typography>}
        </Box>

        <Box>
          {actions || (
            <>
              {onAccept ? (
                <Button size="small" sx={modalStyles.acceptBtn} onClick={onAccept}>
                  {acceptText}
                </Button>
              ) : (
                !!formId && (
                  <Button
                    type="submit"
                    form={formId}
                    size="small"
                    sx={modalStyles.acceptBtn}
                  >
                    {acceptText}
                  </Button>
                )
              )}
              <Button variant="outlined" size="small" onClick={onClose}>
                {closeText}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </MUIModal>
  );
}
