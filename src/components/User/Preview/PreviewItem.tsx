import React from 'react';
import { Grid, IconButton } from '@mui/material';

import busketIcon from '../../../assets/icons/busket.svg';
import editIcon from '../../../assets/icons/preview/edit.svg';

import s from './Preview.module.scss';

type Props = {
  name: string;
  role: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function UserPreviewItem({ name, role, onEdit, onDelete }: Props) {
  return (
    <Grid className={s.item} container>
      <Grid className={s.info} item xs>
        <span>{name}</span>
      </Grid>
      <Grid className={s.info} item xs>
        <span className={s.role}>{role}</span>
      </Grid>
      <Grid className={s.info} item xs>
        <IconButton onClick={onDelete}>
          <img src={busketIcon} alt="" />
        </IconButton>
        <IconButton onClick={onEdit}>
          <img src={editIcon} alt="" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
