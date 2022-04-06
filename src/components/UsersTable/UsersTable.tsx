import React from 'react';
import s from './UsersTable.module.scss';

export type UsersTableProps = {
    roles: {
        title: string;
        id: number;
    }[];
    users: {
        name: string;
        role: string;
    }[];
    onEdit(id: number): void;
    onRemove(id: number): void;
};

export function UsersTable(props: UsersTableProps) {
  return <div>UsersTable</div>;
}
