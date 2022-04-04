import React, { ChangeEvent, CSSProperties, useState } from 'react';

import { Stack } from '@mui/material';
import { Table } from '../../UI/Table/Table';
import { Typography } from '../../UI/Typography/Typography';

type Comment = {
  id: number;
  authorName: string;
  text: string;
  productName: string;
  date: string;
  isConfirmed: boolean;
};

const tabsOptions = [
  {
    value: 'waitingForApprove',
    label: 'Ждут подтверждения',
  },
  {
    value: 'approved',
    label: 'Подтверждены',
  },
];

type Props = {
  comments: Comment[];
  onClickFullReview: (commentId: number) => void;
};

const tableHeader = ['Имя', 'Отзыв', 'Товар', 'Дата'];

const commentTextSx: CSSProperties = {
  maxWidth: '250px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  padding: '0 5px',
  textOverflow: 'ellipsis',
};

export function ReviewTable({ comments, onClickFullReview }: Props) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [value, setValue] = useState<string>('waitingForApprove');

  const isConfirmed = value !== 'waitingForApprove';

  const changeTab = (val: string) => setValue(val);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const row = comments
    .filter(comment => comment.isConfirmed === isConfirmed)
    .map(comment => {
      const cells = [
        comment.authorName,
        <Stack
          onClick={() => {
            onClickFullReview(comment.id);
          }}
        >
          <Typography sx={commentTextSx} variant="body1">
            {comment.text}
          </Typography>
        </Stack>,
        comment.productName,
        comment.date,
      ];
      return {
        id: comment.id,
        cells,
      };
    });

  const tabs = {
    value,
    options: tabsOptions,
    onChange: changeTab,
  };

  return (
    <Table
      rowTitleList={tableHeader}
      tabs={tabs}
      rows={row}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 15]}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
