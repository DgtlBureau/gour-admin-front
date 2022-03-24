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
};

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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const row = comments.map(comment => {
    const { id, ...rest } = comment;
    const cells = Object.keys(rest).map(key => {
      switch (key) {
        case 'text':
          return (
            <Stack
              onClick={() => {
                onClickFullReview(id);
              }}
            >
              <Typography sx={commentTextSx} variant="body1">
                {rest.text}
              </Typography>
            </Stack>
          );
        default:
          return rest[key as keyof Omit<Comment, 'id'>];
      }
    });
    return {
      id: comment.id,
      cells,
    };
  });

  return (
    <Table
      rowTitleList={tableHeader}
      rows={row}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 15]}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
