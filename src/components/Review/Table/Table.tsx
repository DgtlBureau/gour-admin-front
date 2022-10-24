import React, { CSSProperties, ChangeEvent, useState } from 'react';

import { Options } from 'constants/tabs';

import { Stack } from '@mui/material';

import { Table } from 'components/UI/Table/Table';
import { Typography } from 'components/UI/Typography/Typography';

export type Comment = {
  id: number;
  authorName: string;
  text: string;
  productName: string;
  date: string;
  isConfirmed: boolean | null;
};

const tabsOptions = [
  {
    value: Options.WAIT_FOR_APPROVE,
    label: 'Ждут подтверждения',
  },
  {
    value: Options.ALL,
    label: 'Все',
  },
  {
    value: Options.APPROVED,
    label: 'Подтверждены',
  },
  {
    value: Options.NOT_APPROVED,
    label: 'Отклонены',
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

  const [tabKey, setTabKey] = useState<string>(Options.WAIT_FOR_APPROVE);

  const changeTab = (key: string) => setTabKey(key);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const row = comments
    .filter(comment => {
      switch (tabKey) {
        case Options.WAIT_FOR_APPROVE:
          return comment.isConfirmed === null;
        case Options.APPROVED:
          return comment.isConfirmed === true;
        case Options.NOT_APPROVED:
          return comment.isConfirmed === false;
        case Options.ALL:
          return true;
        default:
          return true;
      }
    })
    .map(comment => {
      const cells = [
        comment.authorName,
        <Stack
          onClick={() => {
            onClickFullReview(comment.id);
          }}
        >
          <Typography sx={commentTextSx} variant='body1'>
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
    value: tabKey,
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
