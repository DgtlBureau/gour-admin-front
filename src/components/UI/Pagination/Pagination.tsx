import React from 'react';
import MUIPagination from '@mui/material/Pagination';

type Props = {
  page: number;
  count: number;
  onChange: (id: number) => void;
}

export function Pagination({ page, count, onChange }: Props) {
  const changePage = (e: React.ChangeEvent<unknown>, value: number) => onChange(value);

  return (
    <MUIPagination
      shape="rounded"
      size="large"
      page={page}
      count={count}
      onChange={changePage}
    />
  );
}
