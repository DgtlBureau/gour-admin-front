/* eslint-disable */
import React, { ChangeEvent, ReactNode } from 'react';
import MUITable from '@mui/material/Table';
import MUITableBody from '@mui/material/TableBody';
import MUITableCell from '@mui/material/TableCell';
import MUITableContainer from '@mui/material/TableContainer';
import MUITableHead from '@mui/material/TableHead';
import MUITableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, LabelDisplayedRowsArgs } from '@mui/material';

import { Tabs, TabsProps } from '../../Tabs/Tabs';

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
    color: '#757575',
  },
  bodyCell: {
    fontSize: '14px',
  },
};

export type Row = {
  id: number;
  cells: ReactNode[];
};

type Props = {
  tabs?: TabsProps;
  rowTitleList: string[];
  rows: Row[];
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Table({
  tabs,
  rowTitleList,
  rows,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25],
  page,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const shownRows =
    rowsPerPage > 0
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows;

  const getDisplayedRowsLabel = ({ from, to, count }: LabelDisplayedRowsArgs) =>
    `${from}–${to} из ${count !== -1 ? count : `больше, чем ${to}`}`;

  return (
    <Paper>
      {tabs && (
        <Tabs
          value={tabs.value}
          options={tabs.options}
          onChange={tabs.onChange}
        />
      )}
      <MUITableContainer>
        <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
          <MUITableHead sx={sx.head}>
            <MUITableRow>
              {rowTitleList.map(rowTitle => (
                <MUITableCell
                  key={rowTitle}
                  align="left"
                  sx={{ ...sx.cell, ...sx.headCell }}
                >
                  {rowTitle}
                </MUITableCell>
              ))}
            </MUITableRow>
          </MUITableHead>
          <MUITableBody>
            {shownRows.map(row => (
              <MUITableRow key={row.id}>
                {row.cells.map((cell, i) => (
                  <MUITableCell
                    key={`${row.id}_${i}`}
                    align="left"
                    sx={{ ...sx.cell, ...sx.bodyCell }}
                  >
                    {cell}
                  </MUITableCell>
                ))}
              </MUITableRow>
            ))}
          </MUITableBody>
        </MUITable>

        <TablePagination
          labelRowsPerPage="Рядов на странице:"
          labelDisplayedRows={getDisplayedRowsLabel}
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </MUITableContainer>
    </Paper>
  );
}
