import React, { ChangeEvent, ReactNode } from 'react';
import MUITable from '@mui/material/Table';
import MUITableBody from '@mui/material/TableBody';
import MUITableCell from '@mui/material/TableCell';
import MUITableContainer from '@mui/material/TableContainer';
import MUITableHead from '@mui/material/TableHead';
import MUITableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

type Row = {
  id: number;
  cells: ReactNode[];
};

type Props = {
  rowTitleList: string[];
  rows: Row[];
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Table({
  rowTitleList,
  rows,
  rowsPerPage,
  rowsPerPageOptions,
  page,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const shownRows =
    rowsPerPage > 0 ?
      rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
      rows;
  return (
    <MUITableContainer component={Paper}>
      <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
        <MUITableHead>
          <MUITableRow>
            {rowTitleList.map(rowTitle => (
              <MUITableCell key={rowTitle} align="left">
                {rowTitle}
              </MUITableCell>
            ))}
          </MUITableRow>
        </MUITableHead>
        <MUITableBody>
          {shownRows.map(row => (
            <MUITableRow key={row.id}>
              {row.cells.map(cell => (
                <MUITableCell key={cell?.toString()} align="left">
                  {cell}
                </MUITableCell>
              ))}
            </MUITableRow>
          ))}
        </MUITableBody>
      </MUITable>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </MUITableContainer>
  );
}
