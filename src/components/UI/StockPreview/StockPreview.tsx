import React from 'react';
import { Grid } from '@mui/material';

import s from './StockPreview.module.scss';

export type StockPreviewProps = {
  title: string;
  start: string;
  end: string;
  status: 'Актуальное' | 'Прошедшие',
  imageSrc: string;
  onDelete: () => void;
  onEdit: () => void;
}

export function StockPreview({
  title,
  start,
  end,
  status,
  imageSrc,
  onDelete,
  onEdit,
}: StockPreviewProps) {
  const statusSx = {
    padding: '6px',
    borderRadius: '6px',
    color: status === 'Актуальное' ? '#00AE29' : '#FF4E4E',
    backgroundColor: status === 'Актуальное' ? '#00AE291A' : '#FF4E4E1A',
  };

  return (
    <Grid className={s.preview} container>
      <Grid item xs>
        <img src={imageSrc} alt="" />
      </Grid>
      <Grid className={s.info} item xs>
        <span>{title}</span>
      </Grid>
      <Grid className={s.info} item xs>
        <span>{start}</span>
      </Grid>
      <Grid className={s.info} item xs>
        <span>{end}</span>
      </Grid>
      <Grid className={s.info} item xs>
        <span style={statusSx}>{status}</span>
      </Grid>
      <Grid item xs className={s.actions}>
        <div
          tabIndex={0}
          role="button"
          onKeyPress={undefined}
          onClick={onDelete}
        >
          Удалить
        </div>
        <div
          tabIndex={0}
          role="button"
          onKeyPress={undefined}
          onClick={onEdit}
        >
          Редактировать
        </div>
      </Grid>
    </Grid>
  );
}
