import React, { useState } from 'react';
import classNames from 'classnames';
import { Divider, Grid } from '@mui/material';
import usePagination from '@mui/material/Pagination';

import { UserPreviewItem } from './PreviewItem';

import s from './Preview.module.scss';

export type UserPreviewProps = {
  users: {
    id: number;
    name: string;
    role: string;
  }[],
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export function UserPreview({ users, onEdit, onDelete }: UserPreviewProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const count = Math.ceil(users.length / perPage);

  return (
    <div className={s.preview}>
      <Grid className={classNames(s.item, s.header)} container>
        <Grid className={s.info} item xs>
          <span>Имя Фамилия</span>
        </Grid>
        <Grid className={s.info} item xs>
          <span>Тип</span>
        </Grid>
        <Grid className={s.info} item xs>
          <span>Действие</span>
        </Grid>
      </Grid>

      {users.map(user => (
        <>
          <UserPreviewItem
            key={user.id}
            name={user.name}
            role={user.role}
            onEdit={() => onEdit(user.id)}
            onDelete={() => onDelete(user.id)}
          />
          <Divider />
        </>
      ))}
    </div>
  );
}
