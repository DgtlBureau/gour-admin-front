/* eslint-disable */
import React, { ChangeEvent, ReactNode } from 'react';

import { LabelDisplayedRowsArgs, TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import MUITable from '@mui/material/Table';
import MUITableBody from '@mui/material/TableBody';
import MUITableCell from '@mui/material/TableCell';
import MUITableContainer from '@mui/material/TableContainer';
import MUITableHead from '@mui/material/TableHead';
import MUITableRow from '@mui/material/TableRow';

import { Typography } from '../Typography/Typography';
import { Tabs, TabsProps } from '../Tabs/Tabs';

const sx = {
  head: {
    borderTop: '1px solid rgba(224,224,224,1)',
  },
  cell: {
    padding: '14px',
  },
  headCell: {
    fontSize: '12px',
    fontWeight: 600,
  },
  bodyCell: {
    fontSize: '14px',
  },
  tabs: {
    padding: '0 16px',
  },
};

export type Row = {
  id: number;
  cells: ReactNode[];
};

type Props<T = string | number> = {
  tabs?: TabsProps<T>;
  rowTitleList: string[];
  rows: Row[];
  rowsCount?: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Table<T = string | number>({
  tabs,
  rowTitleList,
  rows,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25],
  page,
  rowsCount,
  onPageChange,
  onRowsPerPageChange,
}: Props<T>) {
  const shownRows = rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows;

  const getDisplayedRowsLabel = ({ from, to, count }: LabelDisplayedRowsArgs) =>
    `${from}–${to} из ${count !== -1 ? count : `больше, чем ${to}`}`;

  return (
    <Paper>
      {tabs && <Tabs value={tabs.value} options={tabs.options} onChange={tabs.onChange} />}
      <MUITableContainer>
        <MUITable sx={{ minWidth: 650 }}>
          <MUITableHead sx={sx.head}>
            <MUITableRow>
              {rowTitleList.map(rowTitle => (
                <MUITableCell key={rowTitle} align='left' sx={{ ...sx.cell, ...sx.headCell }}>
                  {rowTitle}
                </MUITableCell>
              ))}
            </MUITableRow>
          </MUITableHead>
          <MUITableBody>
            {rows.length ? (
              shownRows.map(row => (
                <MUITableRow key={row.id}>
                  {row.cells.map((cell, i) => (
                    <MUITableCell key={`${row.id}/${i}`} align='left' sx={{ ...sx.cell, ...sx.bodyCell }}>
                      {cell}
                    </MUITableCell>
                  ))}
                </MUITableRow>
              ))
            ) : (
              <MUITableRow>
                <MUITableCell align='left' sx={{ ...sx.cell, ...sx.bodyCell }}>
                  <Typography variant='body1'>Нет записей</Typography>
                </MUITableCell>
              </MUITableRow>
            )}
          </MUITableBody>
        </MUITable>

        {rows.length > 5 && (
          <TablePagination
            labelRowsPerPage='Записей на странице:'
            labelDisplayedRows={getDisplayedRowsLabel}
            rowsPerPageOptions={rowsPerPageOptions}
            component='div'
            count={rowsCount || rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        )}
      </MUITableContainer>
    </Paper>
  );
}
