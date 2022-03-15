import React from 'react';
import { Grid } from '@mui/material';

import s from './Preview.module.scss';

export type ProductPreviewProps = {
  title: string;
  category: string;
  price: number;
  imageSrc: string;
  onDelete: () => void;
  onEdit: () => void;
};

export function ProductPreview({
  title,
  category,
  price,
  imageSrc,
  onDelete,
  onEdit,
}: ProductPreviewProps) {
  return (
    <Grid className={s.preview} container>
      <Grid item xs>
        <img src={imageSrc} alt="" />
      </Grid>
      <Grid className={s.info} item xs>
        <span>{title}</span>
      </Grid>
      <Grid className={s.info} item xs>
        <span>{category}</span>
      </Grid>
      <Grid className={s.info} item xs>
        <span>{price}</span>
      </Grid>
      <Grid item xs className={s.actions}>
        <div tabIndex={0} role="button" onKeyPress={undefined} onClick={onDelete}>
          Удалить
        </div>
        <div tabIndex={0} role="button" onKeyPress={undefined} onClick={onEdit}>
          Редактировать
        </div>
      </Grid>
    </Grid>
  );
}
